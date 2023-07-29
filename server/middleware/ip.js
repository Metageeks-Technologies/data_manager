
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import IP from "../models/IP.js";


const checkAllowedIP=catchAsyncError(
    async (req, res, next) => {
        // const clientIP = req.header('X-Forwarded-For');
        const clientIP = req.ip;

        console.log("current ip",clientIP);
        const allowedIp=await IP.find();
        const isAllowed = allowedIp.some((allowed) => allowed.ip === clientIP);
      
        
            
      //  const foundIP =await IP.findOne({ip:clientIP});
        if (isAllowed) {
          
          next();
        } else {
         
          return next(new ErrorHandler(`${clientIP} This ip is not whitelisted`,403));
        }
      }
    )
export default checkAllowedIP