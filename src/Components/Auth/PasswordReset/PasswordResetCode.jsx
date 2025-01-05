import React, { useState, useRef } from 'react';
import { Grid, Stack, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PasswordResetCodeImage from '../../../Assets/Images/Auth/PasswordResetCode.png';
import logo from '../../../Assets/Images/logo.png';
import '../Signup.css';
import { Alert } from '../../../Common/Alert';
import Loader from '../../../Common/Loader';
import { verifyOtp } from '../../../Lib/AdminApi';
import AsyncTextRenderer from '../../../Context/AsyncTextRenderer';
import { getTranslation } from '../../../Common/LanguageFile/transalation';
import { useLanguage } from '../../../Context/LanguageContext';

const OTPInput = ({ length, value, onChange }) => {
    const inputRefs = useRef([]);

    const focusInput = (index) => {
        inputRefs.current[index].focus();
    };


    const handleChange = (event, index) => {
        const newValue = [...value];
        newValue[index] = event.target.value;
        onChange(newValue);
        if (event.target.value && index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && index > 0 && !value[index]) {
            const newValue = [...value];
            newValue[index - 1] = '';
            onChange(newValue);
            focusInput(index - 1);
        } else if (event.key === 'ArrowLeft' && index > 0) {
            focusInput(index - 1);
        } else if (event.key === 'ArrowRight' && index < length - 1) {
            focusInput(index + 1);
        }
    };


    return (
        <Box display="flex" justifyContent="center" gap={1} className="PasswordInputField">
            {Array.from({ length }).map((_, index) => (
                <TextField
                    key={index}
                    value={value[index] || ''}
                    onChange={(event) => handleChange(event, index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    inputProps={{
                        className: value[index] ? 'filled' : 'notFilled',
                        style: {
                            textAlign: 'center',
                            padding: '13px',
                            height: '25px',
                            width: '25px',
                        },
                    }}
                    variant="outlined"
                />
            ))}
        </Box>
    );
};

const PasswordResetCode = ({ handleVerifyCode, email }) => {

    const [loader, setLoader] = useState(false);

    const {selectedLanguage} = useLanguage()
    const date = new Date();
    const [otp, setOtp] = useState(Array(6).fill(''));

    const handleVerify = async () => {
        const otpValue = otp.join('');
        setLoader(true)
        let response = await verifyOtp(email, otpValue)
        try {
            if (response.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    Alert(`Success`, ` ${response.message}`, 'success');
                    handleVerifyCode()
                    setOtp('')
                }, 2000);
            }
            else if (response.statusCode === 201) {
                setLoader(false)
                Alert('Info', `${response.message}`, 'info')
            }
            else if (response.statusCode === 400) {
                setLoader(false)
                Alert('info', `${response.message}`, 'info')
            }

        } catch (error) {
            setLoader(false)
        }

    };



    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={6} lg={6} className='SignupImageContainer'>
                    <div className='ImageWrapper'>
                        <img src={logo} alt='Hope4Iran' className='LogoImage' />
                        <img src={PasswordResetCodeImage} alt='Signup Image' className='MainImage' />
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6} className='SignupText'>
                    <Stack className='TextCenterSignup'>
                        <Typography gutterBottom variant="h5" component="div" className='SignupHeading'>
                        {getTranslation('passwordReset.passwordResetCode', selectedLanguage)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='SignupPara'>
                        {getTranslation('passwordReset.sentToEmailCode', selectedLanguage)}
                        </Typography>
                        <Stack className='SignupFormFields'>
                            <Stack className='SignupFileds'>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <OTPInput length={6} value={otp} onChange={setOtp} />
                                </Box>
                            </Stack>
                            <Stack className='SignupButton'>
                                <Button variant="outlined" onClick={() => handleVerify()} sx={{ textTransform: 'none' }}> {getTranslation('passwordReset.Verify', selectedLanguage)} </Button>
                            </Stack>
                        </Stack>
                        {/* <Typography variant="body2" color="text.secondary" className='DontHaveAcc'>
                            <AsyncTextRenderer text="Send code again" /> <span className='GreenColor' style={{ cursor: 'pointer' }}> <AsyncTextRenderer text="00:20" /> </span>
                        </Typography> */}
                    </Stack>
                    <Stack className='CopyRightSingup'>
                        <Typography variant="body2" color="text.secondary" className='PrivacyCopyRight'>
                            &#169; {date.getFullYear()} {getTranslation('hope4Iran', selectedLanguage)}.
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default PasswordResetCode;
