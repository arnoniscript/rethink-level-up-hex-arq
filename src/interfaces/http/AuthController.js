/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "12345"
 *         email:
 *           type: string
 *           format: email
 *           example: "usuario@exemplo.com"
 *         name:
 *           type: string
 *           example: "Fulano da Silva"
 *     AuthToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "User already exists"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operações de autenticação de usuários
 */
class AuthController {
  constructor(authUseCases) {
    this.authUseCases = authUseCases;
  }

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registra um novo usuário
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *               - name
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 description: E-mail do usuário
   *                 example: "usuario@exemplo.com"
   *               password:
   *                 type: string
   *                 format: password
   *                 description: Senha com pelo menos 6 caracteres
   *                 example: "senha123"
   *               name:
   *                 type: string
   *                 description: Nome completo do usuário
   *                 example: "Fulano da Silva"
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: |
   *           Possíveis erros:
   *           - "User already exists" (usuário já cadastrado)
   *           - "Missing required fields" (campos obrigatórios faltando)
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             examples:
   *               userExists:
   *                 value:
   *                   error: "User already exists"
   *               missingFields:
   *                 value:
   *                   error: "Missing required fields"
   */
  async register(req, res) {
    try {
      const user = await this.authUseCases.register(
        req.body.email,
        req.body.password,
        req.body.name
      );
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Autentica um usuário existente
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: "usuario@exemplo.com"
   *               password:
   *                 type: string
   *                 format: password
   *                 example: "senha123"
   *     responses:
   *       200:
   *         description: Login bem-sucedido
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthToken'
   *       401:
   *         description: |
   *           Possíveis erros:
   *           - "Invalid credentials" (credenciais inválidas)
   *           - "User not found" (usuário não encontrado)
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             examples:
   *               invalidCredentials:
   *                 value:
   *                   error: "Invalid credentials"
   *               userNotFound:
   *                 value:
   *                   error: "User not found"
   */
  async login(req, res) {
    try {
      const token = await this.authUseCases.login(
        req.body.email,
        req.body.password
      );
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;