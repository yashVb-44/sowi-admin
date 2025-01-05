import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllBlog } from '../Lib/BlogApi';

// Create a context
const BlogDetailContext = createContext();

// Create a custom hook to access the context
export const useBlogDetail = () => {
    return useContext(BlogDetailContext);
};

// Create a provider component
export const BlogDetailProvider = ({ children }) => {
    // Define your state and functions here

    const [blogListData, setBlogListData] = useState()
    const [latestBlogData, setLatestBlogData] = useState()
    const [blogData, setBlogData] = useState(null)

    const fetchBlog = async (selectedLanguage) => {
        let response = await getAllBlog();
        const enBlogs = response.blogs.map(cat => cat.en);
        const faBlogs = response.blogs.map(cat => cat.fa);
        {
            selectedLanguage === 'EN' ?
                setBlogData(enBlogs)
                :
                setBlogData(faBlogs)
        }
    };


    return (
        <BlogDetailContext.Provider value={{ blogListData, setBlogListData, latestBlogData, setLatestBlogData, blogData, setBlogData, fetchBlog}}>
            {children}
        </BlogDetailContext.Provider>
    );
};
