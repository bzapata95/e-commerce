const { Router } = require("express");
const routes = Router();

const UserController = require("./controllers/UserController");

routes.post("/users", UserController.store);

module.exports = routes;
