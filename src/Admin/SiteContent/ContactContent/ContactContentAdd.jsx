import React, { useState, useMemo } from 'react';
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
import ContactContentAddFarsi from './ContactContentAddFarsi';
import { Pinch } from '@mui/icons-material';


const ContactContentAdd = ({ openContactAdd, handleCloseContactAdd }) => {

    const { fetchContactContent } = useContent()
    const [loader, setLoader] = useState(false);

    const { country, setCountry, pinCode, setPinCode, address, setAddress, countryFarsi, setCountryFarsi, addressFarsi, setAddressFarsi} = useAddContact()

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
        setAddress('')
    }

    const [errors, setErrors] = useState({
        country: '',
        address: '',
        pinCode: '',
    });

    const handleCountryAdd = async () => {
        let valid = true;
        let newErrors = {
            country: '',
            address: '',
            pinCode: '',
        };

        if (!country) {
            newErrors.country = 'Country is required';
            valid = false;
        }
        if (!address) {
            newErrors.address = 'Address is required';
            valid = false;
        }
        if (!pinCode) {
            newErrors.pinCode = 'Pincode is required';
            valid = false;
        }
        
        setErrors(newErrors);

        if (!valid) return;
        handleOpenContactAddFarsi()
    }

    
    const [openContactAddFarsi, setOpenContactAddFarsi] = useState(false);
    const handleOpenContactAddFarsi = () => setOpenContactAddFarsi(true);
    const handleCloseContactAddFarsi = () => setOpenContactAddFarsi(false);

    return (
        <div>
            <ContactContentAddFarsi openContactAddFarsi={openContactAddFarsi} handleCloseContactAddFarsi={handleCloseContactAddFarsi} handleCloseContactAdd={handleCloseContactAdd} />
            <Modal
                open={openContactAdd}
                onClose={handleCloseContactAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='EditContactContentModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            Add Location
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseContactAdd} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>

                    <Stack className='BorderLine'></Stack>

                    <Stack className=''>
                        <Stack>
                            <Grid container>
                                <Grid item md={12} lg={12}>
                                    <Typography className='HomeContentHeadingThree'>Country</Typography>
                                    <Select
                                        value={options.find(option => option.value === country)}
                                        onChange={(selectedOption) => handleCountryChange(selectedOption)}
                                        options={options}
                                        styles={customStyles}
                                        classNamePrefix="react-select"
                                        placeholder="Select Country"
                                        isClearable={false}
                                        formatOptionLabel={formatOptionLabel}
                                        error={!!errors.country}
                                        helperText={errors.country}
                                    />
                                </Grid>
                            </Grid>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>Address</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={address}
                                    onChange={(e) => handleChange(e, setAddress)}
                                    variant="standard"
                                    fullWidth
                                    type='address'
                                    placeholder='Enter address'
                                    InputProps={{ disableUnderline: true }}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>Pin code</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={pinCode}
                                    onChange={(e) => handleChange(e, setPinCode)}
                                    variant="standard"
                                    type='number'
                                    fullWidth
                                    placeholder='Enter pin code'
                                    InputProps={{ disableUnderline: true }}
                                    error={!!errors.pinCode}
                                    helperText={errors.pinCode}
                                />
                            </Stack>
                        </Stack>

                        <Stack className='AboutContentFieldCreateBlog'>
                            <Stack className='AboutContentButtonFormSubmit'>
                                {/* <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    className='AboutContentFormCancelButton'
                                    onClick={handleCloseContactAdd}
                                >
                                    Cancel
                                </Button> */}
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    className='AboutContentFormCreateButton'
                                    onClick={handleCountryAdd}
                                >
                                    Continue
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

export default ContactContentAdd;
