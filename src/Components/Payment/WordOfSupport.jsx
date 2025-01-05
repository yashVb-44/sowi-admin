import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Stack, Grid, TextField, MenuItem, InputAdornment, Button, Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Payment.css'
import AsyncTextRenderer from '../../Context/AsyncTextRenderer';
import donation from '../../Assets/Images/ProjectList/Donate.png'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { createSupport } from '../../Lib/WordOfSupport';
import { useWordOfSupport } from '../../Context/WordOfSupportContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../Context/LanguageContext';

const WordOfSupport = ({ open, handleClose }) => {

    const { selectedLanguage } = useLanguage();

    const navigate = useNavigate()
    const [fullName, setFullName] = useState('')
    const [message, setMessage] = useState('')
    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const { donatedAmt } = useWordOfSupport()

    const handleSave = async () => {
        handleClose()
        navigate('/project')
        let sessionDataString = localStorage.getItem('projectListData')
        const sessionData = JSON.parse(sessionDataString);
        await createSupport(sessionData?._id, fullName, message, donatedAmt)

    }
    const handleCancel = () => {
        handleClose()
        navigate('/project')
    }




    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='paymetModal'>

                    <Stack className='PaymentText'>
                        <img src={donation} alt='Donation' />
                        <Typography className='PaymentModalHeading'>{selectedLanguage === 'EN' ? 'Words Of Support' : 'وردس اف سپورت '}</Typography>
                        <Typography className='PaymentModalPara'><AsyncTextRenderer text="Lorem ipsum dolor sit amet consectetur. A convallis velit odio " /></Typography>
                    </Stack>
                    <div className='PaymentFormFields'>
                        <div className='PaymentFileds'>
                            <Typography variant="body2" color="text.secondary" className='PaymentInputLabel'>
                                <AsyncTextRenderer text="Full Name" />
                            </Typography>

                            <TextField
                                name="fullName"
                                placeholder={selectedLanguage === 'EN' ? 'Enter your full name' : 'نام کامل خود را وارد کنید'}
                                variant="standard"
                                className='PaymentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={fullName}
                                onChange={(e) => handleChange(e, setFullName)}
                            />
                        </div>
                        <div className='PaymentFileds'>
                            <Typography variant="body2" color="text.secondary" className='PaymentInputLabel'>
                                <AsyncTextRenderer text="Your Message" />
                            </Typography>
                            <TextareaAutosize
                                name="message"
                                placeholder={selectedLanguage === 'EN' ? 'Enter your message here.' : 'پیام خود را اینجا وارد کنید'}
                                className='PaymentInputFiled'
                                rows={3}
                                style={{ marginBottom: '20px', height: '100px', border: 'none' }}
                                value={message}
                                onChange={(e) => handleChange(e, setMessage)}
                            />
                        </div>
                    </div>
                    <Stack className='FormSubmitFieldPayment'>
                        <Stack className='PaymentButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormCancelButtonPaymentModal'
                                onClick={() => handleCancel()}
                            >
                                <AsyncTextRenderer text="Cancel" />

                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormSubmitButtonPaymentModal'
                                onClick={() => handleSave()}
                            >
                                <AsyncTextRenderer text="Submit" />

                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>

        </div >
    )
}

export default WordOfSupport
