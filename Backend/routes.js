const express = require('express');
const bodyParser = require("body-parser");

// routes
const userRoutes = require("./routes/userRoutes/UserRoutes");
const taskRoutes = require("./routes/taskRoutes/TaskRoutes");

const router = express.Router();

router.use(bodyParser.json());


router.use("/api/users", userRoutes);
router.use("/api/tasks", taskRoutes); 

module.exports = router;

