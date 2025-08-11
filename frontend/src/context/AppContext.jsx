import React, { createContext, useEffect, useState } from 'react';
import { batches, facultiesOfUni } from '../assets/assets';
import { getAllLecturers } from '../service/adminLecturer';
import { getAllStudents } from '../service/adminStudent';
import { getAllCourses } from '../service/adminCourse';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [faculties, setFaculties] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  // Fetch data only when admin is logged in
  useEffect(() => {
    if (user && user.role === "admin") {
      const fetchAdminData = async () => {
        try {
          setLoading(true);
          // Fetch all data in parallel
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
    } else {
      // Clear data if not admin
      setLecturers([]);
      setStudents([]);
      setCourses([]);
    }
  }, [user]); // Run when user changes

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
    fetchStudents
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;