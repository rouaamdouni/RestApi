import nodemailer from 'nodemailer';

interface Options {
  to: string;
  subject: string;
  text: string;
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
    from: 'your_email_address@example.com',
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};
