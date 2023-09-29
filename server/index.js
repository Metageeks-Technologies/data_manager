import express from "express";
// import "./delete.js"
import connectDB from "./utils/connectDb.js";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error.js";
import mainDataRouter from "./routes/mainDataRoutes.js";
import userRouter from "./routes/userRouts.js";
import UpdateDataRouter from "./routes/updateDataRoute.js";
import IPRouter from "./routes/ipRoutes.js"
import forgetPasswordRouter from "./routes/otpRoute.js";
import activityRouter from "./routes/activityRoutes.js";

import optionRouter from "./routes/optionRoutes.js"
// import { createServer } from 'http'
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
// import {Server} from 'socket.io';
// ES6 module for dirname
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import checkAllowedIP from "./middleware/ip.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app
const app = express();
app.set('trust proxy', true);
app.use(cors()); 
app.use(checkAllowedIP);


app.use(morgan("dev"));
dotenv.config();
// static->frontend
app.use(express.static(path.resolve(__dirname,'../server/dist')))
 
// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/activity",activityRouter );
app.use("/api/v1/auth", userRouter);
app.use("/api/v1", mainDataRouter);
app.use("/api/v1/edit", UpdateDataRouter);
app.use("/api/v1/forgetPassword", forgetPasswordRouter);

app.use("/api/v1/ip",IPRouter);
app.use("/api/v1/option",optionRouter);


 
app.use("/download",express.static("uploads"));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'../server/dist/index.html'));
});
// errorMiddleware
app.use(errorMiddleware);

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
