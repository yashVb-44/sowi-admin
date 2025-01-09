import React, { createContext, useContext, useState } from 'react';

// Create a context
const ExpenseCategorySectionContext = createContext();

// Create a custom hook to access the context
export const useExpenseCategorySection = () => {
    return useContext(ExpenseCategorySectionContext);
};

// Create a provider component
export const ExpenseCategoryDetailProvider = ({ children }) => {
    const [expenseCategoryData, setExpenseCategoryData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ExpenseCategorySectionContext.Provider value={{ setExpenseCategoryData, expenseCategoryData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </ExpenseCategorySectionContext.Provider>
    );
};
