const User = require("../models/User");

const generateToken = require("./utils/generateToken");

module.exports = {
  async store(req, res) {
    const { name, address, email, code, phone, password } = req.body;

    let user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
      if (email === user.email)
        return res.status(400).send({ message: "Este email esta en uso" });
      if (phone === user.phone)
        return res
          .status(400)
          .send({ message: "Esthe número telefónico ya esta en uso" });
    }

    user = await User.create({
      name,
      address,
      email,
      code,
      phone,
      password
    });

    const payload = { id: user._id };
    const token = generateToken(payload);

    return res.json({ token });
  }
};
