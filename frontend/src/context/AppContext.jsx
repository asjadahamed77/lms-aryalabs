import React, { createContext, useEffect, useState } from 'react';
import  { batches, facultiesOfUni } from '../assets/assets'
import { getAllLecturers } from '../service/adminLecturer';
import { getAllStudents } from '../service/adminStudent';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [faculties, setFaculties] = useState([])
  const [lecturers, setLecturers] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setFaculties(facultiesOfUni)
  },[])

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const fetchLecturers = async ()=>{
    try {
      setLoading(true)
      const data = await getAllLecturers();
      if (data) {
        setLecturers(data.lecturers || []);
        
      }
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    }finally{
      setLoading(false)
    }
  }
  
  const fetchStudents = async ()=>{
    try {
      setLoading(true)
      const data = await getAllStudents();
      if (data) {
        setStudents(data.students || []);
        
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }finally{
      setLoading(false)
    }
  }


  useEffect(()=>{
    fetchLecturers()
    fetchStudents()
  },[])


  
    
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
