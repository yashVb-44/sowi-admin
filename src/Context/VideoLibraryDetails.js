import React, { createContext, useContext, useState } from 'react';

// Create a context
const VideoLibrarySectionContext = createContext();

// Create a custom hook to access the context
export const useVideoLibrarySection = () => {
    return useContext(VideoLibrarySectionContext);
};

// Create a provider component
export const VideoLibraryDetailProvider = ({ children }) => {
    const [videoLibraryData, setVideoLibraryData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <VideoLibrarySectionContext.Provider value={{ setVideoLibraryData, videoLibraryData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery }}>
            {children}
        </VideoLibrarySectionContext.Provider>
    );
};
