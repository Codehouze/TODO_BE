import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import connectDb from "../src/database/config/index";

const app = express()
//connect to db

const initializeDb = async () => {
  await connectDb();
  console.log("Connected to database");
};

initializeDb();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
