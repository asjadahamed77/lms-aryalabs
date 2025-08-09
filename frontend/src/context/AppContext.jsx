import React, { createContext, useEffect, useState } from 'react';
import  { batches, facultiesOfUni, students } from '../assets/assets'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [faculties, setFaculties] = useState([])

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


  
    
  const value = {
    faculties,
    setFaculties,
    students,
    batches,
    user,
    setUser,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
