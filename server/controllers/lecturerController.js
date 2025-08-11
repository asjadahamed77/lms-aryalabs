import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const getLecturerCourses = async (req, res) => {
    try {
        // Get the lecturer ID from the authenticated user
        const lecturerId = req.user.id; // Assuming you're using authentication middleware
        
        // Verify the user is actually a lecturer
        const lecturer = await User.findOne({
            where: {
                id: lecturerId,
                role: 'lecturer'
            }
        });

        if (!lecturer) {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Only lecturers can view assigned courses.' 
            });
        }

        // Get all courses assigned to this lecturer
        const courses = await Course.findAll({
            where: { lecturerId },
            attributes: ['id', 'courseName', 'courseCode', 'semester', 'faculty', 'department'],
            include: [{
                model: User,
                as: 'lecturer',
                attributes: ['id', 'name']
            }],
            order: [['semester', 'ASC']] // Optional: order by semester
        });

        return res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {
        console.log(`❌ Error in getLecturerCourses: ${error.message}`);
        return res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message 
        });
    }
}