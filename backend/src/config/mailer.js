require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

var transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  }
});

// var handlebarsOptions = {
//   viewEngine: {
//     extName: ".html",
//     partialsDir: path.resolve("./views/mail/"),
//     layoutsDir: path.resolve("./views/mail/"),
//     defaultLayout: "forgot_password.html"
//   },
//   viewPath: path.resolve("./views/mail/"),
//   extName: ".html"
// };

const handlebarsOptions = {
  viewEngine: {
    extName: ".html",
    partialsDir: path.resolve("./views/email"),
    layoutsDir: path.resolve("./views/email"),
    defaultLayout: "template.html"
  },
  viewPath: path.resolve("./views/email"),
  extName: ".html"
};

transport.use("compile", hbs(handlebarsOptions));

module.exports = transport;
