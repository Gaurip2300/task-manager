# Task Manager Backend

This is the backend API for the **Task Manager** application built with:

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing
- CRUD APIs for User and Task Management

## 🚀 Getting Started

## Backend Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)

```bash
git clone https://github.com/Gaurip2300/task-manager.git
cd Backend
```

### Configure Environment
- Create a .env file in the root:
```bash
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
CLIENT_URL=<ADD_CLIENT_URL>
```

Run the Server
```bash
npm start
```
