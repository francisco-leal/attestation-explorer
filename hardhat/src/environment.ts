import { ENVIRONMENT } from "./constants";
import dotenv from "dotenv";
import path from "path";

if (ENVIRONMENT === "development") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
  });
}
