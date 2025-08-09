import express from 'express';
import { createLecturer } from '../controllers/adminLecturerController.js';


const adminLecturerRouter = express.Router();

adminLecturerRouter.post('/create-lecturer', createLecturer)

export default adminLecturerRouter;