import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import {
  BedrockAgentRuntimeClient,
  RetrieveCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

const client = (region) => new BedrockRuntimeClient({ region });

export const lambdaHandler = async (event) => {
  const body = JSON.parse(event?.body || "{}");
  const userMessage = (body.message || "").trim();

  if (!userMessage) {
    return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "message is required" }) };
  }

  const region = process.env.BEDROCK_REGION || "ap-southeast-2";
  const modelId = process.env.MODEL_ID || "amazon.nova-micro-v1:0";

  try {
    // 1) Retrieve from Knowledge Base
    const kbClient = new BedrockAgentRuntimeClient({ region: region });

    const retrieveResp = await kbClient.send(
      new RetrieveCommand({
        knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
        retrievalQuery: { text: userMessage },
        maxResults: 3,
      })
    );

    const context = retrieveResp?.retrievalResults
      ?.map((r) => r.content?.text || "")
      .join("\n\n");

    // 2) Ask Nova using retrieved context

    const payload = {
      messages: [
        {
          role: "user",
          content: [
            {
              text:
                `Use ONLY this context to answer. Dont mention the works like context in the answer.\n\n` +
                `CONTEXT:\n${context}\n\n` +
                `QUESTION: ${userMessage}`,
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 250,
        temperature: 0.7,
      },
    };


    const resp = await client(region).send(
      new InvokeModelCommand({
        modelId: modelId,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload),
      })
    );

    const parsed = JSON.parse(new TextDecoder().decode(resp.body));
    console.log("Bedrock response:", JSON.stringify(parsed, null, 2));

    // Extract text from the correct response structure
    const text = parsed?.output?.message?.content?.[0]?.text ??
      parsed?.content?.[0]?.text ??
      "No response text returned.";

    return { statusCode: 200, headers: cors(), body: JSON.stringify({ reply: text }) };
  } catch (err) {
    console.error("Error:", err);
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: "bedrock invocation failed" }) };
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}