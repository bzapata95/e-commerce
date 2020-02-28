const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");

const generateToken = require("./utils/generateToken");
const mailer = require("../config/mailer");

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
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Usuario no encontrado" });

      const token = crypto.randomBytes(20).toString("hex");
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.findByIdAndUpdate(user._id, {
        $set: { passwordResetToken: token, passwordResetExpires: now }
      });

      mailer.sendMail(
        {
          to: email,
          from: `Above merch ${process.env.EMAIL_SEND}`,
          template: "forgot",
          subject: "Recuperación de contraseña",
          context: {
            title: "Recuperación de contraseña",
            link: "http://asd.com",
            button_text: "Recuperar mi contraseña",
            text_aditional:
              "Si no fuiste tu quien solicitó el cambio de contraseña, por favor elimina este mensaje.",
            token,
            body:
              "Has olvidado tu contraseña? Perfecto, puedes usar este enlace para que puedas recuperarlo"
          }
        },
        err => {
          if (err)
            return res
              .status(400)
              .send({ message: "Ocurrió un error al enviar el correo" });
          return res.send();
        }
      );
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send({ message: "Error en recuperar contraseña, pruebe nuevamente" });
    }
  },

  async resetPassword(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ email }).select(
        "+passwordResetToken passwordResetExpires"
      );
      if (!user)
        return res.status(400).send({ message: "Usuario no encontrado" });

      if (token !== user.passwordResetToken)
        return res.status(400).send({ message: "Token invalido" });
      const now = new Date();

      if (now > user.passwordResetExpires)
        return res.status(400).send({ message: "Token a expiró" });

      user.password = password;

      await user.save();

      return res.send();
    } catch (error) {
      return res.status(400).send({
        message: "No se puede resetear password, por favor intente nuevamente"
      });
    }
  }
};
