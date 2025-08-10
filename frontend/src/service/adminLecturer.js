import axios from "axios"
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')





export const createLecturer = async (formData) => {
    try {
        const {data} = await axios.post('/admin/lecturer/create-lecturer', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (data.success) {
            toast.success("Lecturer created successfully");
            return data.lecturer;
        } else {
            toast.error(data.message || "Failed to create lecturer");
            return null;
        }
    } catch (error) {
        toast.error("Error creating lecturer");
        console.error("Error creating lecturer:", error);
    }
} 

export const getAllLecturers = async()=>{
    try {
        const {data} = await axios.get('/admin/lecturer/get-all',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return data;

    } catch (error) {
        toast.error("Error in fetching lectures")
        console.log(error.message);
        
    }
}