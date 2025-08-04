const Task = require('../domain/Task');

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

  async completeTask(taskId, userId) {
  const task = await this.taskRepository.findById(taskId);
  
  if (!task) {
    throw new Error('Task not found');
  }
  
  if (task.userId !== userId) {
    throw new Error('Unauthorized');
  }
  
  task.completed = true;
  await this.taskRepository.save(task);
}
}

module.exports = TaskUseCases;