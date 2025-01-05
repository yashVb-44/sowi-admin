import React, { useState } from 'react';
import './Contact.css';
import { Button, TextField, Typography } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { contactus } from '../../Lib/ContactusApi';
import { Alert } from '../../Common/Alert';
import Loader from '../../Common/Loader';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useLanguage } from '../../Context/LanguageContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';

const ContactForm = () => {
    const [loader, setLoader] = useState(false);

    const { selectedLanguage } = useLanguage();


    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [subjectError, setSubjectError] = useState('');

    const reset = () => {
        setFullName('');
        setPhoneNumber('');
        setSubject('');
        setMessage('');
        setFullNameError('');
        setPhoneNumberError('');
        setSubjectError('');
    };

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    };

    const validateForm = () => {
        let isValid = true;
        if (fullName.trim() === '') {
            setFullNameError('Full name is required');
            isValid = false;
        } else {
            setFullNameError('');
        }

        if (phoneNumber.trim() === '') {
            setPhoneNumberError('Phone number is required');
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        if (subject.trim() === '') {
            setSubjectError('Subject is required');
            isValid = false;
        } else {
            setSubjectError('');
        }

        return isValid;
    };

    const handleContact = async () => {
        if (validateForm()) {
            setLoader(true);
            try {
                let response = await contactus(fullName, phoneNumber, subject, message);
                if (response.statusCode === 200) {
                    setTimeout(() => {
                        reset();
                        setLoader(false);
                        Alert('Success', `${response.message}`, 'success');
                    }, 2000);
                } else {
                    setLoader(false);
                    Alert('Info', `${response.message}`, 'info');
                }
            } catch (error) {
                setLoader(false);
            }
        }
    };

    return (
        <div className='ContactForm'>
            <div className='ContactFormText'>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className='HeadingTwoContact'
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}
                >
                   {getTranslation('contact.formHeading', selectedLanguage)}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    className='ParaTwoContact'
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}
                >
                    {getTranslation('contact.formPara', selectedLanguage)}
                </Typography>
            </div>
            <div className='FormFields'>
                <div className='Fileds'>
                    <Typography variant="body2" color="text.secondary" className='InputLabel'>
                    {getTranslation('contact.name', selectedLanguage)}
                    </Typography>
                    <TextField
                        name="fullName"
                        placeholder={selectedLanguage === 'EN' ? 'Enter your full name' : 'نام کامل خود را وارد کنید'}
                        variant="standard"
                        className='InputFiled'
                        InputProps={{ disableUnderline: true }}
                        value={fullName}
                        onChange={(e) => handleChange(e, setFullName)}
                        error={!!fullNameError}
                        helperText={fullNameError}
                    />
                </div>
                <div className='Fileds'>
                    <Typography variant="body2" color="text.secondary" className='InputLabel'>
                        {selectedLanguage === 'EN' ? 'Your Phone Number' : 'شماره تلفن شما'}
                    </Typography>
                    <MuiPhoneNumber
                        defaultCountry={'us'}
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        variant="outlined"
                        fullWidth
                        className='InputFiledContact'
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiOutlinedInput-root': {
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                padding: '4px 0px',
                            },
                        }}
                        error={!!phoneNumberError}
                        helperText={phoneNumberError}
                    />
                </div>
                <div className='Fileds'>
                    <Typography variant="body2" color="text.secondary" className='InputLabel'>
                        {getTranslation('contact.subject', selectedLanguage)}
                    </Typography>
                    <TextField
                        name="subject"
                        placeholder={selectedLanguage === 'EN' ? 'Enter your subject' : 'موضوع خود را وارد کنید'}
                        variant="standard"
                        className='InputFiled'
                        InputProps={{ disableUnderline: true }}
                        value={subject}
                        onChange={(e) => handleChange(e, setSubject)}
                        error={!!subjectError}
                        helperText={subjectError}
                    />
                </div>
                <div className='Fileds'>
                    <Typography variant="body2" color="text.secondary" className='InputLabel'>
                        {getTranslation('contact.message', selectedLanguage)}
                    </Typography>
                    <TextareaAutosize
                        name="message"
                        placeholder={selectedLanguage === 'EN' ? 'Enter your message here.' : 'پیام خود را اینجا وارد کنید'}
                        className='InputFiled'
                        rows={3}
                        style={{ marginBottom: '20px', height: '100px', border: 'none' }}
                        value={message}
                        onChange={(e) => handleChange(e, setMessage)}
                    />
                </div>
                <div className='ContactButton'>
                    <Button
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                        onClick={handleContact}
                    >
                        {getTranslation('button.submit', selectedLanguage)}
                    </Button>
                </div>
            </div>
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default ContactForm;
