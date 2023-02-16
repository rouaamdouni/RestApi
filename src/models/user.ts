import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { model, Schema, Model, Document } from 'mongoose';
import Logger from "../logger/logger";

//declare user type
export interface IUser extends Document {
    getResetPasswordToken():string;
    getSignedToken():string;
    resetPasswordToken: string|undefined;
    resetPasswordExpire: string|undefined;
    matchPassword(password: string): boolean | PromiseLike<boolean>;
    firstName: string,
    lastName: string,
    password:string;
    email:string;
    Dof:Date;

}
// define user schema
 const UserSchema: Schema = new Schema({
    
        firstName: { 
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "Can't be blank"],
            index: true
        },
        lastName: { 
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "Can't be blank"],
            index: true
        },
    password: {
        type: String,
        required: true,
        select: false,
        minlength:  [8, "Please use minimum of 8 characters"],
        unique:true,
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique:true,
       
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,

    active: { type: Boolean, default: true }
});

UserSchema.pre<IUser>("save", async function (next: any) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = bycrypt.hashSync(this.password, 10);
    this.firstName = bycrypt.hashSync(this.firstName,10);
    this.lastName = bycrypt.hashSync(this.lastName,10);
    this.email = bycrypt.hashSync(this.email,10);
    next();
});

UserSchema.methods.matchPassword= async function (password:string) {
    return await bycrypt.compare(password,this.password)   
}
UserSchema.methods.getSignedToken= function (password:string) {
    return jwt.sign({id:this._id},process.env.JWT_SECRET!,{
        expiresIn:process.env.JWT_EXPIRE
    })   
}
UserSchema.methods.getResetPasswordToken= function () {
    const resetToken= crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken= crypto.
    createHash('sha256')
    .update(resetToken)
    .digest('hex');  
    this.resetPasswordExpire = Date.now() + 10*(60*1000) 
    return resetToken

}

export const User: Model<IUser> = model<IUser>("User", UserSchema);