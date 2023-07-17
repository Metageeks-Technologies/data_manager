import Otp from "../models/OTP.js";
import User from '../models/User.js'
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import nodemailer from "nodemailer";


// send Email

const sendEmail =catchAsyncError(async (req,res,next)=>{
    const {email}=req.body;
    if(!email){
        return next(new ErrorHandler("please provide Email",400))
    }
    const user= await User.findOne({email});
    if(!user){
        return next(new ErrorHandler("No User is Registered with given Email ",400))   
    }
    if(user.role!=="admin"){
        return next(new ErrorHandler("User role is not Admin",400))   
    }
    // save otp
    const otpCode=Math.floor((Math.random()*10000 +1)).toString();
    const otpData={
        email:email,
        otp:otpCode,
        expireIn: new Date().getTime()+300*1000
    };
    const result=await Otp.create(otpData);

    mailer(email,otpCode,req,res,next);
    
})
// mailer
const mailer = async (email, otp, req, res, next) => {
    try {
      const transporter = nodemailer.createTransport({
        // host: 'mail.sitengine.in',
        // port:465,
        // auth: {
        //   user: 'shiva@sitengine.in',
        //   pass: 'EV~[,^MBAdpK',
        // },
          host: 'smtp.mailtrap.io',
          port: 587,
          auth: {
              user: 'api',
              pass: 'bb59de3059e4b2210b5a9586f3e78680'
        }
      });
  
      const mailOptions = {
        from: 'api',
        to: 'sg2304366@gmail.com',
        subject: 'This is your OTP for Resetting the Password',
        text: otp,
      };
  
     const info= await transporter.sendMail(mailOptions);
      
      console.log(info);
      
      res.status(201).json({
        success: true,
        message: 'OTP is sent to your email',
      });
    } catch (error) { 
      console.log(error('Email sending failed:', error));
      next(new ErrorHandler('Failed to send the OTP via email', 500));
    }
  };
  

export {sendEmail};