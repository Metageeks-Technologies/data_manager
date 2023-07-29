import IP from "../models/IP.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";


const addIP =catchAsyncError(async (req,res,next)=>{
    const {ip}=req.body;
    // console.log(req.body)
    if(!ip){
        return next(new ErrorHandler("please provide IP",400))
    }
    const ipAlreadyExists= await IP.findOne({ip});
    if(ipAlreadyExists){
        return next(new ErrorHandler("Ip already in exist",400))   
    }
    const newIP=await IP.create(req.body)
    
    res.status(201).json({
        success:true,
        newIP,
        message:"IP Added successfully"
    })
    
})


const deleteIP =catchAsyncError(async(req,res,next)=>{
   
    const {id}=req.params;
    const ip =await IP.findOne({_id:id});

    if(!ip){
        next(new ErrorHandler("IP does not exit",404));
    }
   await IP.deleteOne({_id:id});
    res.status(200).json({
        success:true,
        message:"Ip deleted successfully"
       })
    
})

const getAllIP = catchAsyncError(async (req,res,next) => {

    const ips =await IP.find();
      
    res.status(200).json({
      success:true,
      ips
    })
})


export  {addIP,deleteIP,getAllIP};