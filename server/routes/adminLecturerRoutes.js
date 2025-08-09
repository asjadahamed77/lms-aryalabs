import express from 'express';
import { createLecturer } from '../controllers/adminLecturerController.js';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/create-lecturer',verifyToken, authorizeRoles('admin') ,createLecturer)



export default router;