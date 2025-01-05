import React, { useState } from 'react';
import './AdminLogin.css';
import { Grid, Stack, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../../Assets/Images/logo.png'
import { useNavigate } from 'react-router-dom';
import { adminPasswordLink } from '../../../Lib/AdminApi';
import { Alert } from '../../../Common/Alert';
import Loader from '../../../Common/Loader';

const AdminForgetPass = () => {

    const date = new Date();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const [email, setEmail] = useState('')

    const handleSignIn = () => {
        navigate('/admin')
    }
    const handleSend = async () => {
        setLoader(true)
        let response = await adminPasswordLink(email)
        try {
            if (response.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    setEmail('')
                    Alert('Success', `${response.message}`, 'success')
                }, 2000);
            }
            else {
                setLoader(false)
                Alert('Info', `${response.message}`, 'info')
            }
        } catch (error) {
            setLoader(false)
        }
    }

    return (
        <div className='AdminLogin'>
            <Stack className='AdminLoginContent'>
                <Stack className='AdminLoginCenter'>
                    <img src={logo} alt='Logo' />
                    <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }} className='AdminLoginHeading'>
                        Forgot password?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className='AdminLoginPara'>
                        Lorem ipsum dolor sit amet consectetur. A convallis velit odio
                    </Typography>
                    <Stack className='AdminLoginFormFields'>
                        <Stack className='AdminLoginFields'>
                            <Typography variant="body2" color="text.secondary" className='AdminLoginInputLabel'>
                                Email Address
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your email address'
                                variant="standard"
                                className='AdminLoginInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Stack>

                        <Stack className='AdminLoginButton'>
                            <Button variant="outlined" onClick={() => handleSend()} sx={{ textTransform: 'none' }}>Send</Button>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" className='DontHaveAcc'>
                            Return to <span className='GreenColor' style={{ cursor: 'pointer' }} onClick={() => handleSignIn()} >Sign in</span>
                        </Typography>
                    </Stack>
                </Stack>
                <Stack className='CopyRightSingup'>
                    <Typography variant="body2" color="text.secondary" className='PrivacyCopyRight'>
                        &#169; {date.getFullYear()} Hope4Iran.
                    </Typography>
                </Stack>
            </Stack>
            <Loader loader={loader} setLoader={setLoader} />

        </div>
    );
};

export default AdminForgetPass;
