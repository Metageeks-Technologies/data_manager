import Activity from "../models/Activity.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import cron from 'node-cron'



const makeActivity = catchAsyncError(async (req, res, next) => {
    const { userName, userRole, dataId } = req.body;
    if (!userName || !userRole || !dataId) {
      return next(new ErrorHandler("userName or userRole or dataId is missing", 400));
    }
  
    const result = await Activity.create(req.body);
  // console.log(req.io);
    // Access the io object from the request and emit the 'newActivity' event
    // req.io.emit('newActivity', result);
  
    res.status(200).json({
      success: true,
      result
    });
  }); 
  

const getAllActivity = catchAsyncError(async (req, res, next) => {

  
    const {userRole,page}=req.query;
   
   
    
    console.log(req.query);
    const p=Number(page) ||1;
    const limit =8;
    const skip=(p-1)*limit;
    const activities = await Activity.find({userRole}).sort('-createdAt').skip(skip).limit(limit);
    const totalData= await Activity.countDocuments({userRole});
    const numOfPages=Math.ceil(totalData/limit);
    
  
    res.status(200).json({
      success: true,
      totalData,
      numOfPages,
      activities
      

    });
  });
  // deleting data after 7 days
  cron.schedule('0 0 * * *', async () => {
    try {
      // Define the threshold date for deleting old activity data
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 7); // Example: Delete data older than 7 days
      thresholdDate.setHours(0, 0, 0, 0)
      // Delete old activity data using Mongoose query
      await Activity.deleteMany({ createdAt: { $lt: thresholdDate } });
  
      console.log('Old activity data has been deleted.');
    } catch (error) {
      console.error('Error while deleting old activity data:', error);
    }
  });

  

export {makeActivity,getAllActivity};