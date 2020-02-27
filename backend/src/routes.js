const { Router } = require("express");
const routes = Router();

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

routes.post("/login", AuthController.login);
routes.post("/users", UserController.store);

module.exports = routes;
