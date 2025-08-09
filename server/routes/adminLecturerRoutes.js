import express from 'express';
import { createLecturer } from '../controllers/adminLecturerController.js';


const router = express.Router();

router.post('/create-lecturer', createLecturer)



export default router;