// Import the necessary modules
import * as jwt from "jsonwebtoken";
import config from "../config/index";

// Extract the APP_SECRET from the configuration
const { APP_SECRET } = config;

/**
 * Middleware function to verify the JWT token in the request headers.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns {void}
 */

const verifyJwtToken = (req: any, res: any, next: any) => {
  try {
    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];
    // Verify the token using the specified algorithm and APP_SECRET
    const payload = jwt.verify(token, APP_SECRET, { algorithms: ["HS256"] });
     // If verification is successful, attach the payload to the request and call the next middleware
    if (payload) {
      req.user = payload;
      return next();
    } else {
      // If verification fails, return a 401 Unauthorized response
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err: any) {
    // Handle specific error types
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
        // Log any other errors and return a 401 Unauthorized response
      console.error(err);
      return res.status(401).json({ message: "Token verification failed" });
    }
  }
};

export default verifyJwtToken;
