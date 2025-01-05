import React, { createContext, useContext, useState } from 'react';

// Create a context
const WordOfSupportContext = createContext();

// Create a custom hook to access the context
export const useWordOfSupport = () => {
  return useContext(WordOfSupportContext);
};

// Create a provider component
export const WordOfSupportProvider = ({ children }) => {
  // Define your state and functions here
  const [donatedAmt, setDonatedAmt] = useState(null);


  return (
    <WordOfSupportContext.Provider value={{donatedAmt, setDonatedAmt}}>
      {children}
    </WordOfSupportContext.Provider>
  );
};
