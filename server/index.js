import express from "express";
// import "./delete.js"
import connectDB from "./utils/connectDb.js";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error.js";
import mainDataRouter from "./routes/mainDataRoutes.js";
import userRouter from "./routes/userRouts.js";
import UpdateDataRouter from "./routes/updateDataRoute.js";
import forgetPasswordRouter from "./routes/otpRoute.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

// ES6 module for dirname
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app
const app = express();
app.use(morgan("dev"));
dotenv.config();

// static->frontend
app.use(express.static(path.resolve(__dirname,'../server/dist')))
 
// middleware
app.use(express.json());
app.use(
  cors()
);
app.use(cookieParser());

// routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1", mainDataRouter);
app.use("/api/v1/edit", UpdateDataRouter);
app.use("/api/v1/forgetPassword", forgetPasswordRouter);

 
app.use("/download",express.static("uploads"));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'../server/dist/index.html'));
});
// errorMiddleware
app.use(errorMiddleware);

// port and listing
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(
        `server is running on ${port}.... as well as connected with database`
      )
    );
  } catch (error) {
    console.log(error);
  }
};
start();
