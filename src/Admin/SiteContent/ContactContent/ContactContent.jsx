import React, { useState, useMemo, useEffect } from 'react';
import { Grid, Typography, Button, Stack, TextField } from '@mui/material';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png';
import DeleteIcon from '../../../Assets/AdminImages/DeleteIcon.png';
import './ContactContent.css';
import ContactContentEdit from './ContactContentEdit';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import Flags from 'react-world-flags';
import countryList from 'react-select-country-list';
import ContactContentAdd from './ContactContentAdd';
import { deleteContactContent, getContact, getContactContent } from '../../../Lib/ContactContentApi';
import { useContent } from '../../../Context/ContentContext';
import { Alert, AlertConfirm } from '../../../Common/Alert';
import Loader from '../../../Common/Loader';
import Swal from 'sweetalert2';

const ContactContent = () => {

    const { fetchContactContent, contactDataAdmin, setEditContactData } = useContent()

    const options = useMemo(() => countryList().getData(), []);
    const [loader, setLoader] = useState(false);


    const [openContactAdd, setOpenContactAdd] = useState(false);
    const handleOpenContactAdd = () => setOpenContactAdd(true);
    const handleCloseContactAdd = () => setOpenContactAdd(false);

    const [openContactEdit, setOpenContactEdit] = useState(false);
    const handleOpenContactEdit = (data) => {
        setEditContactData(data)
        setOpenContactEdit(true);
    }
    const handleCloseContactEdit = () => setOpenContactEdit(false);

    const handleDeleteContact = async (data) => {
        Swal.fire({
            title: 'Info',
            text: "Sure want to delete",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoader(true)
                let response = await deleteContactContent(data?._id)
                try {
                    if (response?.statusCode === 200) {
                        setTimeout(() => {
                            setLoader(false)
                            Alert('Success', response?.message, 'success')
                            fetchContactContent()
                        }, 2000);
                    }
                    else {
                        setLoader(false)
                        Alert('Info', response?.message, 'info')
                    }
                } catch (error) {
                    setLoader(false)
                    Alert('Info', response?.message, 'info')
                }
            }
        })

    }


    useEffect(() => {
        fetchContactContent()
    }, [])

    return (
        <div className='HomeContentMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='HomeContentMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='HomeContentHeading'>
                        Contact Us Content
                    </Typography>
                </Stack>

                <Stack className='HomeContentSite'>
                    <Stack className='ContactContentText'>
                        <Typography gutterBottom variant="h5" component="div" className='HomeContentHeadingTwo'>
                            Our Locations
                        </Typography>
                        <Button onClick={handleOpenContactAdd} variant="outlined" className='ContactContentAddButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />}>
                            Add Location
                        </Button>
                    </Stack>
                    {contactDataAdmin?.map((data, index) => (
                        <Stack key={index} className='ContactContentTopMar'>
                            <Grid container>
                                <Grid item md={8} lg={8}>
                                    <Typography className='HomeContentHeadingThree'>Country</Typography>
                                    <div className='HomeContentInputFiled' style={{ display: 'flex', alignItems: 'center' }}>
                                        <Flags code={data.en.countryCode} style={{ width: 24, height: 16, marginRight: 10 }} />
                                        <TextField
                                            value={data.en.countryName}
                                            variant="standard"
                                            fullWidth
                                            type='address'
                                            InputProps={{ disableUnderline: true, readOnly: true }}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </div>
                                    <Typography className='HomeContentHeadingThree'>کشور</Typography>
                                    <div className='HomeContentInputFiled' style={{ display: 'flex', alignItems: 'center' }}>
                                        <Flags code={data.fa.countryCode} style={{ width: 24, height: 16, marginRight: 10 }} />
                                        <TextField
                                            value={data.fa.countryName}
                                            variant="standard"
                                            fullWidth
                                            type='address'
                                            InputProps={{ disableUnderline: true, readOnly: true }}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </div>
                                    <Stack className='BorderBottom'></Stack>
                                </Grid>
                                <Grid item md={4} lg={4} style={{ display: 'flex', flexDirection: 'row', gap: '40px', justifyContent: 'end' }}>
                                    <Stack className='HomeContentEditBtn'>
                                        <img src={DeleteIcon} alt='Delete Icon' onClick={() => handleDeleteContact(data)} className='HomeContentEditIcon' />
                                    </Stack>
                                    <Stack className='HomeContentEditBtn'>
                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenContactEdit(data)} className='HomeContentEditIcon' />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>Address</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={data.en.address}
                                    variant="standard"
                                    fullWidth
                                    type='address'
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>نشانی</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={data.fa.address}
                                    variant="standard"
                                    fullWidth
                                    type='address'
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'></Stack>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>Pin code (پین کد)</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={data.en.pinCode}
                                    variant="standard"
                                    typeof='pincode'
                                    fullWidth
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Grid>
            <ContactContentEdit openContactEdit={openContactEdit} handleCloseContactEdit={handleCloseContactEdit} />
            <ContactContentAdd openContactAdd={openContactAdd} handleCloseContactAdd={handleCloseContactAdd} />
            <Loader loader={loader} setLoader={setLoader} />

        </div>
    );
};

export default ContactContent;
