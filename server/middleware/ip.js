
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import IP from "../models/IP.js";


const checkAllowedIP=catchAsyncError(
    async (req, res, next) => {
        // const clientIP = req.header('X-Forwarded-For');
        const clientIP = req.ip;
        const firstThreeOctets = clientIP.slice(0, clientIP.lastIndexOf(".") + 1);
        const regexPattern = new RegExp(`^${firstThreeOctets}(24[0-3]|25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$`);

        console.log("current ip is",clientIP);
        // const allowedIp=await IP.find();
        // const isAllowed = allowedIp.some((allowed) => allowed.ip === clientIP);
      
        
            
        const foundIP = await IP.findOne({ ip: { $regex: regexPattern } });
        
        console.log("found Ip", foundIP);
        if (foundIP || clientIP==="::1") {
          
          next();
        } else {
         
          return next(new ErrorHandler(`${clientIP} This ip is not whitelisted`,403));
        }
      }
    )
export default checkAllowedIP