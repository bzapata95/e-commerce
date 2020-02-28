const crypto = require("crypto");

const User = require("../models/User");

const generateToken = require("./utils/generateToken");
const mailer = require("../config/mailer");

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

    const verifyToken = crypto.randomBytes(20).toString("hex");

    user = await User.create({
      name,
      address,
      email,
      code,
      phone,
      password,
      verifyToken
    });

    const payload = { id: user._id };
    const token = generateToken(payload);

    mailer.sendMail(
      {
        to: email,
        from: `Above merch ${process.env.EMAIL_SEND}`,
        template: "verify",
        subject: "Verificación de su correco electrónico",
        context: {
          title: "Verifica tu correo",
          link: "http://asd.com",
          button_text: "Ir a verificar mi correo",
          text_aditional:
            "Verificando tu cuenta nos ayudará a contactarte si pasa algún percance, mandarte promociones y muchísimos descuentos",
          token,
          body:
            "Por favor, verifica tu correo electrónico para porder saber que tu correo existe y hacer los movimiento mucho más rápidos"
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

    return res.json({ token });
  }
};
