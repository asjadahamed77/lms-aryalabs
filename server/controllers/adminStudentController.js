import User from "../models/userModel.js";


export const createStudent = async (req, res) => {
    const {name,regNo ,batch ,email, password, faculty, department} = req.body;
    if( !name || !regNo || !email || !password || !faculty || !department) {
        return res.status(400).json({message: 'All fields are required'});
    }
    // Check if lecturer already exists
    const existingStudent = await User.findOne({ where: { email, role: 'student' } });
    if (existingStudent) {
        return res.status(400).json({ success: false, message: 'Student already exists' });
    }
    
    try {
        const newStudent = await User.create({
            name,
            email,
            password, 
            regNo,
            createdAt: new Date(),
            batch,
            role: 'student',
            faculty,
            department,
            isActive: true
        });
     
        
        return res.status(201).json({ success:true ,message: 'Student created successfully', student: newStudent});
        
    } catch (error) {
        res.json({ success:false, message: error.message });
        console.log(`Error creating student: ${error.message}`);       
    }
}

export const getAllStudents = async (req, res) => {
    try {
     
      const students = await User.findAll({ where: { role: "student" } });
  
      return res.status(200).json({ success: true, students });
    } catch (error) {
      console.log(`Error fetching students: ${error.message}`);
      return res.status(500).json({ success: false, message: error.message });
    }
  };