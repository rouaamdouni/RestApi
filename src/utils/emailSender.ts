import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({path:'../.env'});

interface Options {
    to: string,
    subject: string,
    text: string,

}


export const sendEmail = async (options: Options) => {

    const transporter = nodemailer.createTransport({
   
        host:process.env.SMTP_HOST,
        port:Number(process.env.SMTP_PORT),
        auth: {
            user:process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        },   
    
  });
     const mailOptions = {
     from: process.env.SMTP_USERNAME,
     to: options.to,
     subject: options.subject,
     html: options.text

                }
     transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
    await transporter.sendMail(mailOptions);
}


