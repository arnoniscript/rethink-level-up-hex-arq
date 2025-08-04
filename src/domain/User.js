const bcrypt = require('bcrypt');

class User {
  constructor(id, email, password, name) {
    this.id = id;
    this.email = email;
    this.password = password; 
    this.name = name;
  }

  isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;