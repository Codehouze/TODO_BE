// Load environment variables from a .env file
require("dotenv").config();

import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

// Extract database configuration variables from environment variables
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

// Import the database entities
import User from "../entity/User";
import Todo from "../entity/Todo";

// Define the database configuration options
const DB_CONFIG: DataSourceOptions = {
  type: "postgres",  // Database type (PostgreSQL in this case)
  host: DB_HOST,      // Database host
  port: undefined,    // Database port (undefined for default)
  username: DB_USERNAME,  // Database username
  password: DB_PASSWORD,  // Database password
  database: DB_NAME,      // Database name
  synchronize: true,      // Synchronize the database schema on every application launch (for development purposes)
  ssl: true,              // Enable SSL connection to the database

  // Extra options for SSL configuration
  extra: {
    ssl: {
      // Disable SSL certificate validation (for development purposes)
      rejectUnauthorized: false, 
    },
  },
// List of entity classes to be used by TypeORM
  entities: [User, Todo],  
  // Specify migration files location
  migrations: [__dirname + "./migrations/*{.js,.ts}"],  
};

// Create a TypeORM DataSource instance with the defined configuration
export const DB = new DataSource(DB_CONFIG);

// Declare a variable to hold the DataSource instance
let dataSource: DataSource;

// Function to connect to the database
export const ConnectDb = async () => {
  // Initialize the DataSource and store it in the 'dataSource' variable
  dataSource = await DB.initialize();
};

// Export the ConnectDb function
export default ConnectDb;
