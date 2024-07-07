const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management API",
      version: "1.0.0",
      description: "API documentation for managing library books and members",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            title: { type: "string" },
            author: { type: "string" },
            stock: { type: "integer" },
          },
          required: ["title", "author", "stock"],
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
