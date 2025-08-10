import express from 'express';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddleware.js';
import { createCourse,getAllCourses } from '../controllers/adminCourseController.js';


const adminCourseRouter = express.Router();

adminCourseRouter.post('/create-course',verifyToken, authorizeRoles('admin') ,createCourse)
adminCourseRouter.get('/get-all',verifyToken, authorizeRoles('admin') ,getAllCourses)



export default adminCourseRouter;