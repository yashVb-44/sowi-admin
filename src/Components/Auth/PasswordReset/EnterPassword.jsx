import React, { useState } from 'react';
import '../Signup.css';
import SignInImage from '../../../Assets/Images/Auth/SignInImage.png';
import { Grid, Stack, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../../Lib/AdminApi';
import Loader from '../../../Common/Loader';
import { Alert } from '../../../Common/Alert';
import { useLanguage } from '../../../Context/LanguageContext';
import { getTranslation } from '../../../Common/LanguageFile/transalation';

const EnterPassword = ({ handleShowSuccess, email }) => {

    const date = new Date();
    const navigate = useNavigate()
    const { selectedLanguage } = useLanguage()


    const [showPassword, setShowPassword] = useState(false);

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const [loader, setLoader] = useState(false);

    const handleReset = async () => {
        setLoader(true)
        let response = await updatePassword(email, newPassword, confirmPassword)
        try {
            if (response.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    Alert(`Success`, ` ${response.message}`, 'success');
                    handleShowSuccess()
                }, 2000);
            }
            else if (response.statusCode === 201) {
                setLoader(false)
                Alert('Info', `${response.message}`, 'info')
            }
            else if (response.statusCode === 202) {
                setLoader(false)
                Alert('info', `${response.message}`, 'info')
            }

        } catch (error) {
            setLoader(false)
        }
    }


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
                            {getTranslation('passwordReset.heading', selectedLanguage)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='SignupPara'>
                            {getTranslation('passwordReset.para', selectedLanguage)}
                        </Typography>
                        <Stack className='SignupFormFields'>

                            <Stack className='SignupFileds'>
                                <Typography variant="body2" color="text.secondary" className='SignupInputLabel'>
                                    {getTranslation('passwordReset.newPassword', selectedLanguage)}
                                </Typography>
                                <TextField
                                    id="standard-required"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='********'
                                    variant="standard"
                                    className='SignupInputFiled'
                                    onChange={(e) => handleChange(e, setNewPassword)}
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
                            <Stack className='SignupFileds'>
                                <Typography variant="body2" color="text.secondary" className='SignupInputLabel'>
                                    {getTranslation('passwordReset.confirmPassword', selectedLanguage)}
                                </Typography>
                                <TextField
                                    id="standard-required"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='********'
                                    variant="standard"
                                    className='SignupInputFiled'
                                    onChange={(e) => handleChange(e, setConfirmPassword)}
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

                            <Stack className='SignupButton'>
                                <Button variant="outlined" onClick={() => handleReset()} sx={{ textTransform: 'none' }}> {getTranslation('passwordReset.heading', selectedLanguage)} </Button>
                            </Stack>

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

export default EnterPassword;
