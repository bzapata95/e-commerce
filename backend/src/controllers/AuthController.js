const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = require("./utils/generateToken");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Verifique sus credenciales" });
    }

    const passVerify = await bcrypt.compare(password, user.password);
    if (!passVerify)
      return res.status(400).json({ message: "Verifique sus credenciales" });

    const payload = { id: user._id };

    const token = generateToken(payload);
    return res.json({ token });
  }
};
