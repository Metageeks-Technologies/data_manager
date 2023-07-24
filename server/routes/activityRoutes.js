import express from 'express';
import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';
import { makeActivity ,getAllActivity} from '../controllers/activityController.js';

const router=express.Router();

router.route('/makeActivity').post(makeActivity);
router.route('/getAllActivity').get(getAllActivity);


export default router; 
