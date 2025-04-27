const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({ 
      title, 
      description, 
      project: req.params.projectId 
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, status, completedAt: status === "Completed" ? new Date() : null },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
