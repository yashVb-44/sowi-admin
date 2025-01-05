import React, { useState } from 'react';
import { Grid, Stack, Typography, TextField, Button } from '@mui/material';
import '../Signup.css';
import PasswordForget from '../../../Assets/Images/Auth/PasswordForget.png';
import logo from '../../../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../../Lib/AdminApi';
import Loader from '../../../Common/Loader';
import { Alert } from '../../../Common/Alert';
import { useLanguage } from '../../../Context/LanguageContext';
import EnterPassword from './EnterPassword';
import PasswordResetCode from './PasswordResetCode';
import ResetSuccessfully from './ResetSuccessfully';
import { getTranslation } from '../../../Common/LanguageFile/transalation';

const PasswordReset = () => {

    const { selectedLanguage } = useLanguage();

    const [forgetPassword, setForgetPassword] = useState(true);
    const [passwordResetCode, setPasswordResetCode] = useState(false);
    const [enterPassword, setEnterPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({ email: '' });

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin');
    }

    const handleContinue = async () => {
        if (!email) {
            setErrors({ email: 'Email is required' });
            return;
        }

        setLoader(true);
        let response = await sendOtp(email);
        try {
            if (response.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false);
                    Alert('Success', `${response.message}`, 'success');
                    setPasswordResetCode(true);
                    setEnterPassword(false);
                    setShowSuccess(false);
                    setForgetPassword(false);
                    setErrors({ email: '' });
                }, 2000);
            } else if (response.statusCode === 201) {
                setLoader(false);
                Alert('Info', `${response.message}`, 'info');
            } else if (response.statusCode === 400) {
                setLoader(false);
                Alert('info', `${response.message}`, 'info');
            }
        } catch (error) {
            setLoader(false);
        }
    }

    const handleVerifyCode = () => {
        setEnterPassword(true);
        setPasswordResetCode(false);
        setShowSuccess(false);
        setForgetPassword(false);
    }

    const handleShowSuccess = () => {
        setShowSuccess(true);
        setPasswordResetCode(false);
        setEnterPassword(false);
        setForgetPassword(false);
    }

    return (
        <div>
            {forgetPassword &&
                <Grid container>
                    <Grid item xs={12} md={6} lg={6} className='SignupImageContainer'>
                        <div className='ImageWrapper'>
                            <img src={logo} alt='Hope4Iran' className='LogoImage' />
                            <img src={PasswordForget} alt='Signup Image' className='MainImage' />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className='SignupText'>
                        <Stack className='TextCenterSignup'>
                            <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }} className='SignupHeading'>
                                {getTranslation('passwordReset.forgetPassword', selectedLanguage)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='SignupPara'>
                                {getTranslation('passwordReset.forgetPasswordPara', selectedLanguage)}
                            </Typography>
                            <Stack className='SignupFormFields'>
                                <Stack className='SignupFileds'>
                                    <Typography variant="body2" color="text.secondary" className='SignupInputLabel'>
                                        {getTranslation('passwordReset.email', selectedLanguage)}
                                    </Typography>

                                    <TextField
                                        id="standard-required"
                                        placeholder={selectedLanguage === 'EN' ? 'Enter your email address' : 'آدرس ایمیل خود را وارد کنید'}
                                        variant="standard"
                                        className='SignupInputFiled'
                                        InputProps={{ disableUnderline: true }}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />

                                </Stack>
                                <Stack className='SignupButton'>
                                    <Button variant="outlined" onClick={handleContinue} sx={{ textTransform: 'none' }}> {getTranslation('passwordReset.Continue', selectedLanguage)}  </Button>
                                </Stack>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" className='DontHaveAcc'>
                                {getTranslation('passwordReset.returnTo', selectedLanguage)}  <span className='GreenColor' style={{ cursor: 'pointer' }} onClick={handleSignIn} >                 {selectedLanguage === 'EN' ? 'Sign in' : 'ورود'}
                                </span>
                            </Typography>
                        </Stack>
                        <Stack className='CopyRightSingup'>
                            <Typography variant="body2" color="text.secondary" className='PrivacyCopyRight'>
                                &#169; {new Date().getFullYear()} {getTranslation('hope4Iran', selectedLanguage)}.
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            }

            {passwordResetCode &&
                <PasswordResetCode handleVerifyCode={handleVerifyCode} email={email} />
            }

            {enterPassword &&
                <EnterPassword handleShowSuccess={handleShowSuccess} email={email} />
            }

            {showSuccess &&
                <ResetSuccessfully />
            }
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default PasswordReset;
