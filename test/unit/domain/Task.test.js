const Task = require('../../../src/domain/Task');

describe('Task Entity', () => {
  test('Deve criar uma tarefa não concluída por padrão', () => {
    const task = new Task('1', 'Estudar Hexagonal', 'user123');
    expect(task.completed).toBe(false);
    expect(task.title).toBe('Estudar Hexagonal');
    expect(task.userId).toBe('user123');
  });

  test('Deve criar uma tarefa concluída quando especificado', () => {
    const task = new Task('1', 'Tarefa Concluída', 'user123', true);
    expect(task.completed).toBe(true);
  });
});