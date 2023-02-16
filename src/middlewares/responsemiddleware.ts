import { Request } from 'express';

export interface User  {
    resetPasswordToken: string|undefined;
    resetPasswordExpire: string|undefined;
    firstName: string,
    lastName: string,
    password:string;
    email:string;
    Dof:Date;

}

// Declaring custom request interface
interface CustomRequest extends Request {
  user?: User,
  code : number,
  message : String,
  result : any
}

export default CustomRequest;