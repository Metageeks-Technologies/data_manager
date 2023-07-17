import express from 'express';
import { sendEmail } from '../controllers/otpController.js';

// import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';

const router=express.Router();

router.route('/verifyEmail').post(sendEmail);



export default router;   
