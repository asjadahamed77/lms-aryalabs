import axios from "axios"
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;



export const getLecturerCourses = async () => {
    try {
        const token = localStorage.getItem('token'); // Get fresh token each call
        const { data } = await axios.get('/lecturer/courses', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
       
        
        return data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch lecturer courses");
        console.error("Error fetching lecturer courses:", error);
        throw error;
    }
}