import React, { createContext, useContext, useState } from 'react';

// Create a context
const FundraiseContext = createContext();

// Create a custom hook to access the context
export const useFundraise = () => {
  return useContext(FundraiseContext);
};

// Create a provider component
export const FundraiseProvider = ({ children }) => {
  // Define your state and functions here
  const [categoryId, setCategoryId] = useState();


  return (
    <FundraiseContext.Provider value={{ categoryId, setCategoryId }}>
      {children}
    </FundraiseContext.Provider>
  );
};
