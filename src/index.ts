require('dotenv').config({path:'./config.env'});
import  Logger  from "./logger/logger";
import morganMiddleware from "./logger/morganMiddleware";

import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {json} from 'body-parser'
import mongoose from 'mongoose'
import { connectDB } from "./config/db";
import  router  from "./routes/auth";
import crudRouter from "./routes/crud";

// import crudRouter from "./routes/crud";


const app= express();
const PORT= process.env.PORT || 5000;
//import errorHandler from './middleware/error';
app.use(morganMiddleware);

//connect to db
connectDB()

app.use(express.json());
app.use("/auth", router);
app.use("/crud",crudRouter)



//ErrorHandler (Should be last piece of middleware)
//app.use(errorHandler);

const server=app.listen(
    PORT,()=>{
        // console.log(`Server is running on port ${PORT}`)
        Logger.warn(`Server is up and running @ http://localhost:${PORT}`)
    }
)
process.on("unhandledRejection",(error,promise)=>{
    Logger.error(`Logged Error: ${error}`);
    server.close(()=>process.exit(1))

})