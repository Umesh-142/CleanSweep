import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new ApiError(401, "Unauthorized");

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};
