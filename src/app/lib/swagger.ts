import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the project",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            surname: {
              type: "string",
            },
            login: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
        UserRegistrationPayload: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            surname: {
              type: "string",
            },
            login: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
        UserLoginPayload: {
          type: "object",
          properties: {
            login: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
        UserAnswer: {
          type: "object",
          properties: {
            token: {
              type: "string",
            },
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            surname: {
              type: "string",
            },
            login: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
        Incident: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            userId: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            surname: {
              type: "string",
            },
            status: {
              type: "string",
            },
            date: {
              type: "string",
              format: "date-time",
            },
            isPeriod: {
              type: "boolean",
            },
            startDate: {
              type: "string",
              format: "date-time",
            },
            endDate: {
              type: "string",
              format: "date-time",
            },
          },
        },
        IncidentCreatePayload: {
          type: "object",
          properties: {
            userId: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            surname: {
              type: "string",
            },
            status: {
              type: "string",
            },
            date: {
              type: "string",
              format: "date-time",
            },
            isPeriod: {
              type: "boolean",
            },
            startDate: {
              type: "string",
              format: "date-time",
            },
            endDate: {
              type: "string",
              format: "date-time",
            },
          },
        },
        IncidentUpdatePayload: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            userId: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            surname: {
              type: "string",
            },
            status: {
              type: "string",
            },
            date: {
              type: "string",
              format: "date-time",
            },
            isPeriod: {
              type: "boolean",
            },
            startDate: {
              type: "string",
              format: "date-time",
            },
            endDate: {
              type: "string",
              format: "date-time",
            },
          },
        },
        IncidentFilterPayload: {
          type: "object",
          properties: {
            userId: {
              type: "integer",
            },
            startDate: {
              type: "string",
              format: "date-time",
            },
            endDate: {
              type: "string",
              format: "date-time",
            },
            statuses: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./app/api/**/route.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
