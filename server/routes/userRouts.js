import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  updateUserRole,
  deleteUser,
  getAllUser,
  getCurrentUser,
  ChangePassword
} from "../controllers/userController.js";
import { isAdmin, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();
// auth
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/changePassword").patch(ChangePassword);

// admin routes
router.route("/admin/getAllUser").get(isAuthenticatedUser,isAdmin("admin"),getAllUser);
router.route("/admin/addUser").post(isAuthenticatedUser,isAdmin("admin"),signupUser);
router.route("/admin/updateRole").post(isAuthenticatedUser,isAdmin("admin"),updateUserRole);
router.route("/admin/:id").delete(isAuthenticatedUser,isAdmin("admin"),deleteUser);

router.route("/getCurrUser").get(isAuthenticatedUser, getCurrentUser);

export default router;
