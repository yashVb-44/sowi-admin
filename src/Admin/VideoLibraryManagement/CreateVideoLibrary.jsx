import React, { useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '../../Common/Alert';
import { addVideoLibrary, getAllVideoLibrary } from '../../Lib/VideoLibrarysApi';
import { useVideoLibrarySection } from '../../Context/VideoLibraryDetails';

const CreateVideoLibrary = ({ openVideoLibraryCreate, handleCloseVideoLibraryCreate }) => {
    const { setVideoLibraryData, page, rowsPerPage, searchQuery } = useVideoLibrarySection();

    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [text, setText] = useState('')
    const [errors, setErrors] = useState({
        title: '',
        link: ''
    });

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!link?.trim()) newErrors.link = 'Link is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const fetchVideoLibrary = async () => {
        let response = await getAllVideoLibrary({ page, search: searchQuery, limit: rowsPerPage });
        setVideoLibraryData(response?.videos || []);
    };

    const handleCreateVideoLibrary = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await addVideoLibrary({
                title,
                text,
                link
            });

            if (response.type === 'success') {
                setLoader(false);
                fetchVideoLibrary();
                setTimeout(() => {
                    handleModelClose();
                    Alert('Success', 'Video Library Created successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleModelClose();
                Alert('Warning', response.message, 'warning');
            }
        } catch (error) {
            setLoader(false);
            handleModelClose();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    const resetForm = () => {
        setTitle('');
        setLink('')
        setText('')
        setErrors({});
    }

    const handleModelClose = () => {
        handleCloseVideoLibraryCreate()
        resetForm()
    }

    return (
        <div>
            <Modal
                open={openVideoLibraryCreate}
                onClose={handleModelClose}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Add Video-Library
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleModelClose} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        Video Library Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Title
                            </Typography>
                            <TextField
                                id="title"
                                name="title"
                                placeholder="Enter title"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={title}
                                onChange={(e) => handleChange(e, setTitle)}
                                autoComplete="off"
                                error={!!errors.title}
                                helperText={errors.title}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Link
                            </Typography>
                            <TextField
                                name='link'
                                id="standard-required"
                                placeholder="Enter link"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={link}
                                onChange={(e) => handleChange(e, setLink)}
                                autoComplete="off"
                                error={!!errors.link}
                                helperText={errors.link}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={12} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={12} lg={12} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Text
                            </Typography>
                            <TextField
                                name='text'
                                id="standard-required"
                                placeholder="Enter text"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={text}
                                onChange={(e) => handleChange(e, setText)}
                                autoComplete="off"
                                error={!!errors.text}
                                helperText={errors.text}
                            />
                        </Grid>
                    </Grid>

                    {
                        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                            <Typography variant="h6" color="text.secondary">
                                Video Preview
                            </Typography>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${link}`}
                                title="Video preview"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </Box>
                    }

                    <Box sx={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                textTransform: 'none',
                                borderRadius: '4px',
                                padding: '6px 20px',
                            }}
                            onClick={handleCreateVideoLibrary}
                            disabled={loader}
                        >
                            {loader ? 'Adding...' : 'Add Video-Library'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateVideoLibrary;
