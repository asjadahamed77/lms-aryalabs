import axios from "axios"
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')





export const createCourse = async (formData) => {
    try {
        const {data} = await axios.post('/admin/course/create-course', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (data.success) {
            toast.success("Course created successfully");
            return data.course;
        } else {
            toast.error(data.message || "Failed to create course");
            return null;
        }
    } catch (error) {
        toast.error("Error creating course");
        console.error("Error creating course:", error);
    }
} 

export const getAllCourses = async()=>{
    try {
        const {data} = await axios.get('/admin/course/get-all',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return data;

    } catch (error) {
        toast.error("Error in fetching courses")
        console.log(error.message);
        
    }
}