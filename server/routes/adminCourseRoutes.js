import express from 'express';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddleware.js';
import { assignLecturerToCourse, cancelAssignedLecturer, createCourse,getAllCourses } from '../controllers/adminCourseController.js';


const adminCourseRouter = express.Router();

adminCourseRouter.post('/create-course',verifyToken, authorizeRoles('admin') ,createCourse)
adminCourseRouter.get('/get-all',verifyToken, authorizeRoles('admin') ,getAllCourses)
adminCourseRouter.post('/assign',verifyToken, authorizeRoles('admin') ,assignLecturerToCourse)
adminCourseRouter.post('/assign-cancel',verifyToken, authorizeRoles('admin') ,cancelAssignedLecturer)



export default adminCourseRouter;