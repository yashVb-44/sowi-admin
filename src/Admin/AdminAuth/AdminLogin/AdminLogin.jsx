import React, { useState } from 'react';
import './AdminLogin.css';
import { Grid, Stack, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../../Assets/Images/logo.png'
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../Lib/AdminApi';
import { Alert } from '../../../Common/Alert';
import Loader from '../../../Common/Loader';
import { useAuth } from '../../../Context/AuthContext';
import { useLanguage } from '../../../Context/LanguageContext';

const AdminLogin = () => {

    const date = new Date();
    const navigate = useNavigate()

    const { selectedLanguage } = useLanguage()
    const { setAdminToken } = useAuth()

    const [loader, setLoader] = useState(false)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();



    const handleSignUp = () => {
        navigate('/signup')
    }
    const handleForgetPassword = () => {
        navigate('/admin-forget')
    }

    const handleChange = (e, setter) => {
        let value = e.target.value
        setter(value)
    }

    const handleLogin = async () => {
        setLoader(true)
        let response = await adminLogin(username, password)
        try {
            if (response.type === "success") {
                localStorage.setItem('adminToken', response?.token)
                setAdminToken(response?.token)
                setTimeout(() => {
                    setLoader(false)
                    Alert('Info', `${response.message}`, 'success')
                }, 1000);
            }
            else {
                setLoader(false)
                Alert('Alert', `${response.message}`, 'error')
            }

        } catch (error) {
            setLoader(false)
            Alert('Alert', 'Server Error!', 'error')
        }
        // console.log("response ---- ", JSON.stringify(response))
    }


    return (
        <div className='AdminLogin'>
            <Stack className='AdminLoginContent'>
                <Stack className='AdminLoginCenter'>
                    <img src={logo} alt='Logo' />
                    <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }} className='AdminLoginHeading'>
                        Welcome back!
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className='AdminLoginPara'>
                        {/* Join us and raise your voice for positive change. */}
                    </Typography>
                    <Stack className='AdminLoginFormFields'>
                        <Stack className='AdminLoginFields'>
                            <Typography variant="body2" color="text.secondary" className='AdminLoginInputLabel'>
                                User Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your Username'
                                variant="standard"
                                className='AdminLoginInputFiled'
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => handleChange(e, setUsername)}
                            />
                        </Stack>
                        <Stack className='AdminLoginFields'>
                            <Typography variant="body2" color="text.secondary" className='AdminLoginInputLabel'>
                                Password
                            </Typography>
                            <TextField
                                id="standard-required"
                                type={showPassword ? 'text' : 'password'}
                                placeholder='********'
                                variant="standard"
                                className='AdminLoginInputFiled'
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
                            />
                        </Stack>
                        <Stack className='CheckBoxCard'>
                            <input type='checkBox' />
                            <Stack className='CheckBoxFlex'>
                                <Typography variant="body2" color="text.secondary" className='AuthSubPara'>
                                    Remember Me
                                </Typography>
                                <Typography className='GreenColor' style={{ cursor: 'pointer' }} onClick={() => handleForgetPassword()} >
                                    Forgot Password ?
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack className='AdminLoginButton'>
                            <Button variant="outlined" onClick={() => handleLogin()} sx={{ textTransform: 'none' }}>Login</Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack className='CopyRightSingup'>
                    <Typography variant="body2" color="text.secondary" className='PrivacyCopyRight'>
                        &#169; {date.getFullYear()} Sowi.
                    </Typography>
                </Stack>
            </Stack>
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};


export default AdminLogin;
