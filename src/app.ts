import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import connectDb from "../src/database/config/index";
import specs from './swagger';
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');



const app = express()


//connect to db
const initializeDb = async () => {
  await connectDb();
  console.log("Connected to database");
};

initializeDb();
// Middleware

// Enable CORS for all routes
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add swagger route 
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(specs));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);



// Health check
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
