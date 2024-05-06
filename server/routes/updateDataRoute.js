import express from "express";
import {
  editData,
  allEditedData,
  rejectEdit,
  approveEdit,
  makeEditable,
  makeEditableBulk,
} from "../controllers/updateDataControllers.js";
// import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route("/:id").post(editData).patch(rejectEdit);
router.route("/allData").get(allEditedData);
router.route("/update/:id").patch(approveEdit);
router.route("/editable/many").patch(makeEditableBulk);
router.route("/editable/:id").patch(makeEditable);

export default router;
