import React, { useCallback, useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '../../Common/Alert';
import { addBanner, getAllBanner } from '../../Lib/BannerApi';
import { useBannerSection } from '../../Context/BannerDetails';
import { useDropzone } from 'react-dropzone';
import EditIcon from '../../Assets/AdminImages/EditIcon.png'
import CloudImage from '../../Assets/AdminImages/CloudImgae.png'

const CreateBanner = ({ openBannerCreate, handleCloseBannerCreate }) => {
    const { setBannerData, page, rowsPerPage, searchQuery } = useBannerSection();

    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('0');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({
        name: '',
    });

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
            setError(''); // Clear error
        } else {
            setError('Only JPG and PNG files are allowed.');
        }
    }, []);


    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxSize: 10485760, // 10MB
        noClick: true, // Disable the default click behavior
    });

    const handleResetUpload = () => {
        setFilePreview(null)
    }

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const fetchBanner = async () => {
        let response = await getAllBanner({ page, search: searchQuery, limit: rowsPerPage });
        setBannerData(response?.banners || []);
    };

    const handleCreateBanner = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await addBanner({
                name,
                bannerImage: file,
                type
            });

            if (response.type === 'success') {
                setLoader(false);
                fetchBanner();
                setTimeout(() => {
                    handleModelClose();
                    Alert('Success', 'Banner Created successfully', 'success');
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
        setName('');
        setType('0'); // Ensure type is set from editData
        setFile(null);
        setFilePreview(null)
        setErrors({});
    }

    const handleModelClose = () => {
        handleCloseBannerCreate()
        resetForm()
    }


    return (
        <div>
            <Modal
                open={openBannerCreate}
                onClose={handleModelClose}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Create Banner
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleModelClose} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        Banner Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Name
                            </Typography>
                            <TextField
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={name}
                                onChange={(e) => handleChange(e, setName)}
                                autoComplete="off"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Create For
                            </Typography>
                            <Select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="CreateCommonInputFiled"
                            >
                                <MenuItem value="0">User</MenuItem>
                                <MenuItem value="1">Vendor</MenuItem>
                                <MenuItem value="2">All</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid xs={12} md={12} lg={12}>

                        <Typography id="modal-modal-title" variant="h6" component="h2" className='CreateBlogHeadingTwo' sx={{ height: '20px' }}>
                            Media
                        </Typography>

                        <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                            Upload Banner Image
                        </Typography>

                        {!filePreview &&
                            <Stack {...getRootProps()} className='FileUpload'>
                                <input {...getInputProps()} />
                                < Stack className='FileUploadField'>

                                    <img src={CloudImage} alt='Cloud Image' />
                                    {isDragActive ? (
                                        <Typography variant="body2" color="text.secondary" className='FileUploadHeading'>
                                            Drop the files here ...
                                        </Typography>
                                    ) : (
                                        <>
                                            <Typography variant="body2" color="text.secondary" className='FileUploadHeading'>
                                                Select a file or drag and drop here
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" className='FileUploadPara'>
                                                JPG or PNG file size no more than 10MB
                                            </Typography>
                                            <Stack className='FileUploadDottedLine'>
                                                <Stack className='FileUploadDotted'></Stack>
                                                <Typography>or</Typography>
                                                <Stack className='FileUploadDotted'></Stack>
                                            </Stack>
                                            <Button
                                                variant="contained"
                                                className='FileUploadButton'
                                                onClick={open} // Use the open method from useDropzone
                                            >
                                                Browse file
                                            </Button>
                                        </>
                                    )}
                                </Stack>

                                {error && (
                                    <Box mt={2}>
                                        <Typography variant="body2" color="error">{error}</Typography>
                                    </Box>
                                )}
                            </Stack>
                        }
                        {filePreview && (
                            <Stack className='PreviewUpload'>
                                <Box className='PreviewUploadImageContainer'>
                                    <img src={filePreview} className='PreviewUploadImage' alt="Preview" />
                                    <img src={EditIcon} alt='Edit Icon' onClick={() => handleResetUpload()} className='EditIconCreateBlog' />
                                </Box>
                            </Stack>

                        )}

                    </Grid>

                    <Box sx={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                textTransform: 'none',
                                borderRadius: '4px',
                                padding: '6px 20px',
                            }}
                            onClick={handleCreateBanner}
                            disabled={loader}
                        >
                            {loader ? 'Creating...' : 'Create Banner'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateBanner;
