import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png';
import Loader from '../../../Common/Loader';
import CloudImage from '../../../Assets/AdminImages/CloudImgae.png';
import { addTeamMember } from '../../../Lib/AboutContent';
import { Alert } from '../../../Common/Alert';
import { useContent } from '../../../Context/ContentContext';
import { useDropzone } from 'react-dropzone';
import { useAddTeam } from '../../../AdminContext/AddTeamContext';
import { translateText } from '../../../Lib/Language';

const AddTeamFarsi = ({ openTeamFarsi, handleCloseTeamFarsi, handleCloseAddTeam }) => {
    const { fetchTeam } = useContent();
    const [loader, setLoader] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const { name, setName, designation, setDesignation, description, setDescription,
        nameFarsi, setNameFarsi, designationFarsi, setDesignationFarsi, descriptionFarsi, setDescriptionFarsi } = useAddTeam()

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleResetUpload = () => {
        setFileData(null);
        setFilePreview(null);
    };


    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        handleFileSelection(selectedFile);
    }, []);

    const handleFileSelection = (selectedFile) => {
        if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setFileData(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
        } else {
            alert('Only JPG and PNG files are allowed.');
        }
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxSize: 10485760, // 10MB
        noClick: true, // Disable the default click behavior
    });

    const handleClear = () => {
        setName('')
        setDescription('')
        setDesignation('')
        setNameFarsi('')
        setDescriptionFarsi('')
        setDesignationFarsi('')
        setFileData(null)
        setFilePreview(null)
    }

    const [errors, setErrors] = useState({
        name: '',
        designation: '',
        description: '',
        nameFarsi: '',
        designationFarsi: '',
        descriptionFarsi: '',
        fileData: '',
    });

    const addTeam = async () => {
        let valid = true;
        let newErrors = {
            name: '',
            designation: '',
            description: '',
            nameFarsi: '',
            designationFarsi: '',
            descriptionFarsi: '',
            fileData: '',
        };

        if (!name) {
            newErrors.nameFarsi = 'Name is required';
            valid = false;
        }
        if (!designation) {
            newErrors.designationFarsi = 'Designation is required';
            valid = false;
        }
        if (!description) {
            newErrors.descriptionFarsi = 'Description is required';
            valid = false;
        }
        if (!nameFarsi) {
            newErrors.nameFarsi = 'Name is required';
            valid = false;
        }
        if (!designationFarsi) {
            newErrors.designationFarsi = 'Designation is required';
            valid = false;
        }
        if (!descriptionFarsi) {
            newErrors.descriptionFarsi = 'Description is required';
            valid = false;
        }
        if (!fileData) {
            newErrors.fileData = 'Image is required';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        setLoader(true);
        let response = await addTeamMember(name, designation, description, fileData, nameFarsi, designationFarsi, descriptionFarsi);
        try {
            if (response.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false);
                    Alert('Success', response?.message, 'success');
                    fetchTeam();
                    handleCloseTeamFarsi();
                    handleCloseAddTeam();
                    handleClear();
                }, 2000);
            } else {
                setLoader(false);
                Alert('Info', response.message, 'info');
                handleCloseTeamFarsi();
                handleCloseAddTeam();
                handleClear();
            }
        } catch (error) {
            setLoader(false);
            Alert('Error', 'Failed to add team member. Please try again later.', 'error');
            handleCloseTeamFarsi();
            handleCloseAddTeam();
            handleClear();
        }
    };

    useEffect(() => {
        translateText(name, setNameFarsi);
        translateText(designation, setDesignationFarsi);
        translateText(description, setDescriptionFarsi);
    }, [name, designation, description])

    return (
        <div>
            <Modal
                open={openTeamFarsi}
                onClose={handleCloseTeamFarsi}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='AboutContentModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            Team Add
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseTeamFarsi} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>

                    <Stack className='BorderLine'></Stack>
                    <Stack>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeadingTwo'>
                            Add Team Member
                        </Typography>
                    </Stack>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter name'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={name}
                                onChange={(e) => handleChange(e, setName)}
                                autoComplete='off'
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                Designation
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter designation'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={designation}
                                onChange={(e) => handleChange(e, setDesignation)}
                                autoComplete='off'
                                error={!!errors.designation}
                                helperText={errors.designation}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                Description
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter description'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={description}
                                onChange={(e) => handleChange(e, setDescription)}
                                autoComplete='off'
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                        </Grid>
                    </Grid>
                    <Stack className='BorderBottom'></Stack>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                نام
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام را وارد کنید'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={nameFarsi}
                                onChange={(e) => handleChange(e, setNameFarsi)}
                                autoComplete='off'
                                error={!!errors.nameFarsi}
                                helperText={errors.nameFarsi}
                            />
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                تعیین
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام گذاری را وارد کنید'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={designationFarsi}
                                onChange={(e) => handleChange(e, setDesignationFarsi)}
                                autoComplete='off'
                                error={!!errors.designationFarsi}
                                helperText={errors.designationFarsi}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                شرح
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='توضیحات را وارد کنید'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={descriptionFarsi}
                                onChange={(e) => handleChange(e, setDescriptionFarsi)}
                                autoComplete='off'
                                error={!!errors.descriptionFarsi}
                                helperText={errors.descriptionFarsi}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid xs={12} md={12} lg={12}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                Upload Image
                            </Typography>
                            {!filePreview && (
                                <Stack {...getRootProps()} className='FileUpload'>
                                    <input {...getInputProps()} />
                                    <Stack className='FileUploadField'>
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
                                                {errors.fileData &&
                                                    <p style={{display:'flex', justifyContent:'center', marginTop:'4%', color:'red', fontSize:'12px'}}>{errors.fileData}</p>
                                                }
                                            </>
                                        )}
                                    </Stack>
                                </Stack>
                            )}
                            {filePreview && (
                                <Stack className='PreviewUpload'>
                                    <Box className='PreviewUploadImageContainer'>
                                        <img src={filePreview} className='PreviewUploadImage' alt="Preview" />
                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleResetUpload()} className='EditIconAddProject' />
                                    </Box>
                                </Stack>
                            )}
                        </Grid>
                    </Grid>

                    <Stack className='AboutContentFieldCreateBlog'>
                        <Stack className='AboutContentButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='AboutContentFormCancelButton'
                                onClick={handleCloseTeamFarsi}
                            >
                                Cancel
                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='AboutContentFormCreateButton'
                                onClick={addTeam}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default AddTeamFarsi;
