import User from "../models/userModel.js";


export const createLecturer = async (req, res) => {
    const {name, email, password, faculty, department} = req.body;
    if( !name || !email || !password || !faculty || !department) {
        return res.status(400).json({message: 'All fields are required'});
    }
    console.log('📩 Incoming request to create-lecturer:', req.body);
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
        console.log(`New lecturer created: ${newLecturer.name}`);
        
        return res.status(201).json({message: 'Lecturer created successfully', lecturer: newLecturer});
        
    } catch (error) {
        console.log(`Error creating lecturer: ${error.message}`);       
    }
}