import express from 'express';
import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';

import { addOption,getOption } from '../controllers/optionController.js';


const router=express.Router();

router.route('/addOption').post(addOption);
router.route('/getOption').get(addOption);




export default router; 
