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

 async completeTask(req, res) {
  try {
    const taskId = req.params.id;
    await this.taskUseCases.completeTask(taskId, req.userId);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
}

module.exports = TaskController;