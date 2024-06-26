import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const isAuthenticatedUser =catchAsyncError(async(req,res,next)=>{
    
    const {token} =req.cookies;
    
   
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user =await User.findOne({_id:decodedData.id})
    
    next();
})

const isAdmin = (...roles)=>{
    return (req,res,next)=>{
        console.log(req.user)
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Only admin is allowed to access this resource`,403))
           
        }
        next();
       
}
}

export  {isAuthenticatedUser,isAdmin};