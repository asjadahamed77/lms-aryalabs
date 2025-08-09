import React, { createContext, useEffect, useState } from 'react';
import  { facultiesOfUni } from '../assets/assets'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [faculties, setFaculties] = useState([])

  useEffect(()=>{
    setFaculties(facultiesOfUni)
  },[])

  console.log(faculties);
  
    
  const value = {
    faculties,
    setFaculties
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
