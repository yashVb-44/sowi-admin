import React, { createContext, useContext, useState } from 'react';
import { useProjectList } from '../Context/ProjectListContext';

// Create a context
const AddContactContext = createContext();

// Create a custom hook to access the context
export const useAddContact = () => {
    return useContext(AddContactContext);
};

// Create a provider component
export const AddContactProvider = ({ children }) => {

    const [country, setCountry] = useState()
    const [pinCode, setPinCode] = useState()
    const [address, setAddress] = useState()
    // farsi
    const [countryFarsi, setCountryFarsi] = useState()
    const [addressFarsi, setAddressFarsi] = useState()


    return (
        <AddContactContext.Provider value={{
            country, setCountry, pinCode, setPinCode, address, setAddress, countryFarsi, setCountryFarsi, addressFarsi, setAddressFarsi
            }}>
            {children}
        </AddContactContext.Provider>
    );
};
