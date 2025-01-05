import React, { createContext, useContext, useState } from 'react';
import { useProjectList } from '../Context/ProjectListContext';

// Create a context
const AddBlogContext = createContext();

// Create a custom hook to access the context
export const useAddBlog = () => {
    return useContext(AddBlogContext);
};

// Create a provider component
export const AddBlogProvider = ({ children }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')

    const [titleFarsi, setTitleFarsi] = useState('')
    const [authorFarsi, setAuthorFarsi] = useState('')
    const [contentFarsi, setContentFarsi] = useState('')

    return (
        <AddBlogContext.Provider value={{
            title, setTitle, author, setAuthor, content, setContent, titleFarsi, setTitleFarsi,
            authorFarsi, setAuthorFarsi, contentFarsi, setContentFarsi
        }}>
            {children}
        </AddBlogContext.Provider>
    );
};
