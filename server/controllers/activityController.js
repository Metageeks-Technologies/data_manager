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
  


  

export {makeActivity,getAllActivity};