import express from 'express';
import { createLecturer, getAllLecturers } from '../controllers/adminLecturerController.js';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/create-lecturer',verifyToken, authorizeRoles('admin') ,createLecturer)
router.get('/get-all',verifyToken, authorizeRoles('admin') ,getAllLecturers)



export default router;