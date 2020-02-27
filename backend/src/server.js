const express = require("express");
const app = express();
const connectDb = require("./db");
connectDb();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.listen(process.env.PORT || 3333);
