const express = require("express");
const userRoutes = require("./routes/userRoutes/UserRoutes");
const taskRoutes = require("./routes/taskRoutes/TaskRoutes");
const connectDB = require("./config/db")
const app = express();
require("dotenv").config();
app.set("trust proxy", 1);

const cors = require("cors");
const errorHandler = require("./middleware/errro");
app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
);
app.options('*', cors());

connectDB();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes); 

app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on port : ${PORT}`))