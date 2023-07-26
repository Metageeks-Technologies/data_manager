import Option from '../models/Option.js'
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";



const addOption =catchAsyncError(async (req,res,next)=>{

    const {place:_place,status:_status,membership_type:_membership_type} =req.body;
    console.log(req.body);
   
    if(!req.body){
        return next(new ErrorHandler("please provide some values",400))
    }
    const model=await Option.find();
    // console.log(model);
    let data;
    
    if(model.length===0){
       data = await Option.create(req.body);
    }else{
        data=model[0];
    //    console.log(data);
        if(_place){
            data.place.push(_place);
            console.log(data.place,"places")
        }
        if(_status){
            data.status.push(_status);
        }
        if(_membership_type){
            data.membership_type.push(_membership_type);
        }
       await  data.save();
       
    }
    res.status(201).json({
        success:true,
        data
    })
    
})


const getOption =catchAsyncError(async (req,res,next)=>{


    const model=await Option.find();
    
    let data={}
    if(model.length){
        data=model[0];
    }
    console.log(data);
    
    res.status(201).json({
        success:true,
        data
    })
    
})


const deleteOption =catchAsyncError(async (req,res,next)=>{

    // const {place:_place,status:_status,membership_type:_membership_type} =req.body;
    // console.log(req.body,"body");
    const {value}=req.params
    console.log(value);
   
    if(!value){
        return next(new ErrorHandler("please provide some values",400))
    }
    
    const model=await Option.find();
    
    let data;
    
    if(model.length===0){
        return next(new ErrorHandler("Data Not Found",404))
    }else{
        data=model[0];
    //    console.log(data);
        if(data.place.includes(value)){
            data.place=data.place.filter(item=>item !==value);
        }
        else if(data.status.includes(value)){
            data.status=data.status.filter(item=>item !==value);
        }
        else if(data.membership_type.includes(value)){
            data.membership_type=data.membership_type.filter(item=>item !==value);
        }
        else return next(new ErrorHandler("Provided value doesn't match with existing options",400))
        
        
       await  data.save();
       
    }
    res.status(200).json({
        success:true,
        data
    })
    
})






export {addOption,getOption,deleteOption};