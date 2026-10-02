# 🎓 EduVista — School Management System

> A full-stack school management system built with React, Node.js, Express, MongoDB and Docker, with automated CI/CD using GitHub Actions and Docker Hub.

EduVista is a modern school management web application designed to manage students, teachers, admissions, notices, schedules and fee-related operations through a user-friendly interface.

The project is containerized using Docker and includes a complete CI/CD workflow that automatically builds and publishes Docker images to Docker Hub.

---

## ✨ Features

### 🌐 Public Website

- 🏠 Modern school homepage
- 📖 About School
- 🎓 Academics
- 👨‍🏫 Faculty information
- 🏫 Facilities
- 📅 Events
- 🖼️ Gallery
- 📢 Notices
- 📝 Online Admissions
- 📞 Contact section
- 💰 Fees information
- 📆 School Calendar

### 🔐 Admin Panel

- 🔑 Secure admin login
- 📊 Admin dashboard
- 👨‍🎓 Student management
- 👨‍🏫 Teacher management
- 📝 Admission management
- 📢 Notice management
- 📅 Schedule management
- 💰 Fee management
- ✏️ Edit student details
- ✏️ Edit teacher details
- 👤 Student details
- 👤 Teacher details
- 🛡️ Protected admin routes
- 🔐 JWT-based authentication

---

## 🛠️ Technology Stack

### Frontend

- React 19
- Vite
- React Router
- CSS
- Nginx

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### DevOps

- Git
- GitHub
- GitHub Actions
- Docker
- Docker Compose
- Docker Hub
- Nginx

---

## 🏗️ Project Architecture

```text
                         ┌─────────────────────┐
                         │      GitHub         │
                         │   Source Repository │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   GitHub Actions    │
                         │      CI / CD        │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │      Docker Hub      │
                         │                     │
                         │ Frontend Image      │
                         │ Backend Image       │
                         └──────────┬──────────┘
                                    │
                                    ▼
              ┌────────────────────────────────────────┐
              │             Docker Compose              │
              │                                        │
              │   ┌──────────────┐                     │
              │   │   Frontend   │                     │
              │   │ React + Nginx│                     │
              │   │   :8080      │                     │
              │   └──────┬───────┘                     │
              │          │                             │
              │          ▼                             │
              │   ┌──────────────┐                     │
              │   │   Backend    │                     │
              │   │Node + Express│                     │
              │   │   :5001      │                     │
              │   └──────┬───────┘                     │
              │          │                             │
              │          ▼                             │
              │   ┌──────────────┐                     │
              │   │   MongoDB    │                     │
              │   │    :27017    │                     │
              │   └──────────────┘                     │
              │                                        │
              └────────────────────────────────────────┘



school-management/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── Admin.js
│   │   │   ├── Admission.js
│   │   │   ├── Fee.js
│   │   │   ├── Notice.js
│   │   │   ├── Schedule.js
│   │   │   ├── Student.js
│   │   │   └── Teacher.js
│   │   │
│   │   ├── routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── admissionRoutes.js
│   │   │   ├── feeRoutes.js
│   │   │   ├── noticeRoutes.js
│   │   │   ├── scheduleRoutes.js
│   │   │   ├── studentRoutes.js
│   │   │   └── teacherRoutes.js
│   │   │
│   │   ├── createAdmin.js
│   │   └── server.js
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
├── docker-compose.yml
└── README.md



🐳 Docker Setup
EduVista runs as three Docker services:
| Service  | Technology        |    Port |
| -------- | ----------------- | ------: |
| Frontend | React + Nginx     |  `8080` |
| Backend  | Node.js + Express |  `5001` |
| Database | MongoDB 8         | `27017` |


Docker Network
All services communicate through a dedicated Docker bridge network:

eduvista-network

Backend connects to MongoDB using the Docker service name:

mongodb://mongodb:27017/eduvista

🚀 Run the Project Locally
1. Clone Repository
git clone https://github.com/mannu-0/eduvista-school-management.git
cd eduvista-school-management
2. Start All Services
docker compose pull
docker compose up -d
3. Check Containers
docker compose ps

Expected services:

eduvista-frontend
eduvista-backend
eduvista-mongodb
4. Check Backend Health
curl http://localhost:5001/api/health

Expected response:

{
  "status": "OK",
  "service": "EduVista Backend"
}
5. Open Application

Frontend:

http://localhost:8080

Backend:

http://localhost:5001
🔐 Admin Setup

The project includes a script for creating the admin account.

Run:

docker compose exec backend node src/createAdmin.js

The script creates an admin account if one does not already exist.

Do not commit production passwords or secrets to GitHub. Use environment variables or Docker secrets for production deployments.

🔑 Environment Variables

Backend uses the following environment variables:

PORT=5001
MONGO_URI=mongodb://mongodb:27017/eduvista
JWT_SECRET=your_secure_secret

For local development outside Docker, MongoDB can use a local connection such as:

MONGO_URI=mongodb://localhost:27018/eduvista
🔄 CI/CD Pipeline

EduVista uses GitHub Actions for automated CI/CD.

Every push to the main branch triggers the workflow.

Pipeline
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Frontend CI
    │      ├── Checkout
    │      ├── Setup Node.js
    │      ├── npm ci
    │      └── npm run build
    │
    ├── Backend CI
    │      ├── Checkout
    │      ├── Setup Node.js
    │      ├── npm ci
    │      └── Node syntax check
    │
    ├── Docker Build
    │      ├── Build Frontend Image
    │      └── Build Backend Image
    │
    ├── Docker Hub Push
    │      ├── Frontend Image
    │      └── Backend Image
    │
    └── Compose Validation
           │
           ▼
       Deployment Ready
🐳 Docker Images

Docker images are published to Docker Hub.

Frontend
mannu0/eduvista-frontend
Backend
mannu0/eduvista-backend

Images are tagged with:

latest

and the GitHub commit SHA for version tracking.

🔧 Useful Docker Commands
Start services
docker compose up -d
Stop services
docker compose down
View running containers
docker compose ps
View logs
docker compose logs
Backend logs
docker compose logs backend
Frontend logs
docker compose logs frontend
MongoDB logs
docker compose logs mongodb
Follow backend logs
docker compose logs -f backend
Pull latest images
docker compose pull
Restart services
docker compose restart
🧪 API Health Checks
Backend Health
GET /api/health

Example:

curl http://localhost:5001/api/health
Schedule API
GET /api/schedules

Example:

curl http://localhost:5001/api/schedules
🔐 Authentication

Admin authentication uses:

JWT
bcrypt password hashing
Protected routes
Token-based authorization

Authentication flow:

Admin Login
     │
     ▼
POST /api/admin/login
     │
     ▼
Validate Username
     │
     ▼
Verify Password
     │
     ▼
Generate JWT
     │
     ▼
Frontend Stores Token
     │
     ▼
Protected Admin Routes
📦 Dockerfile Strategy
Frontend

Frontend uses a multi-stage Docker build:

Node.js
   │
   ├── Install dependencies
   ├── Build React application
   │
   ▼
Nginx Alpine
   │
   └── Serve production build

This keeps the production frontend container lightweight.

Backend

Backend uses:

Node.js 22 Alpine
        │
        ├── Install production dependencies
        ├── Copy source code
        └── Start Express server
💾 Persistent Database Storage

MongoDB uses a Docker named volume:

eduvista_mongodb_data

MongoDB data is stored at:

/data/db

This allows database data to persist even when the MongoDB container is recreated.

🛡️ Production Considerations

For a real production deployment, the following improvements can be added:

HTTPS / TLS
Secure JWT secret management
Docker secrets
Reverse proxy
Domain configuration
Automated backups
Monitoring
Log management
Resource limits
Health monitoring
Cloud deployment
📌 Current DevOps Implementation

This project currently demonstrates:

Git
 │
 ▼
GitHub
 │
 ▼
GitHub Actions
 │
 ├── Frontend Build
 ├── Backend Validation
 ├── Docker Build
 ├── Docker Image Tagging
 ├── Docker Hub Push
 └── Docker Compose Validation
 │
 ▼
Docker Hub
 │
 ▼
Docker Compose
 │
 ├── React + Nginx
 ├── Node.js + Express
 └── MongoDB
🎯 Project Objective

The main objective of EduVista is to build a practical full-stack application while implementing real-world DevOps practices such as:

Containerization
Multi-container application deployment
Docker networking
Persistent storage
CI/CD automation
Docker image management
Git-based version control
Automated builds
Health checks
Production-oriented deployment structure
📸 Project Status
Application

Status: ✅ Completed

Docker

Status: ✅ Containerized

Docker Compose

Status: ✅ Configured

CI/CD

Status: ✅ GitHub Actions configured

Docker Hub

Status: ✅ Images published

Kubernetes

Status: ⏸️ Not included in the current project

👨‍💻 Author

Manish Saini

DevOps / Cloud Enthusiast

GitHub: mannu-0
LinkedIn: Manish Saini
⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

📄 License

This project is created for learning, portfolio and demonstration purposes.
