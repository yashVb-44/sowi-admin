import React, { createContext, useContext, useState } from 'react';

// Create a context
const AdminSectionContext = createContext();

// Create a custom hook to access the context
export const useAdminSection = () => {
    return useContext(AdminSectionContext);
};

// Create a provider component
export const AdminSectionProvider = ({ children }) => {
    const [blogData, setBlogData] = useState()
    const [category, setCategory] = useState()
    const [projectData, setProjectData] = useState([])

    return (
        <AdminSectionContext.Provider value={{ blogData, setBlogData, category, setCategory, projectData, setProjectData }}>
            {children}
        </AdminSectionContext.Provider>
    );
};
