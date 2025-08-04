const TaskUseCases = require('../../../src/application/TaskUseCases');
const Task = require('../../../src/domain/Task');

describe('TaskUseCases', () => {
  let mockRepo;
  let taskUseCases;

  beforeEach(() => {
    mockRepo = {
      save: jest.fn(),
      findByUserId: jest.fn(),
      findById: jest.fn()
    };
    taskUseCases = new TaskUseCases(mockRepo);
    jest.spyOn(Date, 'now').mockReturnValue(123456789);
  });

  describe('createTask', () => {
    test('Deve criar e salvar uma nova tarefa', async () => {
      mockRepo.save.mockResolvedValue(true);
      
      const result = await taskUseCases.createTask('Nova Tarefa', 'user1');
      
      expect(mockRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Nova Tarefa',
          userId: 'user1'
        })
      );
      expect(result).toBeInstanceOf(Task);
    });
  });

  describe('getTasksByUser', () => {
    test('Deve retornar tarefas do usuário', async () => {
      const mockTasks = [
        new Task('1', 'Tarefa 1', 'user1'),
        new Task('2', 'Tarefa 2', 'user1')
      ];
      mockRepo.findByUserId.mockResolvedValue(mockTasks);
      
      const tasks = await taskUseCases.getTasksByUser('user1');
      
      expect(tasks).toHaveLength(2);
      expect(mockRepo.findByUserId).toHaveBeenCalledWith('user1');
    });
  });

  describe('completeTask', () => {
    test('Deve marcar tarefa como concluída', async () => {
      const mockTask = new Task('1', 'Tarefa', 'user1');
      mockRepo.findById.mockResolvedValue(mockTask);
      mockRepo.save.mockResolvedValue(true);
      
      await taskUseCases.completeTask('1', 'user1');
      
      expect(mockTask.completed).toBe(true);
      expect(mockRepo.save).toHaveBeenCalled();
    });

    test('Deve lançar erro quando tarefa não existe', async () => {
      mockRepo.findById.mockResolvedValue(null);
      
      await expect(taskUseCases.completeTask('999', 'user1'))
        .rejects.toThrow('Task not found');
    });

    test('Deve lançar erro quando usuário não é o dono', async () => {
      const mockTask = new Task('1', 'Tarefa', 'user1');
      mockRepo.findById.mockResolvedValue(mockTask);
      
      await expect(taskUseCases.completeTask('1', 'user2'))
        .rejects.toThrow('Unauthorized');
    });
  });
});