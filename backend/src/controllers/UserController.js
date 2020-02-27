const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { name, address, email, code, phone, password } = req.body;

    // Verificar campos

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      address,
      email,
      code,
      phone,
      password: hash
    });

    return res.send();
  }
};
