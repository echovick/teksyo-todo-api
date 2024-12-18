const express = require("express");
const authController = require("../controllers/auth.controller.js");
const taskController = require("../controllers/task.controller.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/me", auth, authController.me);

// Todos
router.get("/todos", auth, taskController.getAllTasks);
router.post("/todos", auth, taskController.addNewTask);
router.put('/todos/:id', auth, taskController.updateTask);
router.delete('/todos/:id', auth, taskController.deleteTask);
router.get('/todos/status/:status', auth, taskController.getByStatus);



module.exports = router;
