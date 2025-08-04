const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const User = require('../domain/User');

class AuthUseCases {
  constructor(userRepository, jwtSecret) {
    this.userRepository = userRepository;
    this.jwtSecret = jwtSecret;
  }

  async register(email, password, name) {
    if (await this.userRepository.findByEmail(email)) {
      throw new Error("User already exists");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User(
      Date.now().toString(),
      email,
      hashedPassword,
      name
    );
    await this.userRepository.save(user);
    return user;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.isValidPassword(password)) {
      throw new Error("Invalid credentials");
    }
    return jwt.sign({ userId: user.id }, this.jwtSecret);
  }
}

module.exports = AuthUseCases;