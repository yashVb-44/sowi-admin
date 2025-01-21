import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import './CreateVideoLibrary.css';
import CloseIcon from '@mui/icons-material/Close';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllVideoLibrary, updateVideoLibrary } from '../../Lib/VideoLibrarysApi';
import { useVideoLibrarySection } from '../../Context/VideoLibraryDetails';


const EditVideoLibrary = ({ openVideoLibraryEdit, handleCloseVideoLibraryEdit }) => {
    const { editData, setEditData } = useAddProject();
    const { setVideoLibraryData, page, rowsPerPage, searchQuery } = useVideoLibrarySection()

    const [loader, setLoader] = useState(false);

    // Fields from the response
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [text, setText] = useState('')
    const [isActive, setIsActive] = useState(true);
    const [errors, setErrors] = useState({
        title: '',
        link: '',
    });

    useEffect(() => {
        setTitle(editData?.title || '');
        setLink(editData?.link || '');
        setText(editData?.text || '')
        setIsActive(editData?.isActive ?? true);
    }, [editData]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.title]: '' })); // Clear error for the field
    };

    const handleCancelVideoLibrary = () => {
        handleCloseVideoLibraryEdit();
    };

    const fetchVideoLibrary = async () => {
        let response = await getAllVideoLibrary({ page, search: searchQuery, limit: rowsPerPage });
        setVideoLibraryData(response?.videos || []);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!title?.trim()) newErrors.title = 'Title is required';
        if (!link?.trim()) newErrors.link = 'Link is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleUpdateVideoLibrary = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await updateVideoLibrary({
                title,
                link,
                text,
                isActive,
                videoLibraryId: editData?._id
            });

            if (response.type === "success") {
                setLoader(false);
                fetchVideoLibrary();
                setTimeout(() => {
                    handleModelClose();
                    Alert('Success', 'Video Library Updated successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleModelClose();
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
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
        setIsActive(true);
        setErrors({});
    }

    const handleModelClose = () => {
        handleCloseVideoLibraryEdit()
        setEditData()
        resetForm()
    }

    return (
        <div>
            <Modal
                open={openVideoLibraryEdit}
                onClose={handleModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="CreateCommonHeading">
                            Edit VideoLibrary
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleModelClose()} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        Video-Library Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Title
                            </Typography>
                            <TextField
                                name='title'
                                id="standard-required"
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

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Is Active
                            </Typography>
                            <Select
                                value={isActive ? 'Yes' : 'No'}
                                onChange={(e) => setIsActive(e.target.value === 'Yes')}
                                className="CreateCommonInputFiled"
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
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
                            onClick={handleUpdateVideoLibrary}
                            disabled={loader}
                        >
                            {loader ? 'Updating...' : 'Update VideoLibrary'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditVideoLibrary;
