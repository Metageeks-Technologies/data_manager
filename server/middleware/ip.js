
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import IP from "../models/IP.js";


const checkAllowedIP=catchAsyncError(
    async (req, res, next) => {
        const clientIP = req.ip; 
        console.log(clientIP);
        
            
       const foundIP =await IP.findOne({ip:clientIP});
        if (foundIP) {
          
          next();
        } else {
         
          return next(new ErrorHandler(`${clientIP} This ip is not whitelisted`,403));
        }
      }
    )
export default checkAllowedIP