import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 9000;

try {
  app.listen(PORT, () => {
    console.log(`CONNECTED TO DB AND SERVER START ON ${PORT}`);
  });
} catch (err) {
  console.error(err);
}