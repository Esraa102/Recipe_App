import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { userRouter } from "./routes/users.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { recipesRouter } from "./routes/recipes.js";
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/auth", userRouter);
app.use("/api/recipes", recipesRouter);
app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route Not Found");
});
app.use(errorHandler);
app.listen(port, () => console.log("Server Is Running"));
