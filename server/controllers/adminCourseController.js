import Course from '../models/courseModel.js';

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
      attributes: ['id', 'courseName', 'courseCode', 'semester', 'faculty', 'department']
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