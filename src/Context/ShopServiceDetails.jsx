import React, { createContext, useContext, useState } from 'react';

// Create a context
const ShopServiceSectionContext = createContext();

// Create a custom hook to access the context
export const useShopServiceSection = () => {
    return useContext(ShopServiceSectionContext);
};

// Create a provider component
export const ShopServiceDetailProvider = ({ children }) => {
    const [shopServiceData, setShopServiceData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ShopServiceSectionContext.Provider value={{ setShopServiceData, shopServiceData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </ShopServiceSectionContext.Provider>
    );
};
