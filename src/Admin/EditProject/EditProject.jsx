import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Stack, Grid, TextField, Autocomplete, InputAdornment, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './EditProject.css'
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
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { getCategory } from '../../Lib/CategoryApi';
import { editProject, getAllProject } from '../../Lib/ProjectApi';
import { getBank } from '../../Lib/BankApi';
import AddIcon from '@mui/icons-material/Add';
import { Alert } from '../../Common/Alert';
import Loader from '../../Common/Loader';
import { useAdminSection } from '../../Context/AdminSectionContext';
import { makeStyles } from '@mui/styles';
import { useProjectList } from '../../Context/ProjectListContext';

const useStyles = makeStyles({
    hiddenPagination: {
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
            height: '1.1rem'
        },
    }
});

const EditProject = ({ openEdit, handleCloseEdit }) => {

    const { editData } = useAddProject()
    const { setProjectData } = useAdminSection()
    const { verificationData, verificationDataFarsi } = useProjectList()

    const [projectName, setProjectName] = useState('')
    const [category, setCategory] = useState([])
    const [targetAmt, setTargetAmt] = useState('')
    const [description, setDescription] = useState('')
    const [organisationName, setOrganisationName] = useState('')
    const [organiserName, setOrganiserName] = useState('')
    const [email, setEmail] = useState('')
    const [verification, setVerification] = useState()
    const [categoryData, setCategoryData] = useState([])

    const [projectNameFarsi, setProjectNameFarsi] = useState('')
    const [categoryFarsi, setCategoryFarsi] = useState(null)
    const [targetAmtFarsi, setTargetAmtFarsi] = useState('')
    const [descriptionFarsi, setDescriptionFarsi] = useState('')
    const [organisationNameFarsi, setOrganisationNameFarsi] = useState('')
    const [organiserNameFarsi, setOrganiserNameFarsi] = useState('')
    const [emailFarsi, setEmailFarsi] = useState('')
    const [verificationFarsi, setVerificationFarsi] = useState()
    const [categoryDataFarsi, setCategoryDataFarsi] = useState([])

    const [file, setFile] = useState(null)
    const [filePreviewImage, setFilePreviewImage] = useState(null)

    const [error, setError] = useState('')

    const [loader, setLoader] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState([])

    useEffect(() => {
        setProjectName(editData?.en?.title || '')
        setTargetAmt(editData?.en?.goalAmount || '')
        setDescription(editData?.en?.description || '')
        setOrganisationName(editData?.en?.organisationName || '')
        setOrganiserName(editData?.en?.organiserName || '')
        setEmail(editData?.en?.email || '')
        setFilePreviewImage(editData?.en?.documentUrl || '')

        setProjectNameFarsi(editData?.fa?.title || '')
        setTargetAmtFarsi(editData?.fa?.goalAmount || '')
        setDescriptionFarsi(editData?.fa?.description || '')
        setOrganisationNameFarsi(editData?.fa?.organisationName || '')
        setOrganiserNameFarsi(editData?.fa?.organiserName || '')
        setEmailFarsi(editData?.fa?.email || '')

        // for verification of project
        let verDat = verificationData.filter(data => data.code === editData?.en?.verification)
        setVerification(verDat[0] || '')
        let verDatFarsi = verificationDataFarsi.filter(data => data.code === editData?.fa?.verification)
        setVerificationFarsi(verDatFarsi[0] || '')
    }, [editData])

    const fetchCategory = async () => {
        let response = await getCategory();
        // Extract only the 'en' part from each category object
        const enCategories = response?.categories?.map(cat => cat.en);
        setCategoryData(enCategories || []);
        const faCategories = response?.categories?.map(cat => cat.fa);
        setCategoryDataFarsi(faCategories || []);

        if (Array.isArray(enCategories)) {
            const newCategoryFarsi = enCategories.filter(cat =>
                editData?.en?.categoryId.some(enCat => enCat._id === cat._id)
            );
            setCategory(newCategoryFarsi)
        }
        if (Array.isArray(faCategories)) {
            const newCategoryFarsi = faCategories.filter(cat =>
                editData?.fa?.categoryId.some(faCat => faCat._id === cat._id)
            );
            setCategoryFarsi(newCategoryFarsi)
        }
    };

    // console.log(category)
    useEffect(() => {
        if (Array?.isArray(categoryDataFarsi)) {
            const newCategoryFarsi = categoryDataFarsi?.filter(cat =>
                category?.some(faCat => faCat?._id === cat?._id)
            );
            setCategoryFarsi(newCategoryFarsi)
        }
    }, [category])

    useEffect(() => {
        fetchCategory()
    }, [editData,])

    const handleChange = (e, setter) => {
        const value = e.target.value;
        const numberRegex = /^\d*$/;

        if (setter === setTargetAmt) {
            if (numberRegex.test(value)) {
                setter(value);
            }
        } else {
            setter(value);
        }
    };


    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setFile(selectedFile);
            setFilePreviewImage(URL.createObjectURL(selectedFile));
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
        setFilePreviewImage(null)
    }

    const handleClear = () => {
        setFile(null)
        setFilePreviewImage(null)
        setProjectName(null)
        setTargetAmt(null)
        setCategory(null)
        setDescription(null)
        setOrganisationName(null)
        setOrganiserName(null)
        setEmail(null)
    }
    const fetchProject = async () => {
        let response = await getAllProject()
        setProjectData(response?.data)
    }


    const [errors, setErrors] = useState({
        projectName: '',
        targetAmt: '',
        category: '',
        description: '',
        organisationName: '',
        organiserName: '',
        email: '',
        file: '',
    });
    const handleEditProject = async () => {
        setLoader(true)
        const categoryId = category.map(cat => cat?._id).filter(Boolean);
        let response = await editProject(
            projectName,
            projectNameFarsi,
            targetAmt,
            categoryId,
            description,
            descriptionFarsi,
            organisationName,
            organisationNameFarsi,
            organiserName,
            organiserNameFarsi,
            email,
            emailFarsi,
            file,
            editData?._id,
            verification?.code,
            "active"
        )

        try {
            if (response?.statusCode === 200) {
                fetchProject()
                setTimeout(() => {
                    setLoader(false)
                    Alert('Success', `${response.message}`, 'success')
                    handleCloseEdit()
                    handleClear()
                }, 2000);
            }
            else {
                Alert('Info', `${response.message}`, 'info')
                handleCloseEdit()
                handleClear()
                setLoader(false)
            }

        } catch (error) {
            Alert('Info', `Unable to process your request, Please try later.`, 'info')
            setLoader(false)
            handleCloseEdit()
            handleClear()
        }
    }

    const handleCancelProject = () => {
        handleCloseEdit()
    }

    return (
        <div>
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='EditProjectModal'>
                    <Stack className='EditProjectDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='EditProjectHeading'>
                            Edit Project
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseEdit()} className='EditProjectCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='EditProjectHeadingTwo'>
                        Project Details (جزئیات پروژه) :
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                Project Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your project name'
                                variant="standard"
                                className='EditProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={projectName}
                                onChange={(e) => handleChange(e, setProjectName)}
                                autoComplete='off'
                                error={!!errors.projectName}
                                helperText={errors.projectName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                Target Amount
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter amount'
                                variant="standard"
                                onChange={(e) => handleChange(e, setTargetAmt)}
                                className='EditProjectInputFiled'
                                type='text'
                                autoComplete='off'
                                error={!!errors.targetAmt}
                                helperText={errors.targetAmt}
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoney />
                                        </InputAdornment>
                                    ),
                                }}
                                value={targetAmt}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                Category
                            </Typography>
                            {category &&
                                <Autocomplete
                                    value={category}
                                    multiple
                                    onChange={(event, newValue) => setCategory(newValue)}
                                    options={categoryData}
                                    getOptionLabel={(option) => option?.title}
                                    isOptionEqualToValue={(option, value) => option?._id === value?._id}
                                    error={!!errors.category}
                                    helperText={errors.category}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            className={` EditProjectInputFiledTwo`}
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                                '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                                    height: '1.1rem'
                                                },
                                            }}
                                        />
                                    )}
                                />
                            }
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                نام پروژه
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام پروژه خود را وارد کنید'
                                variant="standard"
                                className='EditProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={projectNameFarsi}
                                onChange={(e) => handleChange(e, setProjectNameFarsi)}
                                autoComplete='off'
                                error={!!errors.projectName}
                                helperText={errors.projectName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                مقدار هدف
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='مقدار را وارد کنید'
                                variant="standard"
                                onChange={(e) => handleChange(e, setTargetAmt)}
                                className='EditProjectInputFiled'
                                type='text'
                                autoComplete='off'
                                error={!!errors.targetAmt}
                                helperText={errors.targetAmt}
                                disabled
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoney />
                                        </InputAdornment>
                                    ),
                                }}
                                value={targetAmt}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                دسته بندی
                            </Typography>
                            <Autocomplete
                                value={categoryFarsi}
                                multiple
                                onChange={(event, newValue) => setCategoryFarsi(newValue)}
                                options={categoryDataFarsi}
                                getOptionLabel={(option) => option.title}
                                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                                error={!!errors.categoryFarsi}
                                helperText={errors.categoryFarsi}
                                disabled
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        className={` EditProjectInputFiledTwo`}
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                                height: '1.1rem'
                                            },
                                        }}

                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Stack className='BorderBottom'></Stack>

                    <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                        <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
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
                                    className={`EditProjectInputFiledTwo`}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },

                                    }}

                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                        <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                            تایید
                        </Typography>
                        <Autocomplete
                            value={verificationFarsi}
                            onChange={(event, newValue) => setVerificationFarsi(newValue)}
                            options={verificationDataFarsi}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option?.name === value?.name}
                            error={!!errors.verificationFarsi}
                            helperText={errors.verificationFarsi}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    className={`EditProjectInputFiledTwo`}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },

                                    }}

                                />
                            )}
                        />
                    </Grid>
                    <Stack className='BorderBottom'></Stack>

                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                Description
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter description'
                                variant="standard"
                                className='EditProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                multiline
                                rows={6}
                                inputProps={{ cols: 3 }}
                                value={description}
                                onChange={(e) => handleChange(e, setDescription)}
                                autoComplete='off'
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                شرح
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='توضیحات را وارد کنید'
                                variant="standard"
                                className='EditProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                multiline
                                rows={6}
                                inputProps={{ cols: 3 }}
                                value={descriptionFarsi}
                                onChange={(e) => handleChange(e, setDescriptionFarsi)}
                                autoComplete='off'
                            />
                        </Grid>
                    </Grid>
                    <Stack className='BorderBottom'></Stack>

                    <Typography id="modal-modal-title" variant="h6" component="h2" className='EditProjectHeadingTwo'>
                        Organisation Details (جزئیات سازمان) :
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                Organisation Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter organisation name'
                                variant="standard"
                                className='EditProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={organisationName}
                                onChange={(e) => handleChange(e, setOrganisationName)}
                                autoComplete='off'
                                error={!!errors.organisationName}
                                helperText={errors.organisationName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                Organiser Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter organisation name'
                                variant="standard"
                                className='EditProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={organiserName}
                                onChange={(e) => handleChange(e, setOrganiserName)}
                                autoComplete='off'
                                error={!!errors.organiserName}
                                helperText={errors.organiserName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                Contact
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter mail address'
                                variant="standard"
                                className='EditProjectInputFiled'
                                type='email'
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
                                value={email}
                                onChange={(e) => handleChange(e, setEmail)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                نام سازمان
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام سازمان را وارد کنید'
                                variant="standard"
                                className='EditProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={organisationNameFarsi}
                                onChange={(e) => handleChange(e, setOrganisationNameFarsi)}
                                autoComplete='off'
                                error={!!errors.organisationNameFA}
                                helperText={errors.organisationName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                نام سازمان دهنده
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام سازمان را وارد کنید'
                                variant="standard"
                                className='EditProjectInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={organiserNameFarsi}
                                onChange={(e) => handleChange(e, setOrganiserNameFarsi)}
                                autoComplete='off'
                                error={!!errors.organiserName}
                                helperText={errors.organiserName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='EditProjectFields'>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                مخاطب
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='آدرس پست الکترونیکی را وارد کنید'
                                variant="standard"
                                className='EditProjectInputFiled'
                                type='email'
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
                                value={emailFarsi}
                                onChange={(e) => handleChange(e, setEmailFarsi)}
                            />
                        </Grid>
                    </Grid>
                    <Stack className='BorderBottom'></Stack>



                    <Grid container>
                        <Grid xs={12} md={12} lg={12}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" className='EditProjectHeadingTwo' sx={{ height: '20px' }}>
                                Media (رسانه ها)
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='EditProjectInputLabel'>
                                Upload Image (آپلود تصویر)
                            </Typography>
                            {!filePreviewImage &&
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
                            {filePreviewImage && (
                                <Stack className='PreviewUpload'>
                                    <Box className='PreviewUploadImageContainer'>
                                        <img src={filePreviewImage} className='PreviewUploadImage' alt="Preview" />
                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleResetUpload()} className='EditIconEditProject' />
                                    </Box>
                                </Stack>
                            )}
                        </Grid>
                    </Grid>
                    <Stack className='FormSubmitFieldEditProject'>
                        <Stack className='EditProjectButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormCancelButtonEditProject'
                                onClick={() => handleCancelProject()}
                            >
                                Cancel
                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormSubmitButtonEditProject'
                                onClick={() => handleEditProject()}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />

        </div>
    )
}

export default EditProject
