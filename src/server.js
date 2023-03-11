const path = require("path");

const express = require("express");
const app = express();

const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJs = require("swagger-jsdoc");

const { SERVER_PORT, DB_URL } = require("./constants");
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
    app.use(morgan("dev"));
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
      res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: ReasonPhrases.NOT_FOUND,
      });
    });

    app.use((error, req, res, next) => {
      const statusCode = error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
      res.status(statusCode).send({
        success: false,
        statusCode: statusCode,
        message: errorMessage,
      });
    });
  }

  configDataBase() {
    mongoose
      .connect(DB_URL)
      .then(() => {
        console.log("mongoose connect successfully");
      })
      .catch((e) => {
        console.log("mongoose connection failed by: ", e);
      });

    require("./config/redis");
  }

  configSwagger() {
    app.use(
      "/apis",
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJs({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "this is a simple blog",
              description: "this blog created using express and mongodb",
              version: "1.0.0",
            },
            servers: [
              {
                url: "http://localhost:8000",
              },
            ],
          },
          apis: [`${__dirname}/swagger/**/*.js`],
        }),
        {
          explorer: true,
        }
      )
    );
  }
}

module.exports = Server;
