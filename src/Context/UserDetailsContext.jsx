import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserSectionContext = createContext();

// Create a custom hook to access the context
export const useUserSection = () => {
    return useContext(UserSectionContext);
};

// Create a provider component
export const UserDetailProvider = ({ children }) => {
    const [userData, setUserData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <UserSectionContext.Provider value={{ setUserData, userData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </UserSectionContext.Provider>
    );
};
