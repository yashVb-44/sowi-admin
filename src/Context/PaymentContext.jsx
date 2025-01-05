import React, { createContext, useContext, useState } from 'react';

// Create a context
const PaymentContext = createContext();

// Create a custom hook to access the context
export const usePayment = () => {
    return useContext(PaymentContext);
};

// Create a provider component
export const PaymentProvider = ({ children }) => {
    // Define your state and functions here
    const [paymentAmount, setPaymentAmount] = useState();
    const [donationAmount, setDonationAmount] = useState()
    const [selectedPg, setSelectedPg] = useState()

    const [cryptoStatus, setCryptoStatus] = useState()
    const [cryptoTxnID, setCryptoTxnID] = useState()
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()

    return (
        <PaymentContext.Provider value={{ paymentAmount, setPaymentAmount, donationAmount, setDonationAmount, selectedPg, setSelectedPg, cryptoStatus, setCryptoStatus, cryptoTxnID, setCryptoTxnID
            ,userName, setUserName, userEmail, setUserEmail
         }}>
            {children}
        </PaymentContext.Provider>
    );
};
