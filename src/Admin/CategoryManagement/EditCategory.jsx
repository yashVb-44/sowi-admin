import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Stack, Grid, TextField, Select, MenuItem, InputAdornment, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './AddCategory.css'
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
import { Alert } from '../../Common/Alert';
import Loader from '../../Common/Loader';
import { getCategory, updateCategory } from '../../Lib/CategoryApi';
import { useAdminSection } from '../../Context/AdminSectionContext';

const EditCategory = ({ openCategoryEdit, handleCloseCategoryEdit }) => {

    const { editData } = useAddProject()
    const { setCategory } = useAdminSection()


    const [categoryName, setCategoryName] = useState('')
    const [catTitle, setCatTitle] = useState('');
    const [catDesc, setCatDesc] = useState('');
    const [categoryNameFarsi, setCategoryNameFarsi] = useState('')
    const [catTitleFarsi, setCatTitleFarsi] = useState('');
    const [catDescFarsi, setCatDescFarsi] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [loader, setLoader] = useState(false);

    const [errors, setErrors] = useState({
        categoryName: '',
        file: '',
        file: '',
        file: '',
    });

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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [error, setError] = useState('');


    useEffect(() => {
        setFilePreview(editData?.en?.image)
        setCategoryName(editData?.en?.title)
        setCatTitle(editData?.en?.categoryTitle)
        setCatDesc(editData?.en?.categoryDescription)
        setCategoryNameFarsi(editData?.fa?.title)
        setCatTitleFarsi(editData?.fa?.categoryTitle)
        setCatDescFarsi(editData?.fa?.categoryDescription)
    }, [editData])

    const handleResetUpload = () => {
        setFilePreview(null)
    }

    const handleCancel = () => {
        handleCloseCategoryEdit()
    }

    const fetchCategory = async () => {
        let response = await getCategory()
        setCategory(response?.categories?.reverse())
    }

    const handleSave = async () => {
        setLoader(true);
        try {
            let response = await updateCategory(editData?._id, categoryName, file, catTitle, catDesc, categoryNameFarsi, catTitleFarsi, catDescFarsi);
            if (response.statusCode === 200) {
                setLoader(false);
                fetchCategory()
                setTimeout(() => {
                    handleCloseCategoryEdit();
                    Alert('Success', 'Category Updated successfully', 'success');
                }, 100);
            }
            else if (response.statusCode === 403) {
                setLoader(false);
                handleCloseCategoryEdit();
                Alert('Info', 'Only admin users can update categories', 'info');
            }
            else if (response.statusCode === 404) {
                setLoader(false);
                handleCloseCategoryEdit();
                Alert('Info', 'Category not found', 'info');
            }
            else {
                setLoader(false);
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    }


    return (
        <div>
            <Modal
                open={openCategoryEdit}
                onClose={handleCloseCategoryEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='AddCategoryModal'>
                    <Stack className='AddCategoryDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AddCategoryHeading'>
                            Edit Category (ویرایش دسته)
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseCategoryEdit()} className='AddCategoryCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>


                    <Grid container spacing={6} >
                        <Grid item xs={12} md={4} lg={4} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                Category Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your category name'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={categoryName}
                                onChange={(e) =>  setCategoryName(e.target.value)}
                                autoComplete='off'
                                error={!!errors.categoryName}
                                helperText={errors.categoryName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                Category Title
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your category title'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={catTitle}
                                onChange={(e) => setCatTitle(e.target.value)}
                                autoComplete='off'
                                error={!!errors.catTitle}
                                helperText={errors.catTitle}
                            />
                        </Grid>

                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                Category Description
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your category description'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                value={catDesc}
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => setCatDesc(e.target.value)}
                                autoComplete='off'
                                error={!!errors.catDesc}
                                helperText={errors.catDesc}
                                fullWidth
                                multiline
                                rows={2}
                            />
                        </Grid>
                    </Grid>
                    <Stack className='BorderBottom'></Stack>
                    <Grid container spacing={6} >
                        <Grid item xs={12} md={4} lg={4} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                            نام دسته
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام دسته خود را وارد کنید'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={categoryNameFarsi}
                                onChange={(e) => setCategoryNameFarsi(e.target.value)}
                                autoComplete='off'
                                error={!!errors.categoryName}
                                helperText={errors.categoryName}
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
                                value={catDescFarsi}
                                InputProps={{ disableUnderline: true }}
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


                            {!filePreview &&
                                <Stack {...getRootProps()} className='FileUpload'>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <Typography variant="body2" color="text.secondary" className='FileUploadHeading'>
                                            Drop the files here ...
                                        </Typography>
                                    ) : (
                                        <Grid container className='FileUploadFieldCategory'>
                                            <Grid item sx={12} md={8} lg={8} className='CategoryUploadImgFlex'>
                                                <Stack>
                                                    <input {...getInputProps()} />
                                                    <img src={CloudImage} alt='Cloud Image' />
                                                </Stack>
                                                <Stack>
                                                    <Typography variant="body2" color="text.secondary" className='FileUploadHeading'>
                                                        Select a file or drag and drop here
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" className='FileUploadPara'>
                                                        JPG or PNG file size no more than 10MB
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item sx={12} md={4} lg={4} className='CategoryUploadImg'>
                                            <Button
                                                    variant="contained"
                                                    className='FileUploadButton'
                                                    onClick={open} // Use the open method from useDropzone
                                                >
                                                    Browse file
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    )}


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
                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleResetUpload()} className='EditIconAddProject' />
                                    </Box>
                                </Stack>

                            )}

                        </Grid>
                    </Grid>

                    <Stack className='FormSubmitFieldAddProject'>
                        <Stack className='AddProjectButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormCancelButtonAddProject'
                                onClick={() => handleCancel()}
                            >
                                Cancel
                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormSubmitButtonAddProject'
                                onClick={() => handleSave()}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>

                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />

        </div >
    )
}

export default EditCategory
