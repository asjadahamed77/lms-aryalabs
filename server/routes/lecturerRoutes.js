import express from "express";
import { getLecturerCourses } from "../controllers/lecturerController.js";
import { authorizeRoles, verifyToken } from "../middlewares/authMiddleware.js";

const lecturerRouter = express.Router();

lecturerRouter.get('/courses', verifyToken, authorizeRoles('lecturer'), getLecturerCourses);

export default lecturerRouter;