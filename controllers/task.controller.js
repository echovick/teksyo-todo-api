const Task = require("../models/task.model.js");
const { successResponse, failureResponse } = require("../utils/apiResponder");

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all tasks belonging to the authenticated user
    const tasks = await Task.find({ user: userId }).populate("category");

    return successResponse(res, tasks, "Tasks Retrieved Successfully");
  } catch (error) {
    return failureResponse(res, error.message, 500);
  }
};

const addNewTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      isFavorite,
      category,
    } = req.body;
    const userId = req.user._id;

    // Create a new task
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      isFavorite,
      category,
      user: userId,
    });
    await newTask.save();

    return successResponse(res, newTask, "Task added successfully");
  } catch (error) {
    return failureResponse(res, error.message, 500);
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    // Ensure the status is valid
    if (status && !["pending", "completed", "in-progress"].includes(status)) {
      return failureResponse(res, "Invalid status", 400);
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user._id },
      { status, title, description },
      { new: true }
    );

    if (!task) {
      return failureResponse(
        res,
        "Task not found or you do not have permission to update this task",
        400
      );
    }

    return successResponse(res, task, "Task updated successfully");
  } catch (error) {
    return failureResponse(res, error.message, 400);
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOneAndDelete({
      _id: taskId,
      user: req.user._id,
    });

    if (!task) {
      return failureResponse(
        res,
        "Task not found or you do not have permission to delete this task",
        404
      );
    }

    return successResponse(res, task, "Task deleted successfully");
  } catch (error) {
    return failureResponse(res, error.message, 500);
  }
};

const getByStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status } = req.params;

    // Validate the status value
    const validStatuses = ["pending", "completed", "in-progress"];
    if (!validStatuses.includes(status)) {
      return failureResponse(res, "Invalid status provided", 400);
    }

    // Fetch tasks for the user with the specified status
    const tasks = await Task.find({ user: userId, status }).populate(
      "category"
    );

    return successResponse(
      res,
      tasks,
      `Tasks with status '${status}' fetched successfully`
    );
  } catch (error) {
    return failureResponse(res, error.message, 500);
  }
};

module.exports = {
  getAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
  getByStatus
};
