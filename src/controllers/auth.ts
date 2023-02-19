import { Response, Request } from 'express';
import {IUser,User} from '../models/user'; 
import {ErrorResponse} from '../middlewares/errorResponse';
import {sendEmail} from '../utils/emailSender'
import crypto from 'crypto'
import  Logger  from "../logger/logger";
import { loggers } from 'winston';
import logger from '../logger/logger';


export const register= async(req:Request,res:Response,next:any)=>{
    const {id,firstName,lastName,email,password}=req.body;
    try {
        const user:IUser= await User.create({
            id,
            firstName,
            lastName,
            email,
            password
        }).then(
           ()=>res.status(201).json({
                status:201,
                message:"user created successfully",

            } 
            )
       ).catch(
            err=>next(err)
        )        
    } catch (error:any) {
        // next(error);
        Logger.error(error)
    }
};


export const login = async(req:Request,res:Response,next:any)=>{
    const {email,password}=req.body;
    if (!email || !password){
        return next(new ErrorResponse("Please provide a valid email and Password",400))
    };
    try {
        const user:IUser | null = await User.findOne({email:email}).select("+password");
        
        console.log(user);

        if (!user){
            Logger.error("User not found");
            return next(new ErrorResponse("Invalid Credentials",401))
        }
  
        const isMatch:boolean= await user.matchPassword(password);
        Logger.warn(isMatch);
        
        
        if (!isMatch){
            return next(new ErrorResponse("Invalid Credentials  mouch mawjoud",401))
        }else{
            return next(
                res.status(201).json({
                        status:200,
                        message:"user successfully logged in",
                        token:user.getSignedToken()
                
        }));
        }
    } catch (error:any) {
        return next(new ErrorResponse(error.message,500))
    }};

    export const forgotPassword=async(req:Request,res:Response,next:any)=>{
        const {email}=req.body;
        if (!email){
            return next(new ErrorResponse("Please provide your email adress",400))
        };
        try {
        const user:IUser | null = await User.findOne({email:email});
        logger.error(user);

            if (!user){
                return next(new ErrorResponse("Email could not be sent",404));
            }
            const resetToken=user.getResetPasswordToken();
            await user.save();
    
            const resetUrl = `http://localhost:5050/passwordreset/${resetToken}`;
            const message = `
            <h1> You have requested a password reset </h1>
            <p> Please go to this link to reset your password </p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a> 
            `
            try {
               sendEmail({
                    to: user.email,
                    text: message,
                    subject: message
                }); 
               res.status(200)
               .json({
                   success: true,
                   data:"Email Sent",
                   messsage: message

               })
            } catch (error) {
                user.resetPasswordToken=undefined;
                user.resetPasswordExpire=undefined;
                await user.save();
    
                return next(new ErrorResponse("Email could not be sent", 500))
    
            }
        } catch (error) {
            next(error);
        }
    };
    export const resetPassword=async(req:Request,res:Response,next:any)=>{
        const {password} = req.body
        Logger.debug(password)
        const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.resetToken)
        .digest('hex');
        try {
            const user: IUser | null   = await User.findOne({
                resetPasswordToken,
                resetPasswordExpire: {$gt: Date.now(),
                }
            })
    
            if (!user){
                return next(new ErrorResponse("Invalid Reset Token", 400));
            }
            user.password = password;
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire= undefined; 
            await user.save();
            res.status(201)
            .json({
                success: true,
                data:"Password Reset successful"
            });
    
        } catch (error) {
            next(error);
        }
    };

 
   
    