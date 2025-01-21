import React, { createContext, useContext, useState } from 'react';

// Create a context
const VendorSectionContext = createContext();

// Create a custom hook to access the context
export const useVendorSection = () => {
    return useContext(VendorSectionContext);
};

// Create a provider component
export const VendorDetailProvider = ({ children }) => {
    const [vendorData, setVendorData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <VendorSectionContext.Provider value={{ setVendorData, vendorData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </VendorSectionContext.Provider>
    );
};
