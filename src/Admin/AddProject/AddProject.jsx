import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Stack, Grid, TextField, Select, MenuItem, InputAdornment, Button, Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './AddProject.css'
import { AttachMoney } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudImage from '../../Assets/AdminImages/CloudImgae.png'
import { useDropzone } from 'react-dropzone';
import EditIcon from '../../Assets/AdminImages/EditIcon.png'
import AddIcon from '@mui/icons-material/Add';
import { createProject, getAllProject } from '../../Lib/ProjectApi';
import { Alert } from '../../Common/Alert';
import { getCategory } from '../../Lib/CategoryApi';
import { getBank } from '../../Lib/BankApi';
import Loader from '../../Common/Loader';
import { useAdminSection } from '../../Context/AdminSectionContext';
import { useProjectList } from '../../Context/ProjectListContext';
import AddProjectFarsi from './AddProjectFarsi';
import { useAddProject } from '../../AdminContext/AddProjectContext';


const AddProject = ({ openModal, handleClose }) => {

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState('');
    const [showAddNew, setShowAddNew] = useState(false)
    const { projectData, setProjectData } = useAdminSection()
    const { verificationData } = useProjectList()

    const [loader, setLoader] = useState(false)

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
        } else {
            Alert('Error', 'Only JPG and PNG files are allowed.', 'error');
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxSize: 10485760, // 10MB
        noClick: true, // Disable the default click behavior
    });

    const handleResetUpload = () => {
        setFile(null)
        setFilePreview(null)
    }

    const {
        projectName,
        setProjectName,
        amount,
        setAmount,
        category,
        setCategory,
        categoryData,
        setCategoryData,
        description,
        setDescription,
        organisationName,
        setOrganisationName,
        organiserName,
        setOrganiserName,
        email,
        setEmail,
        paymentMethod,
        setPaymentMethod,
        accountNumber,
        setAccountNumber,
        accountHolderName,
        setAccountHolderName,
        contactNumber,
        setContactNumber,
        verification,
        setVerification, } = useAddProject()

    const [errors, setErrors] = useState({
        projectName: '',
        amount: '',
        category: '',
        description: '',
        organisationName: '',
        organiserName: '',
        email: '',
        file: '',
    });


    const handleChange = (e, setter) => {


        const value = e.target.value;
        const numberRegex = /^\d*$/;

        if (setter === setAmount) {
            if (numberRegex.test(value)) {
                setter(value);
            }
        } else {
            setter(value);
        }
    };


    const fetchCategory = async () => {
        let response = await getCategory();
        // Extract only the 'en' part from each category object
        const enCategories = response?.categories?.map(cat => cat?.en) || [];
        setCategoryData(enCategories);
        setCategory((enCategories[0]));
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchProject = async () => {
        let response = await getAllProject()
        setProjectData(response?.data)
    }

    const handleAddProject = async () => {
        let valid = true;
        let newErrors = {
            projectName: '',
            amount: '',
            category: '',
            description: '',
            organisationName: '',
            organiserName: '',
            email: '',
            verification: '',
            file: ''
        };

        if (!projectName) {
            newErrors.projectName = 'Project Name is required';
            valid = false;
        }
        if (!amount) {
            newErrors.amount = 'Amount is required';
            valid = false;
        }
        if (!category) {
            newErrors.category = 'Category is required';
            valid = false;
        }
        if (!description) {
            newErrors.description = 'Description is required';
            valid = false;
        }
        if (!organisationName) {
            newErrors.organisationName = 'Organisation Name is required';
            valid = false;
        }
        if (!organiserName) {
            newErrors.organiserName = 'Organiser Name is required';
            valid = false;
        }
        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        }
        if (!verification) {
            newErrors.verification = 'Project Verification is required';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        handleOpenFarsi();
    }

    const handleCancelProject = () => {
        handleClose()
    }

    const [openModalFarsi, setOpenModalFarsi] = useState(false);
    const handleOpenFarsi = () => setOpenModalFarsi(true);
    const handleCloseFarsi = () => setOpenModalFarsi(false);

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='AddProjectModal'>
                    <Stack className='AddProjectDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AddProjectHeading'>
                            Add Project
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleClose()} className='AddProjectCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>

                    <Typography id="modal-modal-title" variant="h6" component="h2" className='AddProjectHeadingTwo'>
                        Project Details :
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }} >
                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Project Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your project name'
                                variant="standard"
                                value={projectName}
                                className='AddProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => handleChange(e, setProjectName)}
                                autoComplete='off'
                                error={!!errors.projectName}
                                helperText={errors.projectName}
                            />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Target Amount
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter amount'
                                variant="standard"
                                className='AddProjectInputFiled'
                                value={amount}
                                onChange={(e) => handleChange(e, setAmount)}
                                type='text' // Use 'text' to allow regex validation
                                autoComplete='off'
                                error={!!errors.amount}
                                helperText={errors.amount}
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoney />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Category
                            </Typography>
                            <Autocomplete
                                multiple
                                // value={category}
                                onChange={(event, newValue) => setCategory(Array.isArray(newValue) ? newValue : [])}
                                options={categoryData}
                                getOptionLabel={(option) => option.title}
                                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                                // defaultValue={[category]}
                                placeholder="Select Category"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        className="AddProjectInputFiledTwo"
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                        <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                            Verification
                        </Typography>
                        <Autocomplete
                            value={verification}
                            onChange={(event, newValue) => setVerification(newValue)}
                            options={verificationData}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option?.name === value?.name}
                            error={!!errors.verification}
                            helperText={errors.verification}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    className={`AddProjectInputFiledTwo`}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },

                                    }}

                                />
                            )}
                        />
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Description
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter description'
                                variant="standard"
                                className='AddProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                multiline
                                rows={6}
                                inputProps={{ cols: 3 }}
                                onChange={(e) => handleChange(e, setDescription)}
                                autoComplete='off'
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                        </Grid>
                    </Grid>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='AddProjectHeadingTwo'>
                        Organisation Details :
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }} >
                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Organisation Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter organisation name'
                                variant="standard"
                                className='AddProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => handleChange(e, setOrganisationName)}
                                autoComplete='off'
                                error={!!errors.organisationName}
                                helperText={errors.organisationName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Organiser Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter organiser name'
                                variant="standard"
                                className='AddProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => handleChange(e, setOrganiserName)}
                                autoComplete='off'
                                error={!!errors.organiserName}
                                helperText={errors.organiserName}
                            />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Contact
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter mail address'
                                variant="standard"
                                className='AddProjectInputFiled'
                                onChange={(e) => handleChange(e, setEmail)}
                                type='email'
                                autoComplete='off'
                                error={!!errors.email}
                                helperText={errors.email}
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>


                    <Grid container>
                        {/* <Grid xs={12} md={12} lg={12}>

                            <Typography id="modal-modal-title" variant="h6" component="h2" className='AddProjectHeadingTwo' sx={{ height: '20px' }}>
                                Media
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Upload Image
                            </Typography>


                            {!file &&
                                <Stack {...getRootProps()} className='FileUpload'>
                                    <input {...getInputProps()} />
                                    < Stack className='FileUploadField'>
                                        <img src={CloudImage} alt='Cloud Image'

                                        />
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
                            {file && (
                                <Stack className='PreviewUpload'>
                                    <Box className='PreviewUploadImageContainer'>
                                        <img src={filePreview} className='PreviewUploadImage' alt="Preview" />
                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleResetUpload()} className='EditIconAddProject' />
                                    </Box>
                                </Stack>

                            )}

                        </Grid> */}
                        <Grid xs={12} md={12} lg={12} className='AddProjectBtn'>
                            <Stack className='AddProjectBtn'>
                                <Stack className='AddProjectButtonFormSubmit'>
                                    {/* <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='FormCancelButtonAddProject'
                                        onClick={() => handleCancelProject()}
                                    >
                                        Cancel
                                    </Button> */}
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='FormSubmitButtonAddProject'
                                        onClick={() => handleAddProject()}
                                    >
                                        Continue
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
            <AddProjectFarsi openModalFarsi={openModalFarsi} handleCloseFarsi={handleCloseFarsi} handleClose={handleClose} />

        </div >
    )
}

export default AddProject
