import catchAsyncError from "../middleware/catchAsyncError.js";
import UpdateData from "../models/UpdateData.js";
import ErrorHandler from "../utils/errorHandler.js";
import MainData from "../models/MainData.js";


// executive
  const editData=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
   
    let data=await UpdateData.findOne({dataId:id});
    if(req.body.status && req.body.status==="deleted"){
      let dataToUpdate={}
      data=await UpdateData.create({dataId:id,dataToUpdate,status:"deleted"});
    }
    else{
      const mData= await MainData.findOne({_id:id});
      console.log(mData);
        mData.editStatus="pending";
        await mData.save();
      if(!data){
        
        data=await UpdateData.create({dataId:id,dataToUpdate:req.body,status:"pending"});
      }
      else{
       
        data.dataToUpdate={...data.dataToUpdate,...req.body};
        data.status="pending"
       await data.save();
      }  
    }
  
    res.status(200).json({
        success:true,
        data, 
       
    })
  })
//   verifier
  const allEditedData=catchAsyncError(async(req,res,next)=>{

    const {status,page}=req.query;
    const queryObject={};
    if(status){
      queryObject.status=status;
    }
    const p=Number(page) ||1;
    const limit =8;
    const skip=(p-1)*limit;
    console.log(queryObject);

    const data=await UpdateData.find();
    // .skip(skip).limit(limit);;

    res.status(200).json({
        success:true,
        data,
       
    })
  })
  const rejectEdit=catchAsyncError(async(req,res,next)=>{
    console.log("hello");
    
    const {id}=req.params;
    const data=await UpdateData.findOne({dataId:id});

    if(!data){
        return next(new ErrorHandler("Data not found",404))
      } 
    
      const rejectedData=await UpdateData.findOneAndUpdate({dataId:id},{status:"rejected"},{
        new:true,
        runValidators:true
      })
      await MainData.findOneAndUpdate({_id:id},{editStatus:"rejected"},{
        new:true,
        runValidators:true
      })
      
    res.status(200).json({
        success:true,
        rejectedData,
       
    })
  })
  const approveEdit=catchAsyncError(async(req,res,next)=>{
    const {id:editId}=req.params;
   
    const editData= await UpdateData.findOne({dataId:editId});

    if(!editData){
        return next(new ErrorHandler("Data not found",404))
      }
      const data=await MainData.findOne({_id:editId});
    if(!data){
      return next(new ErrorHandler("Data not found",404))
    }else{
      data.editStatus="approved";
      await data.save();
    }
    const updatedData=await MainData.findOneAndUpdate({_id:editId},editData.dataToUpdate,{
      new:true,
      runValidators:true
    })
    editData.status="approved"
    await editData.save();
    res.status(200).json({
        success:true,
        updatedData,
       
    })
  })
  
// delete data after 30 days


  

    export {editData,allEditedData,rejectEdit,approveEdit}