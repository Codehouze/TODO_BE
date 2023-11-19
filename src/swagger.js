const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require("dotenv");

dotenv.config();

const { APP_URL, PORT } = process.env;

const options = {
swaggerDefinition:{
    openapi: "3.0.0",
    info: {
        title: 'Todo Api',
        version: '1.0.0',
        description: "This is a simple todo API made with Express and documented with Swagger",
    },
    servers: [
        {
            url: `http://localhost:${PORT}/api/v1/`,
            description: "Development server"
        },
      
    ],
    security: [{ BearerAuth: [] }],
    components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
          },
        },
      },
},  
    apis:["src/routes/*.ts"],
   
}

const specs = swaggerJsdoc(options);

module.exports = specs
