import React from 'react';
import '../Signup.css';
import PasswordResetSuccess from '../../../Assets/Images/Auth/PasswordResetSuccessfully.jpg';
import { Stack, Typography, Button } from '@mui/material';
import logo from '../../../Assets/Images/logo.png'
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../../Common/LanguageFile/transalation';
import { useLanguage } from '../../../Context/LanguageContext';

const ResetSuccessfully = () => {

    const date = new Date();
    const navigate = useNavigate()
    const { selectedLanguage } = useLanguage()

    const handleLogin = () => {
        navigate('/signin')
    }

    return (
        <div className='PasswordSuccessContainer'>
            <Stack className='PasswordSuccessContent'>
                <Stack className='TextCenterSignup'>
                    <img src={logo} alt='Logo' />
                    <Typography gutterBottom variant="h5" component="div" className='SignupHeading'>
                        {getTranslation('passwordReset.passwordChanged', selectedLanguage)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className='SignupPara'>
                        {getTranslation('passwordReset.passwordChangedSuccess', selectedLanguage)}
                    </Typography>
                    <Stack className='BackToLoginButton'>
                        <Button variant="outlined" onClick={() => handleLogin()} sx={{ textTransform: 'none' }}> {getTranslation('passwordReset.backToLogin', selectedLanguage)} </Button>
                    </Stack>
                </Stack>
                <Stack className='CopyRightSingup'>
                    <Typography variant="body2" color="text.secondary" className='PrivacyCopyRight'>
                        &#169; {date.getFullYear()} {getTranslation('hope4Iran', selectedLanguage)}.
                    </Typography>
                </Stack>
            </Stack>
        </div>
    );
};

export default ResetSuccessfully;
