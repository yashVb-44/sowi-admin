import React, { useState, useMemo, useEffect } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../../../Common/Loader';
import Select from 'react-select';
import Flags from 'react-world-flags';
import countryList from 'react-select-country-list';
import { createContactContent } from '../../../Lib/ContactContentApi';
import { useContent } from '../../../Context/ContentContext';
import { Alert } from '../../../Common/Alert';
import { useAddContact } from '../../../AdminContext/AddContactContext';
import { translateText } from '../../../Lib/Language';


const ContactContentAddFarsi = ({ openContactAddFarsi, handleCloseContactAddFarsi, handleCloseContactAdd }) => {

    const { fetchContactContent } = useContent()
    const [loader, setLoader] = useState(false);

    const { country, setCountry, pinCode, setPinCode, address, setAddress, countryFarsi, setCountryFarsi, addressFarsi, setAddressFarsi } = useAddContact()

    const options = useMemo(() => countryList().getData(), []);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            backgroundColor: '#F5FAFF',
            '&:hover': {
                border: 'none',
            },
        }),
    };

    const handleCountryChange = (selectedOption, index) => {
        setCountry(selectedOption)
    };

    const handleChange = (e, setter) => {
        setter(e.target.value)
    };

    const formatOptionLabel = ({ label, value }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Flags code={value} alt={label} style={{ width: 20, height: 15, marginRight: 10 }} />
            <span>{label}</span>
        </div>
    );

    const handleClear = () => {
        setCountry('')
        setPinCode('')
        setAddressFarsi('')
        setCountryFarsi('')
        setAddress('')
    }

    const [errors, setErrors] = useState({
        country: '',
        address: '',
        pinCode: '',
        countryFarsi: '',
        addressFarsi: '',
    });


    const handleCountryAdd = async () => {
        let valid = true;
        let newErrors = {
            country: '',
            address: '',
            pinCode: '',
            countryFarsi: '',
            addressFarsi: '',
        };

        if (!country) {
            newErrors.country = 'Country is required';
            valid = false;
        }
        if (!address) {
            newErrors.address = 'Address is required';
            valid = false;
        }
        if (!countryFarsi) {
            newErrors.country = 'Country is required';
            valid = false;
        }
        if (!addressFarsi) {
            newErrors.address = 'Address is required';
            valid = false;
        }
        if (!pinCode) {
            newErrors.pinCode = 'Pincode is required';
            valid = false;
        }
        
        setErrors(newErrors);

        if (!valid) return;

        setLoader(true)
        let response = await createContactContent(country, pinCode, address, countryFarsi, addressFarsi)
        try {
            if (response?.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    handleCloseContactAdd()
                    handleCloseContactAddFarsi()
                    fetchContactContent()
                    handleClear()
                    Alert('Success', response?.message, 'success')
                }, 2000);
            }
            else {
                setLoader(false)
                handleCloseContactAdd()
                handleCloseContactAddFarsi()
                handleClear()
                Alert('Info', response?.message, 'info')
            }
        } catch (error) {
            setLoader(false)
            setLoader(false)
            handleCloseContactAdd()
            handleCloseContactAddFarsi()
            handleClear()
            Alert('Info', response?.message, 'info')
        }
    }

    useEffect(() => {
        translateText(country?.label, setCountryFarsi);
        translateText(address, setAddressFarsi);
    }, [country, address])

    return (
        <div>
            <Modal
                open={openContactAddFarsi}
                onClose={handleCloseContactAddFarsi}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='EditContactContentModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            اضافه کردن مکان
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseContactAddFarsi} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>

                    <Stack className='BorderLine'></Stack>

                    <Stack className=''>
                        <Stack>
                            <Grid container>
                                <Grid item md={12} lg={12}>
                                    <Typography className='HomeContentHeadingThree'>کشور</Typography>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <img
                                            src={`https://flagcdn.com/${country?.value?.toLowerCase()}.svg`}
                                            alt={`${country?.value} flag`}
                                            className='ContactFlag'
                                        />
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={countryFarsi}
                                            onChange={(e) => handleChange(e, setCountryFarsi)}
                                            variant="standard"
                                            fullWidth
                                            type='address'
                                            placeholder='نام کشور را وارد کنید'
                                            InputProps={{ disableUnderline: true }}
                                            error={!!errors.countryFarsi}
                                            helperText={errors.countryFarsi}
                                        />
                                    </Stack>

                                </Grid>
                            </Grid>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>نشانی</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={addressFarsi}
                                    onChange={(e) => handleChange(e, setAddressFarsi)}
                                    variant="standard"
                                    fullWidth
                                    type='address'
                                    placeholder='آدرس را وارد کنید'
                                    InputProps={{ disableUnderline: true }}
                                    error={!!errors.addressFarsi}
                                    helperText={errors.addressFarsi}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>پین کد</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={pinCode}
                                    onChange={(e) => handleChange(e, setPinCode)}
                                    variant="standard"
                                    type='number'
                                    fullWidth
                                    placeholder='کد پین را وارد کنید'
                                    InputProps={{ disableUnderline: true }}
                                    error={!!errors.pinCode}
                                    helperText={errors.pinCode}
                                />
                            </Stack>
                        </Stack>

                        <Stack className='AboutContentFieldCreateBlog'>
                            <Stack className='AboutContentButtonFormSubmit'>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    className='AboutContentFormCancelButton'
                                    onClick={() => {
                                        handleCloseContactAddFarsi();
                                        handleCloseContactAdd();
                                        handleClear();
                                    }}

                                >
                                    Cancel
                                </Button>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    className='AboutContentFormCreateButton'
                                    onClick={handleCountryAdd}
                                >
                                    Save
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default ContactContentAddFarsi;
