# To-Do App API

This is a Node.js-based API for a to-do application. The API allows users to manage their tasks, including features like authentication, categorization, filtering by status, priorities, and more.

---

## Features

- User authentication and session management.
- CRUD operations for tasks.
- Tasks can be filtered by status (pending, completed, or in-progress).
- Tasks can have due dates, priorities, and categories.

---

## Prerequisites

Ensure you have the following installed on your system:

1. [Node.js](https://nodejs.org/) (v14 or later)
2. [MongoDB](https://www.mongodb.com/) (local or cloud instance)
3. [Git](https://git-scm.com/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/echovick/teksyo-todo-api.git
cd teksyo-todo-api
```

### 2. Install Dependencies

Run the following command to install required npm packages:

```bash
npm install
```

### 3. Configure Environment Variables

Before running the application, make sure to create a `.config.env` file in the root directory by duplicating the `.config.env.example` file and renaming it to `.config.env`. Then, fill in the required values for the environment variables:

```env
APP_NAME=Express
NODE_ENV=development
PORT=3000
JWT_SECRET=teksyotodo

DATABASE_LOCAL=mongodb://localhost:27017/todoapp # change helloworld to your desired local DB name

DATABASE_CONNECION_STRING=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

### 4. Start MongoDB

Ensure MongoDB is running locally or configure the `DATABASE_CONNECION_STRING` in your `.config.env` file to point to a cloud MongoDB instance.

### 5. Start the Server

Run the following command to start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

---

## API Endpoints

### **Authentication**

#### 1. Register User

**POST** `/auth/register`

**Request Body:**
```json
{
  "username": "JohnDoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User registration successful",
  "data": {
    "user": { ... }
  }
}
```

#### 2. Login User

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

---

### **Task Management**

#### 1. Fetch All Tasks

**GET** `/todos`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**
```json
{
  "message": "Tasks fetched successfully",
  "data": [ ...tasks ]
}
```

#### 2. Fetch Tasks by Status

**GET** `/todos/status/:status`

**Parameters:**
- `status` (string): `pending`, `completed`, or `in-progress`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**
```json
{
  "message": "Tasks with status 'pending' fetched successfully",
  "data": [ ...tasks ]
}
```

#### 3. Add a New Task

**POST** `/todos`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description here",
  "dueDate": "2024-12-25",
  "priority": 1,
  "status": "pending",
  "isFavorite": false,
  "category": "Work"
}
```

**Response:**
```json
{
  "message": "Task added successfully",
  "data": { ...task }
}
```

#### 4. Update a Task

**PUT** `/todos/:id`

**Parameters:**
- `id` (string): Task ID

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Request Body:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "data": { ...updatedTask }
}
```

#### 5. Delete a Task

**DELETE** `/todos/:id`

**Parameters:**
- `id` (string): Task ID

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Project Structure

```
.
├── controllers
│   ├── auth.controller.js     # Authentication controllers
│   ├── task.controller.js     # Tasks / Todo controller
├── middlewares
│   ├── auth.js   # Middleware for user authentication
├── models
│   ├── category.model.js     # category schema and model
│   ├── task.model.js     # Task schema and model
│   ├── user.model.js     # User schema and model
├── routes
│   ├── api.routes.js    # All application routes
├── utils
│   ├── apiResponder.js   # Utility for sending consistent API responses
│   ├── connectToDatabase.js   # Utility connecting to the database of your choice
│   ├── responseStatus.js   # Utility for keeping status codes
├── app.js                # Main application file
├── package.json          # Dependencies and scripts
```

---

## License

This project is licensed under the MIT License. Feel free to modify and use as needed.

---

## Contributions

Contributions are welcome! Please fork the repository and submit a pull request for review.

