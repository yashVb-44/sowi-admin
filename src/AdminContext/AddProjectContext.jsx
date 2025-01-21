import React, { createContext, useContext, useState } from 'react';
import { useProjectList } from '../Context/ProjectListContext';

// Create a context
const AddProjectContext = createContext();

// Create a custom hook to access the context
export const useAddProject = () => {
    return useContext(AddProjectContext);
};

// Create a provider component
export const AddProjectProvider = ({ children }) => {

    const { verificationData, verificationDataFarsi } = useProjectList()

    // Define your state and functions here
    const [editData, setEditData] = useState()

    // initial states

    const [projectName, setProjectName] = useState('');
    const [projectNameFarsi, setProjectNameFarsi] = useState('');
    const [amount, setAmount] = useState('');
    const [amountFarsi, setAmountFarsi] = useState('');
    const [category, setCategory] = useState([]);
    const [categoryFarsi, setCategoryFarsi] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [categoryDataFarsi, setCategoryDataFarsi] = useState([]);
    const [description, setDescription] = useState('');
    const [descriptionFarsi, setDescriptionFarsi] = useState('');
    const [organisationName, setOrganisationName] = useState('');
    const [organisationNameFarsi, setOrganisationNameFarsi] = useState('');
    const [organiserName, setOrganiserName] = useState('');
    const [organiserNameFarsi, setOrganiserNameFarsi] = useState('');
    const [email, setEmail] = useState('');
    const [emailFarsi, setEmailFarsi] = useState('');
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [paymentMethodFarsi, setPaymentMethodFarsi] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberFarsi, setAccountNumberFarsi] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountHolderNameFarsi, setAccountHolderNameFarsi] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberFarsi, setContactNumberFarsi] = useState('');
    const [verification, setVerification] = useState(verificationData[0]);
    const [verificationFarsi, setVerificationFarsi] = useState(verificationDataFarsi[0]);



    return (
        <AddProjectContext.Provider value={{
            editData,
            setEditData,
            projectName,
            setProjectName,
            projectNameFarsi,
            setProjectNameFarsi,
            amount,
            setAmount,
            amountFarsi,
            setAmountFarsi,
            category,
            setCategory,
            categoryDataFarsi,
            setCategoryDataFarsi,
            categoryFarsi,
            setCategoryFarsi,
            categoryData,
            setCategoryData,
            description,
            setDescription,
            descriptionFarsi,
            setDescriptionFarsi,
            organisationName,
            setOrganisationName,
            organisationNameFarsi,
            setOrganisationNameFarsi,
            organiserName,
            setOrganiserName,
            organiserNameFarsi,
            setOrganiserNameFarsi,
            email,
            setEmail,
            emailFarsi,
            setEmailFarsi,
            paymentMethod,
            setPaymentMethod,
            paymentMethodFarsi,
            setPaymentMethodFarsi,
            accountNumber,
            setAccountNumber,
            accountNumberFarsi,
            setAccountNumberFarsi,
            accountHolderName,
            setAccountHolderName,
            accountHolderNameFarsi,
            setAccountHolderNameFarsi,
            contactNumber,
            setContactNumber,
            contactNumberFarsi,
            setContactNumberFarsi,
            verification,
            setVerification,
            verificationFarsi,
            setVerificationFarsi,
        }}>
            {children}
        </AddProjectContext.Provider>
    );
};
