class TaskUseCases {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(title, userId) {
    const task = new Task(Date.now().toString(), title, userId);
    await this.taskRepository.save(task);
    return task;
  }

  async getTasksByUser(userId) {
    return this.taskRepository.findByUserId(userId);
  }
}

module.exports = TaskUseCases;