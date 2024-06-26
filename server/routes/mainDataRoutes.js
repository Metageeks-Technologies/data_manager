import express from "express";
import multer from "multer";
import {
  upload as uploadMainData,
  getData,
  // getDataList,
  uploadText,
  getSingleData,
  changeAcceptance,
  exportFile,
  backupData,
  changeAcceptanceBulk,
} from "../controllers/mainDataControllers.js";
import MainData from "../models/MainData.js";

import SecondaryData from "../models/SecondaryData.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

// upload file middleware || multer
// storing the excel file in uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// router
router.get("/main", async (req, res) => {
  res.send(await MainData.find({}));
});
// router.get("/edit",async(req,res)=>{
//   res.send(await UpdateData.find({}))
// })
// router.get("/edit/reset",async(req,res)=>{
//   res.send(await UpdateData.deleteMany({}))
// })
// router.get("/secondary",async(req,res)=>{
//   const result = await SecondaryData.find({})
//   result.forEach(async (doc,i)=>{
//     const update = await MainData.findOneAndUpdate({dri_id:doc.dri_id},{address:doc.address,
//       officePhone:doc.officePhone,
//       profession:doc.profession,
//       residentialPhone:doc.residentialPhone,

//     })
//     console.log("Updated",i);
//   })

//   // res.send({count:result.length})
// })
// router.get("/secondary/reset",async(req,res)=>{
//   const result = await  SecondaryData.deleteMany({})

//   res.send(result)
// })
// router.get("/reset",async(req,res)=>{

// await MainData.deleteMany({}).then(console.log);
// await UpdateData.deleteMany({}).then(console.log);
// res.send("success")
// })
// router.get("/update",async(req,res)=>{
//   res.send(await UpdateData.find({}))
// })
// const test=(req,res,next)=>{
//   console.log("upload route");
//   next();
// }
router.route("/upload").post(upload.single("file"), uploadMainData);
router.route("/getData").get(getData);
router.route("/deleteData").patch(changeAcceptance);
router.route("/deleteMany").patch(changeAcceptanceBulk);
router.route("/export").get(exportFile);
router.route("/backup").post(backupData);
router.route("/getSingleData/:id").get(getSingleData);

export default router;
