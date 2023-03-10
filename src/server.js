const express = require("express");
const app = express();
const path = require("path");
const { SERVER_PORT } = require("./constants");
const baseRoutes = require("./routes");

class Server {
  constructor() {
    this.configDataBase();
    this.configApp();
    this.configSwagger();
    this.configRoutes();
    this.configErrors();
    this.configServer();
  }

  configApp() {
    // app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "public")));
  }

  configServer() {
    app.listen(SERVER_PORT, () => {
      console.log("app launched on port: ", SERVER_PORT);
    });
  }

  configRoutes() {
    app.use("/", baseRoutes);
  }

  configErrors() {
    app.use((req, res, next) => {
      res.status(400).send({
        success: false,
        statusCode: 400,
        message: "route not found",
      });
    });

    app.use((error, req, res, next) => {
      const statusCode = error.StatusCode || 500;
      const errorMessage = error.message || "internal server error";
      res.status(statusCode).send({
        success: false,
        statusCode: statusCode,
        message: errorMessage,
      });
    });
  }

  configDataBase() {}

  configSwagger() {}
}

module.exports = Server;
