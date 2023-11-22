import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todoRoutes";
import connectDb from "../src/database/config/index";
import specs from './swagger';
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express()

//connect to the database
const initializeDb = async () => {
  await connectDb();
  console.log("Connected to database");
};

initializeDb();
// Middleware

// Enable CORS for all routes
app.use(cors());

// Parse incoming requests with JSON payload
app.use(express.json());

// Parse incoming requests with URL-encoded payload
app.use(express.urlencoded({ extended: true }));

// Add swagger documentation route 
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(specs));

// Routes

app.use("/api/v1/todo", todoRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;
