import React, { createContext, useEffect, useState } from 'react';
import  { batches, facultiesOfUni, students } from '../assets/assets'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [faculties, setFaculties] = useState([])

  useEffect(()=>{
    setFaculties(facultiesOfUni)
  },[])


  
    
  const value = {
    faculties,
    setFaculties,
    students,
    batches
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
