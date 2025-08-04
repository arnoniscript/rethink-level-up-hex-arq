class TaskController {
  constructor(taskUseCases) {
    this.taskUseCases = taskUseCases;
  }

  async createTask(req, res) {
    try {
      const task = await this.taskUseCases.createTask(
        req.body.title,
        req.userId
      );
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTasks(req, res) {
    const tasks = await this.taskUseCases.getTasksByUser(req.userId);
    res.json(tasks);
  }
}

module.exports = TaskController;