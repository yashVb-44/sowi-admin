import React, { useState } from 'react';
import './AdminLogin.css';
import { Grid, Stack, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../../Assets/Images/logo.png'
import { useNavigate, useParams } from 'react-router-dom';
import AdminSuccessPass from './AdminSuccessPass';
import { adminUpdatePassword } from '../../../Lib/AdminApi';
import { Alert } from '../../../Common/Alert';
import Loader from '../../../Common/Loader';

const AdminResetPass = () => {

    const date = new Date();
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const [showSuccess, setShowSuccess] = useState(false)

    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const { email } = useParams();


    const handleResetPass = async () => {
        setLoader(true)
        let response = await adminUpdatePassword(email, password, confPassword)
        try {
            if (response.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    Alert('Success', `${response.message}`, 'success')
                    setShowSuccess(true)
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
            {!showSuccess &&
                <Stack className='AdminLoginContent'>
                    <Stack className='AdminLoginCenter'>
                        <img src={logo} alt='Logo' />
                        <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }} className='AdminLoginHeading'>
                            Reset password
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='AdminLoginPara'>
                            Lorem ipsum dolor sit amet consectetur. A convallis velit odio
                        </Typography>
                        <Stack className='AdminLoginFormFields'>

                            <Stack className='AdminLoginFields'>
                                <Typography variant="body2" color="text.secondary" className='AdminLoginInputLabel'>
                                    New password
                                </Typography>
                                <TextField
                                    id="standard-required"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='********'
                                    variant="standard"
                                    className='AdminLoginInputFiled'
                                    value={password}
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
                            <Stack className='AdminLoginFields'>
                                <Typography variant="body2" color="text.secondary" className='AdminLoginInputLabel'>
                                    Confirm password
                                </Typography>
                                <TextField
                                    id="standard-required"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='********'
                                    variant="standard"
                                    className='AdminLoginInputFiled'
                                    value={confPassword}
                                    onChange={(e) => handleChange(e, setConfPassword)}
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

                            <Stack className='AdminLoginButton'>
                                <Button variant="outlined" onClick={() => handleResetPass()} sx={{ textTransform: 'none' }}>Reset password</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack className='CopyRightSingup'>
                        <Typography variant="body2" color="text.secondary" className='PrivacyCopyRight'>
                            &#169; {date.getFullYear()} Hope4Iran.
                        </Typography>
                    </Stack>
                </Stack>
            }
            {showSuccess &&
                <AdminSuccessPass />
            }
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default AdminResetPass;
