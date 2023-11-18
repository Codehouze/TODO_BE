import * as jwt from "jsonwebtoken";
import config from "../config/index";

const { APP_SECRET } = config;

const verifyJwtToken = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, APP_SECRET, { algorithms: ["HS256"] });
    if (payload) {
      req.user = payload;
      return next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      console.error(err);
      return res.status(401).json({ message: "Token verification failed" });
    }
  }
};

export default verifyJwtToken;
