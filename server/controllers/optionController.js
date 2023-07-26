import Option from '../models/Option.js'
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";



const addOption =catchAsyncError(async (req,res,next)=>{

    const {place:_place,status:_status,membership_type:_membership_type} =req.body;
   
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





export {addOption,getOption};