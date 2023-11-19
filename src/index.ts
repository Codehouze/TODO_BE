import app from "./app";
import * as dotenv from "dotenv";

 // Load environment variables from .env file
dotenv.config();

// Set the port for the server
const PORT = process.env.PORT || 9000; 
try {
  // Attempt to start the server and log a message upon successful connection
  app.listen(PORT, () => {
    console.log(`CONNECTED TO DB AND SERVER START ON ${PORT}`);
  });
} catch (err) {
  // Log an error message if there's an issue starting the server
  console.error(err);
}