import Course from '../models/courseModel.js';
import User from '../models/userModel.js';

export const createCourse = async (req, res) => {
  const { courseName, courseCode, semester, faculty, department } = req.body;
  
  try {
    // Check if course already exists
    const existingCourse = await Course.findOne({ where: { courseCode } });
    if (existingCourse) {
      return res.status(400).json({ 
        success: false,
        message: 'Course with this code already exists' 
      });
    }

    const newCourse = await Course.create({
      courseName,
      courseCode,
      semester,
      faculty,
      department
    });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse
    });

  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: ['id', 'courseName', 'courseCode', 'semester', 'faculty', 'department', 'lecturerId'],
      include: [{
        model: User,
        as: 'lecturer',
        attributes: ['id', 'name'], // Only include necessary fields
        required: false // Make it a left join
      }]
    });

    return res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
};
export const assignLecturerToCourse = async (req, res) => {
  const { courseId, lecturerId } = req.body;

  try {
    // First verify the course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    // Verify the lecturer exists and is actually a lecturer
    const lecturer = await User.findOne({
      where: {
        id: lecturerId,
        role: 'lecturer'
      },
      attributes: ['id', 'name', 'email', 'role'] 
    });

    if (!lecturer) {
      // More detailed error message
      const userExists = await User.findByPk(lecturerId);
      
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'User exists but is not a lecturer',
        userRole: userExists.role
      });
    }

    // Assign lecturer to course
    await course.update({ lecturerId });

    // Get updated course with lecturer details
    const updatedCourse = await Course.findByPk(courseId, {
      include: [{
        model: User,
        as: 'lecturer',
        attributes: ['id', 'name', 'email'],
        required: false
      }]
    });

    return res.status(200).json({
      success: true,
      message: 'Lecturer assigned to course successfully',
      course: updatedCourse
    });

  } catch (error) {
    console.error('Error assigning lecturer to course:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to assign lecturer to course',
      error: error.message
    });
  }
}

export const cancelAssignedLecturer = async (req, res) => {
  const { courseId } = req.body;

  try {
    // Verify the course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    // Check if the course already has no lecturer assigned
    if (!course.lecturerId) {
      return res.status(400).json({
        success: false,
        message: 'No lecturer is currently assigned to this course'
      });
    }

    // Remove lecturer assignment by setting lecturerId to null
    await course.update({ lecturerId: null });

    // Get the updated course
    const updatedCourse = await Course.findByPk(courseId, {
      include: [{
        model: User,
        as: 'lecturer',
        attributes: ['id', 'name'],
        required: false
      }]
    });

    return res.status(200).json({
      success: true,
      message: 'Lecturer assignment cancelled successfully',
      course: updatedCourse
    });

  } catch (error) {
    console.error('Error cancelling lecturer assignment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to cancel lecturer assignment',
      error: error.message
    });
  }
}