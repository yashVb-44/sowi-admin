import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Stack, Grid, TextField, Select, MenuItem, InputAdornment, Button, Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Payment.css'
import { usePayment } from '../../Context/PaymentContext';
import AsyncTextRenderer from '../../Context/AsyncTextRenderer';
import { cryptoPaymentRes, paymentRes } from '../../Lib/PaymentApi';
import WordOfSupport from './WordOfSupport';
import { addUser } from '../../Lib/UsersApi';
import { useWordOfSupport } from '../../Context/WordOfSupportContext';
import CloseIcon from '@mui/icons-material/Close';


const CryptoPaymentModal = ({ cryptoOpen, handleCloseCrypto, handleClear, fetchDashboard }) => {

    const { cryptoStatus, cryptoTxnID, setCryptoStatus, paymentAmount, userName, userEmail } = usePayment()
    const { setDonatedAmt } = useWordOfSupport()

    const fetchStatus = async () => {
        let sessionDataString = localStorage.getItem('projectListData');
        let name = localStorage.getItem('userName');
        let email = localStorage.getItem('userEmail');
        let checkBox = localStorage.getItem('checkBox') || 'false';
        const sessionData = JSON.parse(sessionDataString);
        let response = await cryptoPaymentRes(cryptoTxnID);
        setCryptoStatus(response?.message);

        if (response?.message === 'completed') {
            let res = response?.paymentInfo;
            setDonatedAmt(paymentAmount);
            await paymentRes("Crypto", paymentAmount, sessionData?._id, cryptoTxnID, res?.coin, res?.amountf, name, email, checkBox);
            await addUser("Crypto", paymentAmount, sessionData?._id, cryptoTxnID, name, email, checkBox, res?.coin, res?.amountf);
            handleOpen();
            handleClear();
            fetchDashboard();
            handleCloseCrypto();
            localStorage.removeItem('checkBox');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            return 'completed'
        }

        return response?.message
    };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <div>
            <Modal
                open={cryptoOpen}
                onClose={handleCloseCrypto}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='CryptoModal'>
                    <Stack className='CryptoClose'>
                        <CloseIcon onClick={() => handleCloseCrypto()} className='CryptoCloseIcon' />
                    </Stack>
                    <Typography className="CryptoPaymentModalHeading">
                        <AsyncTextRenderer text="Payment Status!" />
                    </Typography>
                    <Typography className='CryptoPaymentModalPara' style={{ display: 'flex', justifyContent: 'center' }}>
                        <AsyncTextRenderer text={cryptoStatus} />
                    </Typography>
                    <Stack className='CryptoModalButton'>
                        {/* <Typography className='CryptoButtonClose' onClick={() => handleCloseCrypto()}><AsyncTextRenderer text="Close" /></Typography> */}
                        <Typography className='CryptoButtonPaymentModal' onClick={() => fetchStatus()}><AsyncTextRenderer text="Refresh" /></Typography>
                    </Stack>
                </Box>
            </Modal>
            <WordOfSupport open={open} handleClose={handleClose} />

        </div >
    )
}

export default CryptoPaymentModal
