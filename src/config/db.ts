import mongoose from 'mongoose';
import Logger from '../logger/logger';
require('dotenv').config({path:'./.env'});



const db_url=String(process.env.DATABASE_URL);

export const connectDB= ()=> {
 mongoose.set('strictQuery', false);
     mongoose.connect(
        db_url,
        () => {
          Logger.warn("mongdb is connected");
        }
      );
      
}
