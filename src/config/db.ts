import mongoose from 'mongoose';
import Logger from '../logger/logger';
require('dotenv').config({path:'./.env'});


const db_url="mongodb+srv://Shape:ey44fAYRmzt0ixDL@cluster0.p0i3gdw.mongodb.net/test"
//console.log(db_url)
export const connectDB= ()=> {
  mongoose.set('strictQuery', false);
     mongoose.connect(
        db_url,
        () => {
          Logger.warn("mongdb is connected");
        }
      );
      
}
