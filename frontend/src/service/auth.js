
import axios from "axios"
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const loginUser = async (formData) => {
    try {
        const response = await axios.post('/auth/login', formData);
        
        if (response.data.success) {
            toast.success(response.data.message);
            
            // Store token and user data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            return response.data.user;
        } else {
            toast.error(response.data.message || "Login failed");
            return null;
        }
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Login failed";
        toast.error(errorMsg);
        throw error; 
    }
};