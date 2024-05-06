import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import MainData from "../models/MainData.js";

// executive
const editData = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let data = await MainData.findOne({ _id: id });
  if (!data) {
    return next(new ErrorHandler("Data not found", 404));
  }
  if (data.acceptance === "deleted") {
    return next(
      new ErrorHandler("This Data is deleted, You can not Edit it", 404)
    );
  }
  data.dataToUpdate = req.body;
  data.editStatus = "pending";
  await data.save();

  res.status(200).json({
    success: true,
    data,
  });
});
// const editData=catchAsyncError(async(req,res,next)=>{
//   const {id}=req.params;

//   let data=await UpdateData.findOne({dataId:id});
//   if(req.body.status && req.body.status==="deleted"){
//     let dataToUpdate={}
//     data=await UpdateData.create({dataId:id,dataToUpdate,status:"deleted"});
//   }
//   else{
//     const mData= await MainData.findOne({_id:id});
//     console.log(mData);
//       mData.editStatus="pending";
//       await mData.save();
//     if(!data){

//       data=await UpdateData.create({dataId:id,dataToUpdate:req.body,status:"pending"});
//     }
//     else{

//       data.dataToUpdate={...data.dataToUpdate,...req.body};
//       data.status="pending"
//      await data.save();
//     }
//   }

//   res.status(200).json({
//       success:true,
//       data,

//   })
// })
//   verifier
const allEditedData = catchAsyncError(async (req, res, next) => {
  const { status, page } = req.query;
  const queryObject = {};
  if (status) {
    queryObject.status = status;
  }
  const p = Number(page) || 1;
  const limit = 8;
  const skip = (p - 1) * limit;
  console.log(queryObject);

  const data = await UpdateData.find();
  // .skip(skip).limit(limit);;

  res.status(200).json({
    success: true,
    data,
  });
});
const rejectEdit = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const data = await MainData.findOne({ _id: id });

  if (!data) {
    return next(new ErrorHandler("Data not found", 404));
  }
  data.editStatus = "rejected";

  await data.save();

  res.status(200).json({
    success: true,
    data,
  });
});
const makeEditable = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const data = await MainData.findOne({ _id: id });

  if (!data) {
    return next(new ErrorHandler("Data not found", 404));
  }
  data.editStatus = "unchanged";

  await data.save();

  res.status(200).json({
    success: true,
    data,
  });
});
const makeEditableBulk = catchAsyncError(async (req, res, next) => {
  const { ids } = req.body;

  const dataItems = await MainData.find({ _id: { $in: ids } });

  if (!dataItems.length) {
    return next(new ErrorHandler("Data not found", 404));
  }

  const updatePromises = dataItems.map((data) => {
    data.editStatus = "unchanged";
    return data.save();
  });

  await Promise.all(updatePromises);

  res.status(200).json({
    success: true,
    message: "Data updated Successfully",
  });
});
const approveEdit = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const data = await MainData.findOne({ _id: id });

  if (!data) {
    return next(new ErrorHandler("Data not found", 404));
  }
  if (!data.dataToUpdate) {
    return next(new ErrorHandler("Nothing to Update", 204));
  }
  const dataToUpdate = data.dataToUpdate;
  dataToUpdate.editStatus = "approved";

  const updatedData = await MainData.findOneAndUpdate(
    { _id: id },
    dataToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    updatedData,
  });
});

export {
  editData,
  makeEditable,
  allEditedData,
  rejectEdit,
  approveEdit,
  makeEditableBulk,
};
