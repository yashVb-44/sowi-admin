import React, { useState } from 'react';
import './AdminLogin.css';
import { Grid, Stack, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../../Assets/Images/logo.png'
import { useNavigate } from 'react-router-dom';

const AdminSuccessPass = () => {

    const date = new Date();
    const navigate = useNavigate()

    const handleBackLogin = () => {
        navigate('/admin')
    }

    return (
        <Stack className='AdminLoginContent'>
            <Stack className='AdminLoginCenter'>
                <img src={logo} alt='Logo' />
                <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }} className='AdminLoginHeading'>
                    Password Update
                </Typography>
                <Typography variant="body2" color="text.secondary" className='AdminLoginPara'>
                    Your password is updated
                </Typography>
                <Stack className='AdminLoginFormFields'>

                    <Stack className='AdminLoginButton'>
                        <Button variant="outlined" onClick={() => handleBackLogin()} sx={{ textTransform: 'none' }}>Back to login</Button>
                    </Stack>
                </Stack>
            </Stack>
            <Stack className='CopyRightSingup'>
                <Typography variant="body2" color="text.secondary" className='PrivacyCopyRight'>
                    &#169; {date.getFullYear()} Hope4Iran.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default AdminSuccessPass;
