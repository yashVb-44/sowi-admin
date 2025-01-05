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
import { useAddProject } from '../../AdminContext/AddProjectContext';
import AsyncTextRenderer from '../../Context/AsyncTextRenderer';
import { useLanguage } from '../../Context/LanguageContext';
import { fetchTranslations } from '../../Lib/ApiCaller';
import { translateText } from '../../Lib/Language';


const AddProjectFarsi = ({ openModalFarsi, handleCloseFarsi, handleClose }) => {

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState('');
    const [showAddNew, setShowAddNew] = useState(false)
    const { projectData, setProjectData } = useAdminSection()
    const { verificationData, verificationDataFarsi } = useProjectList()

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
        verification,
        setVerification,

        projectNameFarsi,
        setProjectNameFarsi,
        amountFarsi,
        setAmountFarsi,
        categoryFarsi,
        setCategoryFarsi,
        categoryDataFarsi,
        setCategoryDataFarsi,
        descriptionFarsi,
        setDescriptionFarsi,
        organisationNameFarsi,
        setOrganisationNameFarsi,
        organiserNameFarsi,
        setOrganiserNameFarsi,
        emailFarsi,
        setEmailFarsi,
        setAccountHolderNameFarsi,
        contactNumberFarsi,
        setContactNumberFarsi,
        verificationFarsi,
        setVerificationFarsi, } = useAddProject()

    const [multipleCategory, setMultipleCategory] = useState([])

    const handleChange = (e, setter) => {
        const value = e.target.value;
        const numberRegex = /^\d*$/;

        if (setter === setAmountFarsi) {
            if (numberRegex.test(value)) {
                setter(value);
            }
        } else {
            setter(value);
        }
    };

    const fetchCategory = async () => {
        let response = await getCategory();
        // Extract only the 'fa' part from each category object
        const faCategories = response?.categories?.map(cat => cat.fa) || [];
        // console.log(JSON.stringify(faCategories))
        setCategoryDataFarsi(faCategories);
    }

    const handleClear = () => {
        setFile(null)
        setFilePreview()
        setProjectNameFarsi()
        setAmountFarsi()
        setCategoryFarsi()
        setDescriptionFarsi()
        setOrganisationNameFarsi()
        setOrganiserNameFarsi()
        setEmailFarsi()
        setAccountHolderNameFarsi()
        setContactNumberFarsi()
        setProjectName()
        setAmount()
        setCategory()
        setDescription()
        setOrganisationName()
        setOrganiserName()
        setEmail()
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchProject = async () => {
        let response = await getAllProject()
        setProjectData(response?.data)
    }

    const [errors, setErrors] = useState({
        projectNameFarsi: '',
        amountFarsi: '',
        categoryFarsi: '',
        descriptionFarsi: '',
        organisationNameFarsi: '',
        organiserNameFarsi: '',
        emailFarsi: '',
        file: '',
    });

    const handleAddProject = async () => {
        let valid = true;

        let newErrors = {
            projectNameFarsi: '', amount: '',
            category: '', descriptionFarsi: '',
            organisationNameFarsi: '', organiserNameFarsi: '',
            emailFarsi: '', verification: '', file: ''
        };

        if (!projectNameFarsi) {
            newErrors.projectNameFarsi = 'Project Name is required';
            valid = false;
        }
        if (!amount) {
            newErrors.amount = 'amount is required';
            valid = false;
        }
        if (!category) {
            newErrors.category = 'category is required';
            valid = false;
        }
        if (!descriptionFarsi) {
            newErrors.descriptionFarsi = 'descriptionFarsi is required';
            valid = false;
        }
        if (!organisationNameFarsi) {
            newErrors.organisationNameFarsi = 'Organisation Name is required';
            valid = false;
        }
        if (!organiserNameFarsi) {
            newErrors.organiserNameFarsi = 'Organiser Name is required';
            valid = false;
        }
        if (!emailFarsi) {
            newErrors.emailFarsi = 'emailFarsi is required';
            valid = false;
        }
        if (!verification) {
            newErrors.verification = 'Project verification is required';
            valid = false;
        }
        if (!file) {
            newErrors.file = 'Image is required';
            valid = false;
        }
        setErrors(newErrors);

        if (!valid) return;

        setLoader(true)
        let response = await createProject(projectName, projectNameFarsi, amount, multipleCategory, description, descriptionFarsi, organisationName, organisationNameFarsi, organiserName, organiserNameFarsi, email, emailFarsi, file, verification.code)
        try {
            if (response.statusCode === 200) {
                fetchProject()
                setTimeout(() => {
                    setLoader(false)
                    handleCloseFarsi()
                    handleClose()
                    handleClear()
                    Alert('Success', `${response.message}`, 'success')
                }, 2000);
            }
            else {
                setLoader(false)
                handleCloseFarsi()
                handleClose()
                handleClear()
                Alert('Info', `${response.message}`, 'info')
            }

        } catch (error) {
            setLoader(false)
            handleClear()
            handleCloseFarsi()
            handleClose()
            Alert('Info', `Unable to process your request, Please try later`, 'info')

        }

    }

    const handleCancelProject = () => {
        handleCloseFarsi()
        handleClose()
        handleClear()
    }

    const { selectedLanguage } = useLanguage()



    useEffect(() => {
        translateText(projectName, setProjectNameFarsi, selectedLanguage);
        translateText(description, setDescriptionFarsi, selectedLanguage);
        translateText(organisationName, setOrganisationNameFarsi, selectedLanguage);
        translateText(organiserName, setOrganiserNameFarsi, selectedLanguage);
        translateText(email, setEmailFarsi, selectedLanguage);

        if (verification === 'Green') {
            setVerificationFarsi(verificationDataFarsi[0])
        }
        else if (verification === 'Red') {
            setVerificationFarsi(verificationDataFarsi[1])
        }
        else {
            setVerificationFarsi(verificationDataFarsi[2])
        }

        if (Array.isArray(category)) {
            const newCategoryFarsi = category.map(cat => {
                return categoryDataFarsi.find(farsiCat => farsiCat._id === cat._id);
            }).filter(Boolean); // Remove undefined values
        
            setCategoryFarsi(newCategoryFarsi);
            const categoryId = category.map(cat => cat?._id).filter(Boolean);
            setMultipleCategory(categoryId);
        } 
        
    }, [projectName, description, organisationName, organiserName, email, verification, selectedLanguage, categoryData, category, categoryFarsi]);


    return (
        <div>
            <Modal
                open={openModalFarsi}
                onClose={handleCloseFarsi}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-descriptionFarsi"
            >
                <Box className='AddProjectModal'>
                    <Stack className='AddProjectDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AddProjectHeading'>
                            اضافه کردن پروژه
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseFarsi()} className='AddProjectCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>

                    <Typography id="modal-modal-title" variant="h6" component="h2" className='AddProjectHeadingTwo'>
                        جزئیات پروژه :
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }} >
                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                نام پروژه
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder="نام پروژه خود را وارد کنید"
                                variant="standard"
                                className="AddProjectInputFiled"
                                value={projectNameFarsi}
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => handleChange(e, setProjectNameFarsi)}
                                autoComplete="off"
                                error={!!errors.projectNameFarsi}
                            />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                مقدار هدف
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='مقدار را وارد کنید'
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
                                دسته بندی
                            </Typography>
                            <Autocomplete
                                multiple
                                disabled
                                value={categoryFarsi}
                                // onChange={(event, newValue) => setCategoryFarsi(Array.isArray(newValue) ? newValue : [])}
                                options={categoryDataFarsi}
                                getOptionLabel={(option) => option.title}
                                isOptionEqualToValue={(option, value) => option?._id === value?._id}
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
                            تایید
                        </Typography>
                        <Autocomplete
                            value={verificationFarsi}
                            onChange={(event, newValue) => setVerificationFarsi(newValue)}
                            options={verificationDataFarsi}
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
                                شرح
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='توضیحات را وارد کنید'
                                variant="standard"
                                className='AddProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                multiline
                                rows={6}
                                inputProps={{ cols: 3 }}
                                value={descriptionFarsi}
                                onChange={(e) => handleChange(e, setDescriptionFarsi)}
                                autoComplete='off'
                                error={!!errors.descriptionFarsi}
                                helperText={errors.descriptionFarsi}
                            />
                        </Grid>
                    </Grid>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='AddProjectHeadingTwo'>
                        جزئیات سازمان :
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }} >
                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                نام سازمان
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام سازمان را وارد کنید'
                                variant="standard"
                                className='AddProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={organisationNameFarsi}
                                onChange={(e) => handleChange(e, setOrganisationNameFarsi)}
                                autoComplete='off'
                                error={!!errors.organisationNameFarsi}
                                helperText={errors.organisationNameFarsi}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                نام سازمان دهنده
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام سازمان دهنده را وارد کنید'
                                variant="standard"
                                className='AddProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={organiserNameFarsi}
                                onChange={(e) => handleChange(e, setOrganiserNameFarsi)}
                                autoComplete='off'
                                error={!!errors.organiserNameFarsi}
                                helperText={errors.organiserNameFarsi}
                            />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                مخاطب
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='آدرس پست الکترونیکی را وارد کنید'
                                variant="standard"
                                className='AddProjectInputFiled'
                                value={emailFarsi}
                                onChange={(e) => handleChange(e, setEmailFarsi)}
                                type='emailFarsi'
                                autoComplete='off'
                                error={!!errors.emailFarsi}
                                helperText={errors.emailFarsi}
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
                        <Grid xs={12} md={12} lg={12}>

                            <Typography id="modal-modal-title" variant="h6" component="h2" className='AddProjectHeadingTwo' sx={{ height: '20px' }}>
                                Media ( رسانه ها)
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                Upload Image (آپلود تصویر)
                            </Typography>


                            {!file &&
                                <Stack {...getRootProps()} className='FileUpload'>
                                    <input {...getInputProps()}
                                    />
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
                                                    <Typography>or </Typography>
                                                    <Stack className='FileUploadDotted'></Stack>
                                                </Stack>
                                                <Button
                                                    variant="contained"
                                                    className='FileUploadButton'
                                                    onClick={open} // Use the open method from useDropzone
                                                >
                                                    Browse file
                                                </Button>
                                                {errors.file && (
                                                    <p style={{ color: 'red', display: 'flex', justifyContent: 'center', fontSize: '12px', marginTop: '4%' }}>
                                                        {errors.file}
                                                    </p>
                                                )}
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

                        </Grid>
                        <Grid xs={12} md={12} lg={12} className='AddProjectBtn'>
                            <Stack className='AddProjectBtn'>
                                <Stack className='AddProjectButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='FormCancelButtonAddProject'
                                        onClick={() => handleCancelProject()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='FormSubmitButtonAddProject'
                                        onClick={() => handleAddProject()}
                                    >
                                        Add
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />

        </div >
    )
}

export default AddProjectFarsi
