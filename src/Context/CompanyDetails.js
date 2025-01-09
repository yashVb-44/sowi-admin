import React, { createContext, useContext, useState } from 'react';

// Create a context
const CompanySectionContext = createContext();

// Create a custom hook to access the context
export const useCompanySection = () => {
    return useContext(CompanySectionContext);
};

// Create a provider component
export const CompanyDetailProvider = ({ children }) => {
    const [companyData, setCompanyData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <CompanySectionContext.Provider value={{ setCompanyData, companyData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </CompanySectionContext.Provider>
    );
};
