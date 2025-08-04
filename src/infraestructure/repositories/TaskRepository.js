const Task = require('../../domain/Task');

class TaskRepository {
  constructor() {
    this.tasks = new Map(); // Simulando banco de dados em memória
  }

  async save(task) {
    this.tasks.set(task.id, task);
    return task;
  }

  async findByUserId(userId) {
    return Array.from(this.tasks.values()).filter(task => task.userId === userId);
  }

  async findById(id) {
    return this.tasks.get(id);
  }
}

module.exports = TaskRepository;