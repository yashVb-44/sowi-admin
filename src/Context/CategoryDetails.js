import React, { createContext, useContext, useState } from 'react';

// Create a context
const CategorySectionContext = createContext();

// Create a custom hook to access the context
export const useCategorySection = () => {
    return useContext(CategorySectionContext);
};

// Create a provider component
export const CategoryDetailProvider = ({ children }) => {
    const [categoryData, setCategoryData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <CategorySectionContext.Provider value={{ setCategoryData, categoryData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </CategorySectionContext.Provider>
    );
};
