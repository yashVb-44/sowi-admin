import React, { createContext, useContext, useState } from 'react';

// Create a context
const SupportSectionContext = createContext();

// Create a custom hook to access the context
export const useSupportSection = () => {
    return useContext(SupportSectionContext);
};

// Create a provider component
export const SupportDetailProvider = ({ children }) => {
    const [supportData, setSupportData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SupportSectionContext.Provider value={{ setSupportData, supportData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </SupportSectionContext.Provider>
    );
};
