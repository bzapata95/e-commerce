const { Router } = require("express");
const routes = Router();
const authmiddleware = require("./middleware/auth");

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");
const VerifyController = require("./controllers/VerifyController");

routes.post("/login", AuthController.login);
routes.post("/forgot_password", AuthController.forgotPassword);
routes.post("/reset_password", AuthController.resetPassword);

routes.post("/users", UserController.store);

routes.post("/verify_email", authmiddleware, VerifyController.verify);

module.exports = routes;
