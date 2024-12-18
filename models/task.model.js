const mongoose = require('mongoose');

// Enum for task statuses
const taskStatusEnum = ['pending', 'completed', 'in-progress'];

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: Number,
    enum: [1, 2, 3], // 1 = High, 2 = Medium, 3 = Low
    required: true,
  },
  status: {
    type: String,
    enum: taskStatusEnum,
    default: 'pending',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  // Link to user (many-to-one relationship)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Link to category
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
