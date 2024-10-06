import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config({ path: "./.env" });

const app = express();

mongoose
  .connect(
    "mongodb+srv://quynhhuong179kj:0UnJakzTCJkUsEnz@cluster0.yg66z.mongodb.net/"
  )
  .then(() => {
    console.log("Kết nối tới database thành công");
  })
  .catch((err) => {
    console.log("Kết nối tới database thất bại", err);
  });

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.listen(process.env.PORT || 8081, () => {
  console.log("ENV", process.env.NODE_ENV);
  console.log("Server is running!");
});

app.use("/api/v1/auth", authMiddleware.authentication, authRoute);
app.use("/api/v1/user", authMiddleware.authentication, userRoute);
