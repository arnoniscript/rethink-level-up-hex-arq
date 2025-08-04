/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "12345"
 *         title:
 *           type: string
 *           example: "Estudar Arquitetura Hexagonal"
 *         userId:
 *           type: string
 *           example: "54321"
 *         completed:
 *           type: boolean
 *           example: false
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Task not found"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas
 */

class TaskController {
  constructor(taskUseCases) {
    this.taskUseCases = taskUseCases;
  }

  /**
   * @swagger
   * /tasks:
   *   post:
   *     summary: Cria uma nova tarefa
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *             properties:
   *               title:
   *                 type: string
   *                 example: "Estudar Arquitetura Hexagonal"
   *     responses:
   *       201:
   *         description: Tarefa criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Task'
   *       400:
   *         description: Erro na requisição
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             examples:
   *               missingTitle:
   *                 value:
   *                   error: "Title is required"
   */
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

  /**
   * @swagger
   * /tasks:
   *   get:
   *     summary: Lista todas as tarefas do usuário
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de tarefas do usuário
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Task'
   *       401:
   *         description: Não autorizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async getTasks(req, res) {
    const tasks = await this.taskUseCases.getTasksByUser(req.userId);
    res.json(tasks);
  }

  /**
   * @swagger
   * /tasks/{id}/complete:
   *   patch:
   *     summary: Marca uma tarefa como completa
   *     tags: [Tasks]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID da tarefa
   *     responses:
   *       204:
   *         description: Tarefa marcada como completa com sucesso
   *       404:
   *         description: |
   *           Possíveis erros:
   *           - "Task not found" (tarefa não encontrada)
   *           - "Unauthorized" (usuário não tem permissão)
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             examples:
   *               notFound:
   *                 value:
   *                   error: "Task not found"
   *               unauthorized:
   *                 value:
   *                   error: "Unauthorized"
   */
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