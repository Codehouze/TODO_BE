// Import necessary modules
const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require("dotenv");

// Load environment variables from a .env file
dotenv.config();

// Extract the PORT variable from the environment
const { PORT } = process.env;

// Swagger options for API documentation
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'Todo API',
      version: '1.0.0', 
      description: "This is a simple Todo API made with Express and documented with Swagger", 
    },
    // Base URL of the API
    servers: [
      { 
        url: `http://localhost:${PORT}/api/v1/`, 
        description: "Development server", 
      },
    ],
 
  },
  // Specify the paths to your API routes
  apis: ["src/routes/*.ts"], 
};

// Generate Swagger documentation using swagger-jsdoc
const specs = swaggerJsdoc(options);

// Export the generated Swagger documentation
module.exports = specs;
