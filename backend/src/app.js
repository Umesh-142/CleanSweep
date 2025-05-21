import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

import Complaintrouter from "./routes/complaint.routes.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//Middlewares::
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(express.static("public")); //public is a folder for storing files that can be available to everyone
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";

// //routes declareation
// app.use("/users",userRouter)  //here url is http://localhost:1200/users/

app.use("/api/v1/users", userRouter); //http://localhost:8000/api/v1/users/
//it calls a route names userRouter

app.use("/api/v1/users", Complaintrouter); //http://localhost:8000/api/v1/complaints/

app.get("/api/v1/users", (req, res) => {
  res.send("Server connected Successfully");
});

export { app };
