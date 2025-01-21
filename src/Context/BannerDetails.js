import React, { createContext, useContext, useState } from 'react';

// Create a context
const BannerSectionContext = createContext();

// Create a custom hook to access the context
export const useBannerSection = () => {
    return useContext(BannerSectionContext);
};

// Create a provider component
export const BannerDetailProvider = ({ children }) => {
    const [bannerData, setBannerData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <BannerSectionContext.Provider value={{ setBannerData, bannerData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </BannerSectionContext.Provider>
    );
};
