# AI Chatbot with Amazon Bedrock & Next.js

A secure, mobile-friendly AI chatbot built with Next.js, Tailwind CSS, and Amazon Bedrock.  
Features persistent chat history, robust cloud security, and modern CI/CD.

---

## 🚀 Live Demo

[paragnaikade.com](https://paragnaikade.com/)

---

## ✨ Features

- **Modern UI:** Built with Next.js and Tailwind CSS
- **Mobile Friendly:** Responsive layout for all devices
- **Persistent Chat:** Messages stored in local storage (survive page refresh)
- **AI Powered:** Uses Amazon Bedrock Nova micro model for responses
- **Serverless Backend:** AWS Lambda & API Gateway (SAM project)
- **Security:** Rate limiting, DoS protection, Cloudflare, AWS CloudWatch alarms
- **CI/CD:** GitHub Actions with AWS OIDC for secure deployments

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS, React
- **AI:** Amazon Bedrock (Nova micro model)
- **Backend:** AWS Lambda, API Gateway, AWS SAM
- **DevOps:** GitHub Actions, AWS OIDC, Cloudflare, CloudWatch

---

## 🏗️ Architecture

- **Frontend:** Next.js app with Tailwind CSS, chat state managed in local storage
- **Backend:** AWS Lambda functions exposed via API Gateway, deployed using AWS SAM
- **AI:** Amazon Bedrock Nova micro model for generating responses
- **Security:** Rate limiting, DoS protection, Cloudflare, AWS CloudWatch alarms
- **CI/CD:** GitHub Actions pipeline with AWS OIDC provider and IAM role for secure deployments

---

## 📦 Getting Started

### Prerequisites

- Node.js (v24+ recommended)
- AWS account with Bedrock, Lambda, API Gateway, and OIDC setup

## 🚀 Deployment

- **CI/CD:** Automated with GitHub Actions using AWS OIDC for secure deployments
- **Hosting:** Frontend on Vercel/Cloudflare Pages, backend on AWS Lambda/API Gateway

---

## 📊 Monitoring & Security

- **Rate limiting & DoS protection** on API endpoints
- **Cloudflare** for additional security
- **AWS CloudWatch** for monitoring and alarms

---

## 🤝 Contributing

PRs and suggestions are welcome!  
Open an issue for bugs or feature requests.

---

## 📄 License

MIT

---

**Made with ❤️ by Parag Naikade**
