import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import crypto from 'crypto';
import autoIncrement from 'mongoose-auto-increment';
autoIncrement.initialize(mongoose.connection);
import { model, Schema, Model, Document } from 'mongoose';
//import Logger from "../logger/logger";
var encrypt = require('mongoose-encryption');
require('dotenv').config({path:'../.env'});

//mongoose encryption
const encryptionKey = process.env.ENCRYPTION_KEY;
const signingKey = process.env.SIGNING_KEY;


//declare user type
export interface IUser extends Document {
    getResetPasswordToken(): string;
    getSignedToken(): string;
    resetPasswordToken: string | undefined;
    resetPasswordExpire: string | undefined;
    matchPassword(password: string): boolean | PromiseLike<boolean>;
    id:Number;
    firstName: string,
    lastName: string,
    password: string;
    email: string;
    Dof: Date;
   
}
// define user schema
const UserSchema: Schema = new Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
        autoIncrement: true
    },
    firstName: {
        type: String,
        lowercase: true,
        unique: false,
        required: [true, "Can't be blank"],
        index: true
    },
    lastName: {
        type: String,
        lowercase: true,
        unique: false,
        required: [true, "Can't be blank"],
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, "Please use minimum of 8 characters"],
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique: true,
       

    },
    resetPasswordToken: String,
    resetPasswordExpire: String,

    active: { type: Boolean, default: true }
});

UserSchema.method("toJSON", function() {
    const { __v, ...object } = this.toObject();
    object.id = this._id;
    return object;
});
//excludeFromEncryption: ['password',"id"] 
UserSchema.pre<IUser>("save", async function (next: any) {
    if (!this.isModified('password')) {
        return next();
    }
    UserSchema.plugin(encrypt, { encryptionKey: encryptionKey, signingKey: signingKey});
    this.password = bycrypt.hashSync(this.password, 10);
    next();
});

UserSchema.methods.matchPassword = async function (password: string) {
    return await bycrypt.compare(password, this.password)
}


UserSchema.methods.getSignedToken = function (password: string) {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.
        createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken

}

export const User: Model<IUser> = model<IUser>("User", UserSchema);