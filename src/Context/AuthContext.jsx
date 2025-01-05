import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Create a custom hook to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  // Define your state and functions here
  const [adminToken, setAdminToken] = useState(null);
  const [editHomeContent, setEditHomeContent] = useState([]);


  return (
    <AuthContext.Provider value={{adminToken, setAdminToken}}>
      {children}
    </AuthContext.Provider>
  );
};
