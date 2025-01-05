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
import { useContent } from '../../../Context/ContentContext';
import { Alert } from '../../../Common/Alert';
import { updateContactContent } from '../../../Lib/ContactContentApi';


const ContactContentEdit = ({ openContactEdit, handleCloseContactEdit }) => {

    const { editContactData, fetchContactContent } = useContent()

    const [loader, setLoader] = useState(false);

    const [country, setCountry] = useState()
    const [pinCode, setPinCode] = useState()
    const [address, setAddress] = useState()
    const [countryFarsi, setCountryFarsi] = useState()
    const [addressFarsi, setAddressFarsi] = useState()

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

    useEffect(() => {
        setCountry(editContactData?.en?.countryName)
        setAddress(editContactData?.en?.address)
        setPinCode(editContactData?.en?.pinCode)
        setCountryFarsi(editContactData?.fa?.countryName)
        setAddressFarsi(editContactData?.fa?.address)
    }, [editContactData])

    const handleEdit = async () => {
        setLoader(true)
        let response = await updateContactContent(country, pinCode, address, countryFarsi, addressFarsi, editContactData?._id)
        try {
            if (response?.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    handleCloseContactEdit()
                    Alert('Success', response?.message, 'success')
                    fetchContactContent()
                }, 2000);
            }
            else {
                setLoader(false)
                handleCloseContactEdit()
                Alert('Info', response?.message, 'info')
            }
        } catch (error) {
            setLoader(false)
            handleCloseContactEdit()
            Alert('Info', response?.message, 'info')
        }
    }


    return (
        <div>
            <Modal
                open={openContactEdit}
                onClose={handleCloseContactEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='EditContactContentModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            Edit Location
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseContactEdit} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>

                    <Stack className='BorderLine'></Stack>

                    <Stack className=''>
                        <Stack>
                            <Grid container>
                                <Grid item md={12} lg={12}>
                                    <Typography className='HomeContentHeadingThree'>Country</Typography>
                                    <Select
                                        value={options.find(option => option.label === country)}
                                        onChange={(selectedOption) => handleCountryChange(selectedOption)}
                                        options={options}
                                        styles={customStyles}
                                        classNamePrefix="react-select"
                                        placeholder="Select Country"
                                        isClearable={false}
                                        formatOptionLabel={formatOptionLabel}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item md={12} lg={12}>
                                    <Typography className='HomeContentHeadingThree'>کشور</Typography>
                                    <Stack direction="row" alignItems="center" sx={{ marginLeft: '10px' }}>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={countryFarsi}
                                            onChange={(e) => handleChange(e, setCountryFarsi)}
                                            variant="standard"
                                            fullWidth
                                            type='address'
                                            placeholder="کشور را انتخاب کنید"
                                            InputProps={{ disableUnderline: true }}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Stack className='BorderBottom'></Stack>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>Address</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={address}
                                    onChange={(e) => handleChange(e, setAddress)}
                                    variant="standard"
                                    fullWidth
                                    placeholder='Enter Address'
                                    type='address'
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
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
                                />
                            </Stack>
                            <Stack className='BorderBottom'></Stack>

                            <Stack>
                                <Typography className='HomeContentHeadingThree'>Pin code (پین کد)</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={pinCode}
                                    onChange={(e) => handleChange(e, setPinCode)}
                                    variant="standard"
                                    typeof='pincode'
                                    placeholder='Enter pin code (کد پین را وارد کنید)'
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
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
                                    onClick={handleCloseContactEdit}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    className='AboutContentFormCreateButton'
                                    onClick={handleEdit}
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

export default ContactContentEdit;
