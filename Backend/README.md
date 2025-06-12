# Task Manager Backend

This is the backend API for the **Task Manager** application built with:

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing
- CRUD APIs for User and Task Management

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <repo-url>
cd backend

### Install Dependencies
npm install

### Configure Environment
Create a .env file in the root:
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
CLIENT_URL=<ADD_CLIENT_URL>

Run the Server
npm start
