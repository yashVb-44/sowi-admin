import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Stack, Grid, TextField, Select, MenuItem, InputAdornment, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './CreateBlog.css'
import { AttachMoney } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CloudImage from '../../Assets/AdminImages/CloudImgae.png'
import { useDropzone } from 'react-dropzone';
import EditIcon from '../../Assets/AdminImages/EditIcon.png'
import { Alert } from '../../Common/Alert';
import Loader from '../../Common/Loader';
import { createBlog, getAllBlog } from '../../Lib/BlogApi';
import { useBlogDetail } from '../../Context/BlogDetailContext';
import { useAdminSection } from '../../Context/AdminSectionContext';
import { useAddBlog } from '../../AdminContext/AddBlogContext';
import { translateText } from '../../Lib/Language';
import { useLanguage } from '../../Context/LanguageContext';

const CreateBlogFarsi = ({ openBlogFarsi, handleCloseBlogFarsi, handleCloseBlog }) => {

    const [loader, setLoader] = useState(false);
    const { setBlogData } = useAdminSection()
    const { selectedLanguage } = useLanguage()
    const { title, setTitle, author, setAuthor, content, setContent, titleFarsi, setTitleFarsi,
        authorFarsi, setAuthorFarsi, contentFarsi, setContentFarsi } = useAddBlog()

    const [fileData, setFileData] = useState(null)
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState('');

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

    const handleResetUpload = () => {
        setFileData(null)
        setFilePreview(null)
    }

    const handleCancelProject = () => {
        handleCloseBlogFarsi()
        handleReset();
    }


    const [errors, setErrors] = useState({
        titleFarsi: '',
        authorFarsi: '',
        contentFarsi: '',
        fileData: '',
    });


    const handleReset = () => {
        setTitle('')
        setTitleFarsi('')
        setAuthor('')
        setAuthorFarsi('')
        setContent('')
        setContentFarsi('')
        setFileData(null)
        setFilePreview(null)
    }

    const handleChange = (e, setter) => {
        setter(e.target.value)
        if (setter === setTitle) {
            let value = e.target.value;
            if (value.length <= 100) {
                setter(value);
            } else {
                setter(value.slice(0, 100));
            }
        }
    }
    const handleContent = (value) => {
        setContentFarsi(value)
    }
    const fetchBlog = async () => {
        let response = await getAllBlog()
        setBlogData(response?.blogs?.reverse())
    }

    const handleCreateBlog = async () => {

        let valid = true;
        let newErrors = {
            titleFarsi: '', authorFarsi: '',
            contentFarsi: '', fileData: '',
        };

        if (!title) {
            newErrors.title = 'Title is required';
            valid = false;
        }
        if (!author) {
            newErrors.author = 'Creater Name is required';
            valid = false;
        }
        if (!content) {
            newErrors.content = 'Content is required';
            valid = false;
        }
        if (!fileData) {
            newErrors.fileData = 'Image is required';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        setLoader(true);
        try {
            let response = await createBlog(title, author, content, fileData, titleFarsi, authorFarsi, contentFarsi);
            if (response.statusCode === 200) {
                setLoader(false);
                fetchBlog()
                setTimeout(() => {
                    handleCloseBlogFarsi();
                    handleCloseBlog()
                    Alert('Success', 'Blog Created successfully', 'success');
                    handleReset()
                }, 100);
            }
            else if (response.statusCode === 403) {
                setLoader(false);
                handleCloseBlogFarsi();
                handleCloseBlog()
                Alert('Info', 'Only Authorized user can add blog', 'info');
            }
            else if (response.statusCode === 404) {
                setLoader(false);
                handleCloseBlogFarsi();
                handleCloseBlog();
                Alert('Info', 'Required fields missing', 'info');
            }
            else {
                handleCloseBlogFarsi();
                handleCloseBlog();
                handleReset();
                setLoader(false);
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleCloseBlogFarsi();
            handleCloseBlog();
            handleReset();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    useEffect(() => {
        translateText(title, setTitleFarsi, selectedLanguage);
        translateText(author, setAuthorFarsi, selectedLanguage);
        translateText(content, setContentFarsi, selectedLanguage);
    }, [title, author, content])

    return (
        <div>
            <Modal
                open={openBlogFarsi}
                onClose={handleCloseBlogFarsi}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='CreateBlogModal'>
                    <Stack className='CreateBlogDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='CreateBlogHeading'>
                            ایجاد وبلاگ
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseBlogFarsi()} className='CreateBlogCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>






                    <Typography id="modal-modal-title" variant="h6" component="h2" className='CreateBlogHeadingTwo'>
                        جزئیات وبلاگ
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }} >
                        <Grid item xs={12} md={6} lg={6} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                عنوان وبلاگ
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='عنوان وبلاگ خود را وارد کنید'
                                variant="standard"
                                className='CreateBlogInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={titleFarsi}
                                onChange={(e) => handleChange(e, setTitleFarsi)}
                                autoComplete='off'
                                error={!!errors.title}
                                helperText={errors.title}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                نام خالق
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='نام را وارد کنید'
                                variant="standard"
                                className='CreateBlogInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={authorFarsi}
                                onChange={(e) => handleChange(e, setAuthorFarsi)}
                                autoComplete='off'
                                error={!!errors.author}
                                helperText={errors.author}
                            />
                        </Grid>


                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                محتوا
                            </Typography>
                            <div style={{ width: '100%', height: 'auto' }}>
                                <ReactQuill
                                    placeholder="توضیحات را وارد کنید"
                                    value={contentFarsi}
                                    onChange={handleContent}
                                    autoComplete='off'
                                    error={!!errors.content}
                                    helperText={errors.content}
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ 'color': [] }, { 'background': [] }],
                                            [{ 'align': [] }],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link', 'image'],
                                            ['clean']
                                        ],
                                    }}
                                    // formats={[
                                    //     'bold', 'italic', 'underline', 'strike',
                                    //     'color', 'background',
                                    //     'align',
                                    //     'list', 'bullet',
                                    //     'link', 'image'
                                    // ]}
                                    className='CreateBlogInputFiled'
                                />
                            </div>

                        </Grid>
                    </Grid>


                    <Grid container>
                        <Grid xs={12} md={12} lg={12}>

                            <Typography id="modal-modal-title" variant="h6" component="h2" className='CreateBlogHeadingTwo' sx={{ height: '20px' }}>
                                Media (رسانه ها)
                            </Typography>

                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                Upload Cover Image (آپلود تصویر جلد)
                            </Typography>

                            {!fileData &&
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
                                                {errors.fileData && (
                                                    <p style={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '4%' }}>
                                                        {errors.fileData}
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
                            {fileData && (
                                <Stack className='PreviewUpload'>
                                    <Box className='PreviewUploadImageContainer'>
                                        <img src={filePreview} className='PreviewUploadImage' alt="Preview" />
                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleResetUpload()} className='EditIconCreateBlog' />
                                    </Box>
                                </Stack>

                            )}

                        </Grid>
                    </Grid>





                    <Stack className='FormSubmitFieldCreateBlog'>
                        <Stack className='CreateBlogButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormCancelButtonCreateBlog'
                                onClick={() => handleCancelProject()}
                            >
                                Cancel
                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormSubmitButtonCreateBlog'
                                onClick={() => handleCreateBlog()}
                            >
                                Create
                            </Button>
                        </Stack>
                    </Stack>

                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
        </div >
    )
}

export default CreateBlogFarsi
