const Project = require("../models/Project");

const createProject = async (req, res) => {
  const { title } = req.body;
  try {
    const projectCount = await Project.countDocuments({ user: req.user.id });
    if (projectCount >= 4) {
      return res.status(400).json({ error: "Maximum 4 projects allowed" });
    }
    const project = await Project.create({ title, user: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createProject, getProjects };
