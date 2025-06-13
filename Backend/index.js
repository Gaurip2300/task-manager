const express = require("express");
const connectDB = require("./config/db")
const morgan = require("morgan");

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const routes = require("./routes");

const app = express();
require("dotenv").config();

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
app.use(morgan('dev'))

connectDB();
app.use(express.json());

app.use(errorHandler)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on port : ${PORT}`))