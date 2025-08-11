import Course from "../models/courseModel.js";
import User from "../models/userModel.js";


export const createLecturer = async (req, res) => {
    const {name, email, password, faculty, department} = req.body;
    if( !name || !email || !password || !faculty || !department) {
        return res.status(400).json({message: 'All fields are required'});
    }
    // Check if lecturer already exists
    const existingLecturer = await User.findOne({ where: { email, role: 'lecturer' } });
    if (existingLecturer) {
        return res.status(400).json({ success: false, message: 'Lecturer already exists' });
    }
    
    try {
        const newLecturer = await User.create({
            name,
            email,
            password, 
            role: 'lecturer',
            faculty,
            department,
            isActive: true
        });
     
        
        return res.status(201).json({ success:true ,message: 'Lecturer created successfully', lecturer: newLecturer});
        
    } catch (error) {
        res.json({ success:false, message: error.message });
        console.log(`Error creating lecturer: ${error.message}`);       
    }
}

export const getAllLecturers = async (req, res) => {
    try {
      const lecturers = await User.findAll({
        where: { role: "lecturer" },
        include: [{
          model: Course,
          as: 'courses',  
          attributes: ['id', 'courseName', 'courseCode'], 
          required: false 
        }],
        attributes: ['id', 'name', 'email', 'faculty', 'department'] 
      });
  
      // Transform the data to a more client-friendly format if needed
      const formattedLecturers = lecturers.map(lecturer => ({
        id: lecturer.id,
        name: lecturer.name,
        email: lecturer.email,
        faculty: lecturer.faculty,
        department: lecturer.department,
        courses: lecturer.courses.map(course => ({
          id: course.id,
          name: course.courseName,
          code: course.courseCode
        }))
      }));
  
      return res.status(200).json({ 
        success: true, 
        lecturers: formattedLecturers 
      });
    } catch (error) {
      console.error(`Error fetching lecturers: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch lecturers',
        error: error.message 
      });
    }
  };

  