import axios from "axios"
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')





export const createStudent = async (formData) => {
    try {
        const {data} = await axios.post('/admin/student/create-student', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (data.success) {
            toast.success("Student created successfully");
            return data.student;
        } else {
            toast.error(data.message || "Failed to create student");
            return null;
        }
    } catch (error) {
        toast.error("Error creating student");
        console.error("Error creating student:", error);
    }
} 

export const getAllStudents = async()=>{
    try {
        const {data} = await axios.get('/admin/student/get-all',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return data;

    } catch (error) {
        toast.error("Error in fetching students")
        console.log(error.message);
        
    }
}