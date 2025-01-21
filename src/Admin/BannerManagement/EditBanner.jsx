import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import './CreateBanner.css';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '../../Assets/AdminImages/EditIcon.png'
import CloudImage from '../../Assets/AdminImages/CloudImgae.png'
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllBanner, updateBanner } from '../../Lib/BannerApi';
import { useBannerSection } from '../../Context/BannerDetails';
import SowiImage from '../../Assets/AdminImages/sowi-img.png';
import NoImage from '../../Assets/AdminImages/no-image-available.png';


const EditBanner = ({ openBannerEdit, handleCloseBannerEdit }) => {
    const { editData, setEditData } = useAddProject();
    const { setBannerData, page, rowsPerPage, searchQuery } = useBannerSection()

    const [loader, setLoader] = useState(false);

    // Fields from the response
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [currentImage, setCurrentImage] = useState(null)
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

    useEffect(() => {
        setName(editData?.name || '');
        setType(editData?.type || ''); // Ensure type is set from editData
        setIsActive(editData?.isActive ?? true);
        setIsDeleted(editData?.isDeleted ?? false);
        setCurrentImage(editData?.image || null);
    }, [editData]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear error for the field
    };

    const handleCancelBanner = () => {
        handleCloseBannerEdit();
    };

    const fetchBanner = async () => {
        let response = await getAllBanner({ page, search: searchQuery, limit: rowsPerPage });
        setBannerData(response?.banners || []);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name?.trim()) newErrors.name = 'Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleUpdateBanner = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await updateBanner({
                name,
                isActive,
                isDeleted,
                type,
                bannerImage: file,
                bannerId: editData?._id
            });

            if (response.type === "success") {
                setLoader(false);
                fetchBanner();
                setTimeout(() => {
                    handleModelClose();
                    Alert('Success', 'Banner Updated successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleModelClose()
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleModelClose()
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    const resetForm = () => {
        setName('');
        setType(''); // Ensure type is set from editData
        setIsActive(true);
        setIsDeleted(false);
        setFile(null);
        setCurrentImage(null)
        setFilePreview(null)
        setErrors({});
    }

    const handleModelClose = () => {
        handleCloseBannerEdit()
        setEditData()
        resetForm()
    }

    return (
        <div>
            <Modal
                open={openBannerEdit}
                onClose={handleModelClose}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Edit Banner
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleModelClose()} className="CreateCommonCloseIcon" />
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
                                id="standard-required"
                                placeholder="Enter name"
                                name='name'
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
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Is Deleted
                            </Typography>
                            <Select
                                value={isDeleted ? 'Yes' : 'No'}
                                onChange={(e) => setIsDeleted(e.target.value === 'Yes')}
                                className="CreateCommonInputFiled"
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container>
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
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Current Banner Image
                            </Typography>
                            <Box
                                {...getRootProps()}
                                className={`CreateUserDropzone ${isDragActive ? "active" : ""}`}
                            >
                                {currentImage ? (
                                    <img
                                        src={currentImage}
                                        alt="Profile Preview"
                                        className="CreateUserImagePreview"
                                        onError={(e) => e.target.src = SowiImage}
                                        height={150}
                                        width={250}

                                    />
                                ) : (
                                    <img src={NoImage} alt="Default Image" className="CreateUserImagePreview" />
                                )}

                                {/* <input {...getInputProps()} /> */}
                            </Box>
                        </Grid>
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
                            onClick={handleUpdateBanner}
                            disabled={loader}
                        >
                            {loader ? 'Updating...' : 'Update Banner'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditBanner;
