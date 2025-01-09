import React, { createContext, useContext, useState } from 'react';

// Create a context
const AddCategoryContext = createContext();

// Create a custom hook to access the context
export const useAddCategory = () => {
    return useContext(AddCategoryContext);
};

// Create a provider component
export const AddCategoryProvider = ({ children }) => {

    const [catName, setCatName] = useState('');
    const [catTitle, setCatTitle] = useState('');
    const [catDesc, setCatDesc] = useState('');

    const [catNameFarsi, setCatNameFarsi] = useState('');
    const [catTitleFarsi, setCatTitleFarsi] = useState('');
    const [catDescFarsi, setCatDescFarsi] = useState('');


    return (
        <AddCategoryContext.Provider value={{
            catName, setCatName, catTitle, setCatTitle, catDesc, setCatDesc, catNameFarsi, setCatNameFarsi, catTitleFarsi, setCatTitleFarsi,
            catDescFarsi, setCatDescFarsi
            }}>
            {children}
        </AddCategoryContext.Provider>
    );
};
