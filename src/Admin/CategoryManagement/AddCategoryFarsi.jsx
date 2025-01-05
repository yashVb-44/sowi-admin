import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import CloudImage from '../../Assets/AdminImages/CloudImgae.png';
import EditIcon from '../../Assets/AdminImages/EditIcon.png';
import { createCategory, getCategory } from '../../Lib/CategoryApi';
import Loader from '../../Common/Loader';
import { Alert } from '../../Common/Alert';
import './AddCategory.css';
import { useAdminSection } from '../../Context/AdminSectionContext';
import { useAddCategory } from '../../AdminContext/AddCategoryContext';
import { useLanguage } from '../../Context/LanguageContext';
import { translateText } from '../../Lib/Language';

const AddCategoryFarsi = ({ openCategoryFarsi, handleCloseCategoryFarsi, handleCloseCategory }) => {

    const { selectedLanguage } = useLanguage()

    const { catName, setCatName, catTitle, setCatTitle, catDesc, setCatDesc, catNameFarsi, setCatNameFarsi, catTitleFarsi, setCatTitleFarsi,
        catDescFarsi, setCatDescFarsi } = useAddCategory()

    const [loader, setLoader] = useState(false);
    const { setCategory } = useAdminSection()
    const [fileData, setFileData] = useState(null)
    const [filePreview, setFilePreview] = useState(null)

    const [errors, setErrors] = useState({
        catName: '',
        fileData: '',
        catTitle: '',
        catDesc: '',
        catNameFarsi: '',
        catDescFarsi: '',
        catTitleFarsi: '',
    });

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setFileData(selectedFile);
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


    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setFileData(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result); // Set file preview for display
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleResetUpload = () => {
        setFileData(null);
        setFilePreview(null);
    };

    const handleClear = () => {
        setFileData(null)
        setFilePreview(null);
        setCatName('');
        setCatTitle('')
        setCatDesc('')
        setCatNameFarsi('')
        setCatTitleFarsi('')
        setCatDescFarsi('')
    }

    const fetchCategory = async () => {
        let response = await getCategory()
        setCategory(response?.categories?.reverse())
    }


    const handleAddCategory = async () => {

        let valid = true;
        let newErrors = {
            catName: '', fileData: '', catTitle: '',
            catDesc: '', catNameFarsi, catTitleFarsi, catDescFarsi
        };
        if (!catNameFarsi) {
            newErrors.catNameFarsi = 'Category Name is required';
            valid = false;
        }
        if (!fileData) {
            newErrors.fileData = 'Image is required';
            valid = false;
        }
        if (!catTitleFarsi) {
            newErrors.catTitleFarsi = 'Category Title is required';
            valid = false;
        }
        if (!catDescFarsi) {
            newErrors.catDescFarsi = 'Category Description is required';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        setLoader(true);
        try {

            const response = await createCategory(catName, fileData, catTitle, catDesc, catNameFarsi, catTitleFarsi, catDescFarsi);
            if (response.statusCode === 200) {
                setLoader(false);
                fetchCategory()
                setTimeout(() => {
                    handleCloseCategoryFarsi();
                    handleCloseCategory();
                    getCategory();
                    handleClear()
                    Alert('Success', 'Category added successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleClear()
                handleCloseCategoryFarsi();
                handleCloseCategory();
                Alert('Info', 'Unable to process your request, please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleClear()
            handleCloseCategoryFarsi();
            handleCloseCategory();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    useEffect(() => {
        translateText(catName, setCatNameFarsi, selectedLanguage);
        translateText(catTitle, setCatTitleFarsi, selectedLanguage);
        translateText(catDesc, setCatDescFarsi, selectedLanguage);
    }, [catName, catTitle, catDesc])

    return (
        <div>
            <Modal
                open={openCategoryFarsi}
                onClose={handleCloseCategoryFarsi}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='AddCategoryModal'>
                    <Stack className='AddCategoryDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AddCategoryHeading'>
                            اضافه کردن دسته
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseCategoryFarsi} className='AddCategoryCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4} lg={4} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                نام دسته
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام دسته خود را وارد کنید'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                value={catNameFarsi}
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => setCatNameFarsi(e.target.value)}
                                autoComplete='off'
                                error={!!errors.catName}
                                helperText={errors.catName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                عنوان دسته
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='عنوان دسته خود را وارد کنید'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={catTitleFarsi}
                                onChange={(e) => setCatTitleFarsi(e.target.value)}
                                autoComplete='off'
                                error={!!errors.catTitle}
                                helperText={errors.catTitle}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                توضیحات دسته
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='توضیحات دسته خود را وارد کنید'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={catDescFarsi}
                                onChange={(e) => setCatDescFarsi(e.target.value)}
                                autoComplete='off'
                                error={!!errors.catDesc}
                                helperText={errors.catDesc}
                                fullWidth
                                multiline
                                rows={2}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid xs={12} md={12} lg={12}>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                Upload Image (آپلود تصویر)
                            </Typography>
                            {!fileData && (
                                <Stack {...getRootProps()} className='FileUpload'>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <Typography variant="body2" color="text.secondary" className='FileUploadHeading'>
                                            Drop the files here ...
                                        </Typography>
                                    ) : (
                                        <Grid container className='FileUploadFieldCategory'>
                                            <Grid item xs={12} md={8} lg={8} className='CategoryUploadImgFlex'>
                                                {/* <Stack {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <img src={CloudImage} alt='Cloud' />
                                            </Stack> */}
                                                <Stack>
                                                    <Typography variant="body2" color="text.secondary" className='FileUploadHeadingCat'>
                                                        Select a file or drag and drop here
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" className='FileUploadParaCat'>
                                                        JPG or PNG file size no more than 10MB
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={4} className='CategoryUploadImg'>
                                                <Button
                                                    variant="contained"
                                                    className='FileUploadButton'
                                                    onClick={open} // Use the open method from useDropzone
                                                >
                                                    Browse file
                                                </Button>
                                            </Grid>
                                            {errors.fileData && (
                                                <p style={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '4%' }}>
                                                    {errors.fileData}
                                                </p>
                                            )}

                                        </Grid>
                                    )}
                                </Stack>
                            )}
                            {fileData && (
                                <Stack className='PreviewUpload'>
                                    <Box className='PreviewUploadImageContainer'>
                                        <img src={filePreview} className='PreviewUploadImage' alt="Preview" />
                                        <img src={EditIcon} alt='Edit' onClick={handleResetUpload} className='EditIconAddProject' />
                                    </Box>
                                </Stack>
                            )}
                        </Grid>
                    </Grid>
                    <Stack className='FormSubmitFieldAddProject'>
                        <Stack className='AddProjectButtonFormSubmit'>
                            <Button
                                variant="contained"
                                className='FormCancelButtonAddProject'
                                onClick={() => {
                                    handleCloseCategoryFarsi();
                                    handleCloseCategory();
                                    handleClear();
                                }}

                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                className='FormSubmitButtonAddProject'
                                onClick={handleAddCategory}
                            >
                                Add
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default AddCategoryFarsi;
