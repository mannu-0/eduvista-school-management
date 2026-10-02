# 🎓 EduVista School Management System

> A modern full-stack school management platform built with **React, Node.js, Express, MongoDB, Docker, Docker Compose, GitHub Actions, and Docker Hub**.

EduVista is a full-stack school management application designed to provide a modern school website along with administrative functionality for managing admissions, students, teachers, notices, schedules, and fees.

The project was developed locally first and then containerized and automated with a complete **Docker-based CI/CD workflow**.

---

## 🌐 Project Overview

EduVista provides two major parts:

### 🏫 Public School Website

* Home page
* About school
* Academics
* Faculty
* Facilities
* Events
* Gallery
* Notices
* School calendar
* Contact
* Online admission form

### 🔐 Admin Management System

* Admin authentication
* Dashboard
* Admission management
* Student management
* Teacher management
* Notice management
* Schedule management
* Fee management
* Student/teacher details
* Add and edit records
* Protected admin routes

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      GitHub Repo     │
                    │   EduVista Project   │
                    └──────────┬───────────┘
                               │
                               │ Push to main
                               ▼
                    ┌──────────────────────┐
                    │    GitHub Actions    │
                    │      CI / CD         │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Frontend CI      Backend CI       Docker Build
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Docker Hub      │
                    │                      │
                    │ eduvista-frontend    │
                    │ eduvista-backend     │
                    └──────────┬───────────┘
                               │
                               │ docker compose pull
                               ▼
             ┌─────────────────────────────────────┐
             │          Local Docker Host           │
             │                                     │
             │  ┌────────────┐                     │
             │  │  Frontend  │ :8080              │
             │  │   Nginx    │                     │
             │  └─────┬──────┘                     │
             │        │                            │
             │  ┌─────▼──────┐                     │
             │  │  Backend   │ :5001              │
             │  │ Node/Express│                    │
             │  └─────┬──────┘                     │
             │        │                            │
             │  ┌─────▼──────┐                     │
             │  │  MongoDB   │ :27017             │
             │  │   Mongo 8  │                     │
             │  └────────────┘                     │
             │                                     │
             └─────────────────────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React 19
* React Router
* Vite
* Oxlint
* Nginx
* JavaScript / JSX
* CSS

## Backend

* Node.js 22
* Express 5
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* CORS
* dotenv

## DevOps

* Git
* GitHub
* GitHub Actions
* Docker
* Docker Compose
* Docker Hub
* Nginx
* Linux / Ubuntu
* CI/CD

---

# 📁 Project Structure

```text
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
│   ├── .dockerignore
│   ├── .gitignore
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
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 🐳 Docker Architecture

EduVista runs as three Docker services:

| Service  | Technology        |    Port |
| -------- | ----------------- | ------: |
| Frontend | React + Nginx     |  `8080` |
| Backend  | Node.js + Express |  `5001` |
| MongoDB  | MongoDB 8         | `27017` |

All services communicate through a dedicated Docker bridge network:

```text
eduvista-network
```

MongoDB data is persisted using a Docker named volume:

```text
eduvista_mongodb_data
```

This means removing the MongoDB container does not automatically remove the database volume.

---

# 🚀 Run the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/mannu-0/eduvista-school-management.git
cd eduvista-school-management
```

## 2. Start the complete application

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

Expected services:

```text
eduvista-frontend
eduvista-backend
eduvista-mongodb
```

---

# 🌐 Application URLs

### Frontend

```text
http://localhost:8080
```

### Backend

```text
http://localhost:5001
```

### Backend Health Check

```text
http://localhost:5001/api/health
```

Example response:

```json
{
  "status": "OK",
  "service": "EduVista Backend"
}
```

---

# 🔐 Admin Authentication

Admin authentication is handled by the backend using:

* JWT
* bcrypt password hashing
* Protected routes
* MongoDB-based admin records

To create an admin inside the running backend container:

```bash
docker compose exec backend node src/createAdmin.js
```

The application should then allow login through the admin login page.

> **Security:** Never commit real credentials, JWT secrets, or production environment variables to GitHub.

---

# ⚙️ Environment Variables

Backend configuration uses environment variables such as:

```env
PORT=5001
MONGO_URI=mongodb://mongodb:27017/eduvista
JWT_SECRET=your_secure_secret
```

The actual `.env` file is excluded from Git using `.gitignore`.

---

# 🔄 CI/CD Pipeline

The project uses **GitHub Actions** to automate the development and deployment workflow.

Every push to the `main` branch triggers the pipeline.

## Pipeline Flow

```text
Git Push
   │
   ▼
Frontend CI
   │
   ├── npm ci
   └── npm run build
   │
   ▼
Backend CI
   │
   ├── npm ci
   └── Node.js verification
   │
   ▼
Docker Build
   │
   ├── Build Frontend Image
   └── Build Backend Image
   │
   ▼
Docker Hub
   │
   ├── eduvista-frontend
   └── eduvista-backend
   │
   ▼
Docker Compose
   │
   └── Pull latest images
```

---

# 🐋 Docker Images

The project publishes separate Docker images for frontend and backend.

### Frontend

```text
mannu0/eduvista-frontend
```

### Backend

```text
mannu0/eduvista-backend
```

Images are tagged with:

```text
latest
```

and the Git commit SHA for version tracking.

---

# 🔧 Docker Commands

### Build images locally

```bash
docker compose build
```

### Start containers

```bash
docker compose up -d
```

### Stop containers

```bash
docker compose down
```

### View logs

```bash
docker compose logs
```

Backend logs:

```bash
docker compose logs backend
```

Frontend logs:

```bash
docker compose logs frontend
```

MongoDB logs:

```bash
docker compose logs mongodb
```

### Pull latest Docker Hub images

```bash
docker compose pull
```

### Restart the complete application

```bash
docker compose down
docker compose pull
docker compose up -d
```

### Check container status

```bash
docker compose ps
```

---

# ❤️ Health Checks

The application includes container health monitoring for the critical services.

MongoDB:

```bash
docker inspect --format='{{.State.Health.Status}}' eduvista-mongodb
```

Backend:

```bash
docker inspect --format='{{.State.Health.Status}}' eduvista-backend
```

Backend API:

```bash
curl http://localhost:5001/api/health
```

---

# 🗄️ MongoDB Persistence

MongoDB uses a Docker named volume:

```text
eduvista_mongodb_data
```

The volume is mounted at:

```text
/data/db
```

This allows database data to survive container recreation.

To view volumes:

```bash
docker volume ls
```

---

# 🔒 Security Considerations

The project follows basic container and application security practices:

* `.env` excluded from Git
* `node_modules` excluded from Git
* Backend production image installs production dependencies only
* Admin passwords are hashed with bcrypt
* JWT-based authentication
* Protected admin routes
* Separate Docker services
* Dedicated Docker network
* Persistent MongoDB volume
* Docker Hub credentials stored as GitHub Secrets

For production deployment, additional security should be configured, including:

* HTTPS/TLS
* Strong JWT secrets
* Secure database credentials
* Reverse proxy configuration
* Firewall rules
* Production MongoDB configuration
* Secret management
* Monitoring and logging

---

# 📊 DevOps Workflow

This project demonstrates a practical DevOps workflow:

```text
Develop
   ↓
Git
   ↓
GitHub
   ↓
GitHub Actions
   ↓
Build & Test
   ↓
Docker Build
   ↓
Docker Hub
   ↓
Docker Compose
   ↓
Running Application
```

---

# 🧪 Verification

After deployment, verify the stack:

```bash
docker compose ps
```

Then check:

```bash
curl http://localhost:5001/api/health
```

and open:

```text
http://localhost:8080
```

---

# 📌 Current Project Scope

The current project intentionally focuses on:

* Full-stack school management application
* Docker containerization
* Docker Compose orchestration
* GitHub Actions CI/CD
* Docker Hub image publishing
* Local deployment and verification

**Kubernetes is not included in the current implementation.**

---

# 🎯 Key DevOps Concepts Demonstrated

Through this project, the following concepts are implemented:

* Linux application deployment
* Git & GitHub
* GitHub Actions
* CI/CD pipelines
* Docker multi-stage builds
* Docker image management
* Docker Hub
* Docker Compose
* Container networking
* Container health checks
* Persistent Docker volumes
* Environment variables
* Service dependencies
* Node.js production containers
* Nginx-based frontend serving
* Backend containerization
* Database containerization

---

# 🚀 Future Improvements

Possible future improvements include:

* Production cloud deployment
* HTTPS with a custom domain
* Centralized logging
* Prometheus & Grafana monitoring
* Automated backups
* Infrastructure as Code
* Cloud deployment
* Kubernetes deployment
* Advanced security and secret management

---

# 👨‍💻 Author

**Manish Saini**

DevOps / Cloud Enthusiast

📍 Jaipur, Rajasthan, India

GitHub:
https://github.com/mannu-0

LinkedIn:
https://linkedin.com/in/manish-saini-devops/

---

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**EduVista — Building Futures, Inspiring Minds.**

