import React, { createContext, useEffect, useState } from 'react';
import { batches, facultiesOfUni } from '../assets/assets';
import { getAllLecturers } from '../service/adminLecturer';
import { getAllStudents } from '../service/adminStudent';
import { getAllCourses } from '../service/adminCourse';
import { useNavigate } from 'react-router-dom';
import { getLecturerCourses } from '../service/lecturerService';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [faculties, setFaculties] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [lecturerCourses, setLecturerCourses] = useState([])

  

  const fetchLecturerCourses = async () => {
    try {
      const response = await getLecturerCourses();
      setLecturerCourses(response.courses)
     
      
      
      
    } catch (error) {
      console.error("Error fetching lecturer courses:", error);
      setLecturerCourses([]);
      throw error; 
    }
  };
  // Initialize faculties
  useEffect(() => {
    setFaculties(facultiesOfUni);
  }, []);

  // Check for logged in user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Check authentication status
  useEffect(() => {
    const isLoggedIn = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    };
    isLoggedIn();
  }, [navigate]);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    // Clear admin data on logout
    setLecturers([]);
    setStudents([]);
    setCourses([]);
  };

  // Fetch data functions
  const fetchLecturers = async () => {
    try {
      setLoading(true);
      const data = await getAllLecturers();
      if (data) {
        setLecturers(data.lecturers || []);
      }
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      if (data) {
        setStudents(data.students || []);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getAllCourses();
      if (data) {
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
        const fetchAdminData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    fetchLecturers(),
                    fetchStudents(),
                    fetchCourses()
                ]);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    } else if (user && user.role === "lecturer") {
      const fetchLecturerData = async () => {
        try {
          setLoading(true);
          await fetchLecturerCourses();
          
        } catch (error) {
          console.error("Lecturer data fetch error:", error);
           
        } finally {
          setLoading(false);
        }
      };
      fetchLecturerData();
    }else {
        // Clear data if not admin/lecturer
        setLecturers([]);
        setStudents([]);
        setCourses([]);
        setLecturerCourses([]);
    }
}, [user]);

  const value = {
    faculties,
    setFaculties,
    students,
    setStudents,
    batches,
    user,
    setUser,
    login,
    logout,
    lecturers,
    setLecturers,
    loading,
    setLoading,
    courses,
    setCourses,
    fetchCourses,
    fetchLecturers,
    fetchStudents,
    lecturerCourses, setLecturerCourses
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;