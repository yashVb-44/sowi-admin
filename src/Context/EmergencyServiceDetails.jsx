import React, { createContext, useContext, useState } from 'react';

// Create a context
const EmergencyServiceSectionContext = createContext();

// Create a custom hook to access the context
export const useEmergencyServiceSection = () => {
    return useContext(EmergencyServiceSectionContext);
};

// Create a provider component
export const EmergencyServiceDetailProvider = ({ children }) => {
    const [emergencyServiceData, setEmergencyServiceData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <EmergencyServiceSectionContext.Provider value={{ setEmergencyServiceData, emergencyServiceData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </EmergencyServiceSectionContext.Provider>
    );
};
