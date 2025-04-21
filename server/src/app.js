import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config({path: "./.env"});

const app = express();


console.log(process.env.CORS_ORIGIN);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    // methods: ["GET", "POST", "PATCH", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
}))
console.log("app.js", process.env.CORS_ORIGIN);

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("public"));
app.use(cookieParser());


import userRouter from "./routes/user.routes.js";
import bloodRequestRouter from "./routes/bloodRequest.routes.js";
import chatRouter from "./routes/chatbot.routes.js";


app.use("/api/v1/users", userRouter);
app.use("/api/v1/blood-requests", bloodRequestRouter);
app.use("/api/v1/chat", chatRouter);


export {app}