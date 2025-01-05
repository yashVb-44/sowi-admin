import React, { useState } from 'react';
import './Signup.css';
import SignInImage from '../../Assets/Images/Auth/SignInImage.png';
import { Grid, Stack, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from '../../Assets/Images/Auth/Google.png';
import Apple from '../../Assets/Images/Auth/Apple.png';
import Facebook from '../../Assets/Images/Auth/Facebook.png';
import logo from '../../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Common/Loader';
import { adminLogin } from '../../Lib/AdminApi';
import { Alert } from '../../Common/Alert';
import { useLanguage } from '../../Context/LanguageContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';

const SignIn = () => {

    const { selectedLanguage } = useLanguage();

    const date = new Date();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleChange = (e, setter) => {
        let value = e.target.value;
        setter(value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    };

    const handleLogin = async () => {
        let valid = true;
        let newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        setLoader(true);
        let response = await adminLogin(email, password);
        try {
            if (response.statusCode === 200) {
                sessionStorage.setItem('accessToken', response?.token);
                setTimeout(() => {
                    setLoader(false);
                    navigate('/');
                }, 2000);
            } else if (response.statusCode === 401) {
                setLoader(false);
                Alert('Info', 'Invalid email or password', 'info');
            } else {
                setLoader(false);
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleForgetPassword = () => {
        navigate('/password-reset');
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={6} lg={6} className='SignupImageContainer'>
                    <div className='ImageWrapper'>
                        <img src={logo} alt='Hope4Iran' className='LogoImage' />
                        <img src={SignInImage} alt='Signup Image' className='MainImage' />
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6} className='SignupText'>
                    <Stack className='TextCenterSignup'>
                        <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }} className='SignupHeading'>
                            {getTranslation('signIn.heading', selectedLanguage)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='SignupPara'>
                            {getTranslation('signIn.para', selectedLanguage)}
                        </Typography>
                        <Stack className='SignupFormFields'>
                            <Stack className='SignupFileds'>
                                <Typography variant="body2" color="text.secondary" className='SignupInputLabel'>
                                    {getTranslation('signIn.email', selectedLanguage)}
                                </Typography>
                                <TextField
                                    id="standard-required"
                                    name="email"
                                    placeholder={selectedLanguage === 'EN' ? 'Enter your email address' : 'آدرس ایمیل خود را وارد کنید'}
                                    variant="standard"
                                    className='SignupInputFiled'
                                    InputProps={{ disableUnderline: true }}
                                    onChange={(e) => handleChange(e, setEmail)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />

                            </Stack>
                            <Stack className='SignupFileds'>
                                <Typography variant="body2" color="text.secondary" className='SignupInputLabel'>
                                    {getTranslation('signIn.password', selectedLanguage)}
                                </Typography>
                                <TextField
                                    id="standard-required"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='********'
                                    variant="standard"
                                    className='SignupInputFiled'
                                    onChange={(e) => handleChange(e, setPassword)}
                                    InputProps={{
                                        disableUnderline: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Stack>
                            <Stack className='CheckBoxCard'>
                                <input type='checkBox' />
                                <Stack className='CheckBoxFlex'>
                                    <Typography variant="body2" color="text.secondary" className='AuthSubPara'>
                                        {getTranslation('signIn.rememberMe', selectedLanguage)}
                                    </Typography>
                                    <Typography className='GreenColor' style={{ cursor: 'pointer' }} onClick={handleForgetPassword}>
                                        {getTranslation('signIn.forgetPassword', selectedLanguage)}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack className='SignupButton'>
                                <Button variant="outlined" onClick={handleLogin} sx={{ textTransform: 'none' }}> {getTranslation('signIn.login', selectedLanguage)} </Button>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" className='DontHaveAcc'>
                                {getTranslation('signIn.dontHaveAccount', selectedLanguage)} <span className='GreenColor' style={{ cursor: 'pointer' }} onClick={handleSignUp}> {getTranslation('signIn.signUp', selectedLanguage)}</span>
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack className='CopyRightSingup'>
                        <Typography variant="body2" color="text.secondary" className='PrivacyCopyRight'>
                            &#169; {date.getFullYear()} {getTranslation('hope4Iran', selectedLanguage)}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Loader loader={loader} setLoader={setLoader} />

        </div>
    );
};

export default SignIn;
