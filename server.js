import express from "express"

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: JSON request body read karne ke liye
app.use(express.json());

// Temporary in-memory data
let tasks = [
  { id: 1, title: "Learn Docker", completed: false },
  { id: 2, title: "Deploy backend on AWS EC2", completed: false },
];

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running!",
  });
});

// 1. GET - All tasks retrieve karna
app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// 2. POST - New task create karna
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Valid task title is required",
    });
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
});

// 3. PUT - Existing task update karna
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  if (
    title !== undefined &&
    (typeof title !== "string" || !title.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Title must be a non-empty string",
    });
  }

  if (
    completed !== undefined &&
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Completed must be true or false",
    });
  }

  if (title !== undefined) {
    task.title = title.trim();
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

// 4. DELETE - Task delete karna
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask,
  });
});

// Unknown routes handle karna
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Server start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
