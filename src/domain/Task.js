class Task {
  constructor(id, title, userId, completed = false) {
    this.id = id;
    this.title = title;
    this.userId = userId; 
    this.completed = completed;
  }
}

module.exports = Task;