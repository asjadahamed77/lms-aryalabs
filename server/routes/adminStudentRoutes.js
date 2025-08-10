import express from 'express';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddleware.js';
import { createStudent, getAllStudents } from '../controllers/adminStudentController.js';


const adminStudentRouter = express.Router();

adminStudentRouter.post('/create-student',verifyToken, authorizeRoles('admin') ,createStudent)
adminStudentRouter.get('/get-all',verifyToken, authorizeRoles('admin') ,getAllStudents)



export default adminStudentRouter;