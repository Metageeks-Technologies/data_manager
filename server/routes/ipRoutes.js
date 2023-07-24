import express from 'express';
import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';
import { addIP, deleteIP, getAllIP } from '../controllers/ipController.js';


const router=express.Router();

router.route('/addIP').post(addIP);
router.route('/getAllIP').get(getAllIP);
router.route('/deleteIP/:id').delete(deleteIP);


export default router; 
