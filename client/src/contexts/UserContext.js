import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [studentNumber, setStudentNumber] = useState(null);

  return (
    <UserContext.Provider value={{ studentNumber, setStudentNumber }}>
      {children}
    </UserContext.Provider>
  );
};