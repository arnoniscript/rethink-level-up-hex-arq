const User = require("../../domain/User");
const userModel = require("./models/UserModel"); 

class UserRepository {
  async findByEmail(email) {
    const user = await userModel.findOne({ email });
    return user ? new User(user.id, user.email, user.password, user.name) : null;
  }

  async save(user) {
    await userModel.create({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    });
  }
}

module.exports = UserRepository;