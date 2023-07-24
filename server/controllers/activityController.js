import Activity from "../models/Activity.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";


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

    const activitiesByExe = await Activity.find({userRole:"executive"}).sort('-createdAt').limit(8);
    const activitiesByVar = await Activity.find({userRole:"verifier"}).sort('-createdAt').limit(8);

  
    res.status(200).json({
      success: true,
      activities:{activitiesByVar,activitiesByExe}
    });
  });
  


  

export {makeActivity,getAllActivity};