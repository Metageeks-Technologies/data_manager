import catchAsyncError from "../middleware/catchAsyncError.js";
import MainData from "../models/MainData.js";
import XLSX from "xlsx";
import fs from "fs";

import writeXlsxFile from "write-excel-file/node";
import { type } from "os";

async function isDriIdExists(dri_id) {
  const existingDocument = await MainData.findOne({ dri_id });
  return !!existingDocument; // Returns true if a document with the given dri_id exists, false otherwise
}

const upload = catchAsyncError(async (req, res,next) => {
  try {
    
    const file = req.file;
    let fileArr=file.originalname.split(".");
    console.log(fileArr);
    
    if(fileArr[fileArr.length-1]==='TXT'){
      console.log("yes txt");
      return uploadText(req, res,next);
    }
    
    // console.log("Converting to json!", req.file);

    const workbook = XLSX.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    const batchSize = 500;
    let batchData = [];
    let insertedCount = 0;
    let temp = 0;
    if (jsonData ) {
      for (const row of jsonData) {

        
        
        if(row.hasOwnProperty('APP No.') && row["Year Of Purchase"]){
          row['DRI-ID'] = row['DRI-ID'].replace(/\s/g, "");
          if (await isDriIdExists(row['DRI-ID'])) {
            console.log(`Skipping duplicate DRI-ID: ${row['DRI-ID']}`);
            continue;
          }
          (row['APP No.'])
         if( (row['APP No.'])) row['APP No.'] = row['APP No.'].toString().replace(/\s/g, "");
         if(typeof row[' Deposit ']==='string'){
          row[' Deposit ']=row[' Deposit '].split(',').join('');
          row[' Deposit ']=Number(row[' Deposit ']);
         }
         if(typeof row[' CSV ']==='string'){
          row[' CSV ']=row[' CSV '].split(',').join('');
          row[' CSV ']=Number(row[' CSV ']);
         } 
         if(typeof row[' GSV ']==='string'){
          row[' GSV ']=row[' GSV '].split(',').join('');
          row[' GSV ']=Number(row[' GSV ']);
         } 

        temp += 1;
        // let x=String(row["Year Of Purchase"]);
        // const yearsCountTillNow = new Date().getFullYear() - Number(x.split("-")[0]);
        // // console.log(yearsCountTillNow,row['DRI-ID']);
        // // console.log("x", x);
        // 1002651
        // const deposit=row[' Deposit '];
        // const afterFeesDeduction99based = Math.round(
        //   deposit  - (deposit  / 99) * yearsCountTillNow 
        // );

        // const afterFeesDeduction33based = Math.round(
        //   deposit  - (deposit  / 33) * yearsCountTillNow 
        // );
        //   console.log(afterFeesDeduction99based)

          
          const documentData = {
            dri_id: row["DRI-ID"],
            place: row["Place"],
            appNumber: row["APP No."],
            company: row["Company"],
            membership_type: row["Membership\nType"] || row["Membership Type"],
            amc: row["AMC"],
            customerName: row["CUSTOMER NAME"],
            GSV: row[' GSV '],
            CSV: row[' CSV '],
            deposit: row[' Deposit '],
            status: row[' Status '],
            currentValue: row["Current Value"],
            remarks: row[" Remarks "],
            // date: date.replaceAll("/", ""),
            date: row["Year Of Purchase"],
            afterFeesDeduction99based:0,
            afterFeesDeduction33based:0
          };
          

          batchData.push(documentData);
  
          if (batchData.length === batchSize) {
            console.log("Inserting batch!");
  
            await MainData.insertMany(batchData);
            insertedCount += batchData.length;
            batchData = [];
          }
        }
      }
      
      // Insert any remaining documents in the batch
      if (batchData.length > 0) {
        await MainData.insertMany(batchData);
        insertedCount += batchData.length;
      }
    }
    

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      insertedCount: insertedCount,
    });

    // Update the documents in the collection
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading the file",
    });
  }
});

const uploadText = catchAsyncError(async (req, res) => {
  try {
    
   
    const file = req.file;
    console.log("upload text Called");
    let str = fs.readFileSync(file.path);
    
    str = str.toString("utf8");
    console.log(typeof str);
    // str = str.replaceAll("\x1BH\n", "").replaceAll("\f", "");
    str = str.split("\x1BH\n").join("").split("\f").join("");

    let arr = str.split(
      "------------------------------------------------------------------------------------------"
    );
    let temp=arr.slice(1,3);
    arr = arr.map((e) => e.trim());
    // console.log(arr[0]);
    // arr = arr.filter((e) => {
    //   return Number.isInteger(parseInt(e.substring(0, 1)));
    // });
    // console.log(arr);
    // arr = arr.map((ele) => ele.replaceAll("\r\n", "\n"));
    arr = arr.map((ele) => ele.split("\r\n").join("\n"));

    arr = arr.map((ele) => ele.split("\n \n").join("\n\n"));
    arr = arr
      .join("\n\n")
      .split("\n\n")
      .map((e) => e.trim());
    arr = arr.filter((e) => {
      return Number.isInteger(parseInt(e.substring(0, 1)));
    });
    // console.log(arr);
    const data = [];
    arr.forEach((s, i) => {
      data[i] = { address: "", index: i };

      let lineArr = s.split("\n").map((e) => e.trim());
      // console.log(lineArr[0])
      let addressArr = [];
      lineArr.forEach((l, lineIndex) => {
        if (lineIndex === 0) {
          const tempArr = l
            .split("  ").join(" ")
            .split("  ").join(" ")
            .split("  ").join(" ")
            .split("  ").join(" ")
            .split("  ").join(" ")
            .split("  ").join(" ")
            .split("  ").join(" ")
            .split(" ");
          // const dri_id = tempArr[1] + " " + tempArr[2] + " " + tempArr[3];
           const dri_id = tempArr[1] + tempArr[2] + tempArr[3];

          data[i].dri_id = dri_id;
          return;
        }

        if (l.includes("PROFESSION")) {
          const temp = l.trim().replace("PROFESSION:", "").trim();
          data[i].profession = temp;
          return;
        }
        if (l.includes("RES :")) {
          const tempArr = l
            .split(" ").join("")
            .split("RES:").join("")
            .split("OFF:");
          data[i].residentialPhone = tempArr[0] || "";
          data[i].officePhone = tempArr[1] || "";

          return;
        }
        addressArr.push(l);
      });
      addressArr.forEach((ele) => {
        const temp = ele.split("                   ");
        if (
          temp.length === 1 &&
          (temp[0].includes("G.S.V") ||
            temp[0].includes("C.S.V") ||
            temp[0].includes("D. AMT") ||
            temp[0].includes("QUATERLY"))
        )
          return;
        if (temp.length === 1) {
          data[i].address += " " + temp[0];
        } else {
          data[i].address += " " + temp[1];
        }
      });
      data[i].address = data[i].address
        .toString()
        .split("  ").join(" ")
        .split("  ").join(" ")
        .split("  ").join(" ")
        .split("  ").join(" ")
        .split(":").join("Pin:");
    });
    // console.log(data.slice(1,3));
    // return;
    data.forEach(async (doc, i) => {
      // console.log("here");.
      try {
        const update = await MainData.findOneAndUpdate(
          { dri_id: doc.dri_id },
          doc
        )
        // ;0604A002419
        // const data=await MainData.findOne({dri_id:doc.dri_id})
        
       
        console.log("Updated", i);
      } catch (e) {
        console.log("Error occurred for", i);
      }
    });
    res.status(200).json({
      success: true,
      message: "File uploaded successfully! Data will be updated shortly",
    });

    // Update the documents in the collection
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading the file",
    });
  }
});

const changeAcceptance=catchAsyncError(async (req,res,next)=>{
  const {id}=req.body;
  console.log(req.body);
  const data=await MainData.findOne({_id:id});
  console.log(data);

  if(!data){
    return next(new ErrorHandler("Data not found",404))
  }
  if(data.acceptance==="accepted"){
    data.acceptance="deleted"
  }else data.acceptance="accepted"
  await data.save();
  res.status(200).json({
    success: true,
    message: "Data deleted Successfully",
  });

})

const exportFile = catchAsyncError(async (req, res, next) => {
  console.log("called")
  const {
    status,
    place,
    date,
    customerName,
    dri_id,
    appNumber,
    amc="",
    acceptance,
    company,
    editStatus,
    membership_type
  } = req.query;
  console.log(req.query);
  const queryObject = {};
  if (appNumber) {
    queryObject.appNumber = appNumber;
  }
  if (dri_id) {
    queryObject.dri_id = dri_id;

  }
  if (status && status !== "All") {
    // queryObject.status = status;
    queryObject.status = { $regex: status, $options: "i" };
  }
  if (place && place !== "All") {
    // queryObject.place = place;
    queryObject.place = { $regex: place, $options: "i" };
  }
  if(company && company !=='All'){
    queryObject.company=company;
  }
  if(membership_type && membership_type !=="All"){
    queryObject.membership_type={ $regex: membership_type, $options: "i" };;
  }
  if (date && date !=='All') {
    // queryObject.date = { $regex: date + "-", $options: "i" };
    queryObject.date = date;
  }
  if (amc && amc!=='All') {
    queryObject.amc = { $regex: amc, $options: "i" };
    
  }
  if (customerName) {
    queryObject.customerName = { $regex: customerName, $options: "i" };
  }
  if(acceptance){
    queryObject.acceptance=acceptance;
  }
  if(editStatus && editStatus!="All"){
    if(editStatus==="!unchanged"){
      queryObject.editStatus={ $ne: "unchanged" }
    }
    else queryObject.editStatus=editStatus
  }
  
  let result = await MainData.find(queryObject);
  if(acceptance){
    if(acceptance==="accepted") result=result.filter(obj=>obj.acceptance==="accepted")
      else result=result.filter(obj=>obj.acceptance==="deleted");
      // console.log(result);
  }
    const fileData = [[
      {fontWeight:"bold", value: "S No." },
      {fontWeight:"bold", value: "DRI-ID" },
      {fontWeight:"bold", value: "Place" },
      {fontWeight:"bold", value: "APP No." },
      {fontWeight:"bold", value: "Company" },
      {fontWeight:"bold", value: "Membership Type" },
      // {fontWeight:"bold", value: "Date of Purchase" },
      // {fontWeight:"bold", value: "PP D" },
      {fontWeight:"bold", value: "Year of purchase" },
      {fontWeight:"bold", value: "AMC" },
      {fontWeight:"bold", value: "CUSTOMER NAME" },
      // {fontWeight:"bold", value: " GSV " },
      {fontWeight:"bold", value: " CSV " },
      {fontWeight:"bold", value: " Deposit " },
      {fontWeight:"bold", value: "Status" },
      {fontWeight:"bold", value: "Outstanding" },
      {fontWeight:"bold", value: "Year Till Now" },
      {fontWeight:"bold", value: "After Deducting License Fees" },
      {fontWeight:"bold", value: "LAST COMMUNICATION" },
      {fontWeight:"bold", value: "REMARKS" },
    ]];
    result.forEach((doc,i)=>{

      const {dri_id,
        place="",
        appNumber="",
        company="",
        membership_type="",
        amc="",
        customerName="",
        GSV="",
        CSV="",
        deposit="",
        status="",
        lastCommunication="",
        remarks="",
        date} = doc;
        if(!dri_id)return;
        const dateArr = date.split("-")
        const yearsTillNow =new Date().getFullYear()-dateArr[0]
        const afterDeductingFee = deposit-(deposit/99)*yearsTillNow
        fileData.push([
          { value: i+1},
          { value:dri_id },
          { value:place },
          { value:appNumber },
          { value:company },
          { value:membership_type },
          { value:date},
         
          { value:amc },
          { value:customerName },
          // { value:GSV },
          { value:CSV },
          { value:deposit },
          { value:status },
          { value:GSV-deposit },
          { value: yearsTillNow },
          { value: afterDeductingFee},
          { value: lastCommunication},
          { value:remarks },
        ])
    })

    const fileName = "Export" +new Date().getTime() + ".xlsx"
   
   const buffer = await writeXlsxFile(fileData, { buffer: true })
   
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(buffer);
});

const getData = catchAsyncError(async (req, res, next) => {
  const {
    status,
    place,
    date,
    customerName,
    editStatus,
    dri_id,
    appNumber,
    amc,
    acceptance,
    company,
    membership_type,
    page,
  } = req.query;
  // console.log(req.query);
  const queryObject = {};
  if (appNumber) {
    queryObject.appNumber = appNumber;
  }
  if (dri_id) {
    
    
    const Pure_dri_id=dri_id.split(" ").join("");
    // console.log(dri_id);
    queryObject.dri_id = Pure_dri_id;

  }
  if (status && status !== "All") {
    // queryObject.status = status;
    queryObject.status = { $regex: status, $options: "i" };
  }
  if (place && place !== "All") {
    // queryObject.place = place;
    queryObject.place = { $regex: place, $options: "i" };
  }
  if(company && company !=='All'){
    queryObject.company=company;
  }
  if(membership_type && membership_type !=="All"){
    queryObject.membership_type={ $regex: membership_type, $options: "i" };;
  }
  if (date && date!=='All') {
    // queryObject.date = { $regex: date + "-", $options: "i" };
    queryObject.date = date;
  }
  if (amc && amc!=='All') {
    queryObject.amc = { $regex: amc, $options: "i" };
    
  }
  if (customerName) {
    queryObject.customerName = { $regex: customerName, $options: "i" };
  }
  if(acceptance){
    queryObject.acceptance=acceptance;
  }
  if(editStatus && editStatus !='All'){
    console.log(editStatus);
    if(editStatus==="!unchanged" || editStatus=== "all"){
      queryObject.editStatus={ $ne: "unchanged" }
    }
    else if(editStatus==="var" || editStatus==="Both"){
      queryObject.editStatus={ $in: ['rejected','approved'] }
    }
    else queryObject.editStatus=editStatus
  }
  console.log(queryObject,page);
  const p=Number(page) ||1;
  const limit =8;
  const skip=(p-1)*limit;

  let result = await MainData.find(queryObject).skip(skip).limit(limit);
  const totalData= await MainData.countDocuments(queryObject);
  const numOfPages=Math.ceil(totalData/limit);
  console.log(totalData);
 
  res.status(200).json({
    success: true,
    numOfPages,
    totalData,
    result,
  });
});
const getSingleData = catchAsyncError(async (req, res, next) => {
  console.log("single data");
  const {id}=req.params;
 
  const data = await MainData.findOne({dri_id:id});
  
 
  res.status(200).json({
    success: true,
    data
  });
});



export { upload,getSingleData, getData, uploadText,exportFile,changeAcceptance };
