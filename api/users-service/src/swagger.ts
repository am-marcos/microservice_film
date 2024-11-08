import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentation de l'API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              description: "Nom de l'utilisateur",
            },
            email: {
              type: "string",
              description: "Email de l'utilisateur",
            },
            password: {
              type: "string",
              description: "Mot de passe de l'utilisateur",
            },
          },
        },
      },
    },
  },
  apis: [path.resolve(__dirname, "./routes/userRoutes.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
