const User = require("../models/User");

module.exports = {
  async verify(req, res) {
    const { token } = req.body;
    console.log(req.userId);
    const user = await User.findById(req.userId).select("+verify +verifyToken");

    if (token !== user.verifyToken)
      return res
        .status(400)
        .send({ message: "No puede verificar su correo el token no existe!" });

    await user.update({ verify: true });

    return res.json({ message: "Gracias por veficicar tu cuenta" });
  }
};
