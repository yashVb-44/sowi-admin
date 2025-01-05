import React, { useState } from 'react';
import { Grid, Stack, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Signup.css';
import SignupImage from '../../Assets/Images/Auth/SignupImage.png';
import Google from '../../Assets/Images/Auth/Google.png';
import Apple from '../../Assets/Images/Auth/Apple.png';
import Facebook from '../../Assets/Images/Auth/Facebook.png';
import logo from '../../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../Lib/AdminApi';
import Loader from '../../Common/Loader';
import { Alert } from '../../Common/Alert';
import { useLanguage } from '../../Context/LanguageContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';

const Signup = () => {
    const { selectedLanguage } = useLanguage();
    const date = new Date();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [loader, setLoader] = useState(false);

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        terms: '',
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleChange = (e, setter) => {
        let value = e.target.value;
        setter(value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    };

    const handleRegister = async () => {
        let valid = true;
        let newErrors = { fullName: '', email: '', password: '', terms: '' };

        if (!fullName) {
            newErrors.fullName = 'Full name is required';
            valid = false;
        }
        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = 'Invalid email format';
                valid = false;
            }
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
            if (!passwordRegex.test(password)) {
                newErrors.password = 'Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character';
                valid = false;
            }
        }

        if (!isChecked) {
            newErrors.terms = 'You must agree to the terms and conditions';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        setLoader(true);
        try {
            let response = await userRegister(fullName, email, password);
            if (response.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false);
                    navigate('/signin');
                }, 2000);
            } else if (response.statusCode === 400) {
                setLoader(false);
                Alert('Info', 'User already registered!', 'info');
            } else {
                setLoader(false);
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const handleSignIn = () => {
        navigate('/signin')
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={6} lg={6} className='SignupImageContainer'>
                    <div className='ImageWrapper'>
                        <img src={logo} alt='Hope4Iran' className='LogoImage' />
                        <img src={SignupImage} alt='Signup Image' className='MainImage' />
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6} className='SignupText'>
                    <Stack className='TextCenterSignup'>
                        <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }} className='SignupHeading'>
                            {getTranslation('signUp.heading', selectedLanguage)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='SignupPara'>
                            {getTranslation('signUp.para', selectedLanguage)}
                        </Typography>
                        <Stack className='SignupFormFields'>
                            <Stack className='SignupFileds'>
                                <Typography variant="body2" color="text.secondary" className='SignupInputLabel'>
                                    {getTranslation('signUp.name', selectedLanguage)}
                                </Typography>
                                <TextField
                                    id="standard-required"
                                    name="fullName"
                                    placeholder={selectedLanguage === 'EN' ? 'Enter your full name' : 'نام کامل خود را وارد کنید'}
                                    variant="standard"
                                    className='SignupInputFiled'
                                    InputProps={{ disableUnderline: true }}
                                    error={!!errors.fullName}
                                    helperText={errors.fullName}
                                    onChange={(e) => handleChange(e, setFullName)}
                                />
                            </Stack>
                            <Stack className='SignupFileds'>
                                <Typography variant="body2" color="text.secondary" className='SignupInputLabel'>
                                    {getTranslation('signUp.email', selectedLanguage)}
                                </Typography>

                                <TextField
                                    id="standard-required"
                                    name="email"
                                    placeholder={selectedLanguage === 'EN' ? 'Enter your email address' : 'آدرس ایمیل خود را وارد کنید'}
                                    variant="standard"
                                    className='SignupInputFiled'
                                    type='email'
                                    InputProps={{ disableUnderline: true }}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={(e) => handleChange(e, setEmail)}
                                />
                            </Stack>
                            <Stack className='SignupFileds'>
                                <Typography variant="body2" color="text.secondary" className='SignupInputLabel'>
                                    {getTranslation('signUp.password', selectedLanguage)}
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
                            <Stack direction="row" alignItems="center" className='CheckBoxCard'>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <Typography variant="body2" color="text.secondary" className='PaymentSubPara'>
                                    {getTranslation('signUp.iAgree', selectedLanguage)}    <span className='GreenColor' style={{ cursor: 'pointer' }} onClick={() => navigate('/terms-of-use')}> {getTranslation('signUp.terms', selectedLanguage)} </span> {getTranslation('signUp.and', selectedLanguage)}   <span className='GreenColor' style={{ cursor: 'pointer' }} onClick={() => navigate('/privacy-policy')}> {getTranslation('signUp.privacy', selectedLanguage)} </span>
                                </Typography>
                            </Stack>
                            {errors.terms && <Typography variant="body2" color="error" className='ErrorText'> {errors.terms} </Typography>}
                            <Stack className='SignupButton'>
                                <Button variant="outlined" className='' sx={{ textTransform: 'none' }} onClick={() => handleRegister()} > {selectedLanguage === 'EN' ? 'Sign up' : 'سیگن اپ'} </Button>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" className='DontHaveAcc' onClick={() => handleSignIn()}>
                                {getTranslation('signUp.alreadyAccount', selectedLanguage)} <span className='GreenColor' style={{ cursor: 'pointer' }}  >  {selectedLanguage === 'EN' ? 'Sign in' : 'ورود'}
                                </span>
                            </Typography>
                        </Stack>
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

export default Signup;
