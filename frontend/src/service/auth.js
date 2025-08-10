
import axios from "axios"
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const loginUser = async (formData) => {
    try {
        const {data} = await axios.post('/auth/login', formData);
        
        if (data.success) {
            toast.success(data.message);
            
            // Store token and user data
            localStorage.setItem('token', data.token);        
            localStorage.setItem('user', JSON.stringify(data.user));
            
            return data;
        } else {
            toast.error(data.message || "Login failed");
            return null;
        }
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Login failed";
        toast.error(errorMsg);
        throw error; 
    }
};