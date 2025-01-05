import React, { createContext, useContext, useState } from 'react';
import { useProjectList } from '../Context/ProjectListContext';

// Create a context
const AddTeamContext = createContext();

// Create a custom hook to access the context
export const useAddTeam = () => {
    return useContext(AddTeamContext);
};

// Create a provider component
export const AddTeamProvider = ({ children }) => {

    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [description, setDescription] = useState('');

    const [nameFarsi, setNameFarsi] = useState('');
    const [designationFarsi, setDesignationFarsi] = useState('');
    const [descriptionFarsi, setDescriptionFarsi] = useState('');


    return (
        <AddTeamContext.Provider value={{
            name, setName, designation, setDesignation, description, setDescription,
            nameFarsi, setNameFarsi, designationFarsi, setDesignationFarsi, descriptionFarsi, setDescriptionFarsi
            }}>
            {children}
        </AddTeamContext.Provider>
    );
};
