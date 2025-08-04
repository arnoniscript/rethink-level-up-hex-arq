class AuthController {
  constructor(authUseCases) {
    this.authUseCases = authUseCases;
  }

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