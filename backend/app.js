import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express({
    origin: process.env.CORS_ORIGIN
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

import { userRouter } from "./routers/user.routes.js";
import { transcriptRouter } from "./routers/transcript.routes.js";
import { analyticsRouter } from "./routers/analytics.routes.js";
import thumbnailRouter from "./routers/thumbnail.routes.js";


app.use("/api/v1/auth", userRouter);
app.use("/api/v1/transcript", transcriptRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/thumbnail", thumbnailRouter);


export {app};