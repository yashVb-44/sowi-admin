import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllUser } from '../Lib/UsersApi';

// Create a context
const UserDetailContext = createContext();

// Create a custom hook to access the context
export const useUserDetail = () => {
    return useContext(UserDetailContext);
};

// Create a provider component
export const UserDetailProvider = ({ children }) => {
    // Define your state and functions here

    const [userListData, setUserListData] = useState()
    const [latestUserData, setLatestUserData] = useState()
    const [userData, setUserData] = useState(null)

    const fetchUser = async () => {
        let response = await getAllUser();
        // const enUsers = response.users.map(cat => cat.en);
        // const faUsers = response.users.map(cat => cat.fa);
        // {
        //     selectedLanguage === 'EN' ?
        //         setUserData(enUsers)
        //         :
        //         setUserData(faUsers)
        // }
        setUserData(response?.users || [])
    };


    return (
        <UserDetailContext.Provider value={{ userListData, setUserListData, latestUserData, setLatestUserData, userData, setUserData, fetchUser }}>
            {children}
        </UserDetailContext.Provider>
    );
};
