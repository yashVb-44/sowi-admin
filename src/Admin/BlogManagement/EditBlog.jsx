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
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllBlog, updateBlog } from '../../Lib/BlogApi';
import { useBlogDetail } from '../../Context/BlogDetailContext';
import { useAdminSection } from '../../Context/AdminSectionContext';

const EditBlog = ({ openBlogEdit, handleCloseBlogEdit }) => {

    const { editData } = useAddProject()
    const { setBlogData } = useAdminSection()


    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState('');

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
        setFilePreview(null)
    }

    const [loader, setLoader] = useState(false)

    const [blogTitle, setBlogTitle] = useState('')
    const [createrName, setCreaterName] = useState('')
    const [content, setContent] = useState('')
    const [blogTitleFarsi, setBlogTitleFarsi] = useState('')
    const [createrNameFarsi, setCreaterNameFarsi] = useState('')
    const [contentFarsi, setContentFarsi] = useState('')

    const [errors, setErrors] = useState({
        blogTitle: '',
        createrName: '',
        content: '',
        file: '',
    });

    useEffect(() => {
        setBlogTitle(editData?.en?.title)
        setCreaterName(editData?.en?.author)
        setContent(editData?.en?.content)
        setFilePreview(editData?.en?.featuredImage)
        setBlogTitleFarsi(editData?.fa?.title)
        setCreaterNameFarsi(editData?.fa?.author)
        setContentFarsi(editData?.fa?.content)
    }, [editData])

    const handleChange = (e, setter) => {
        setter(e.target.value)
        if (setter === setBlogTitle) {
            let value = e.target.value;
            if (value.length <= 100) {
                setter(value);
            } else {
                setter(value.slice(0, 100));
            }
        }
    }
    const handleContent = (value) => {
        setContent(value)
    }
    const handleContentFarsi = (value) => {
        setContentFarsi(value)
    }

    const handleCancelBlog = () => {
        handleCloseBlogEdit()
    }

    const fetchBlog = async () => {
        let response = await getAllBlog()
        setBlogData(response?.blogs?.reverse())
    }

    const handleUpdateBlog = async () => {

        setLoader(true);
        try {
            let response = await updateBlog(blogTitle, createrName, content, file, editData?.en?._id, blogTitleFarsi, createrNameFarsi, contentFarsi);
            // console.log("res --- ", JSON.stringify(response))

            if (response.statusCode === 200) {
                setLoader(false);
                fetchBlog()
                setTimeout(() => {
                    handleCloseBlogEdit();
                    Alert('Success', 'Blog Updated successfully', 'success');
                }, 100);
            }
            else if (response.statusCode === 403) {
                setLoader(false);
                handleCloseBlogEdit();
                Alert('Info', 'Only Authorized user can update blog', 'info');
            }
            else if (response.statusCode === 404) {
                setLoader(false);
                handleCloseBlogEdit();
                Alert('Info', 'Required fields missing', 'info');
            }
            else {
                handleCloseBlogEdit();
                setLoader(false);
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleCloseBlogEdit();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };


    return (
        <div>
            <Modal
                open={openBlogEdit}
                onClose={handleCloseBlogEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='CreateBlogModal'>
                    <Stack className='CreateBlogDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='CreateBlogHeading'>
                            Edit Blog (ویرایش وبلاگ)
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseBlogEdit()} className='CreateBlogCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>

                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginTop: '3%' }} className='CreateBlogHeadingTwo'>
                        Blog Details (جزئیات وبلاگ)
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                Blog Title
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your blog title'
                                variant="standard"
                                className='CreateBlogInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={blogTitle}
                                onChange={(e) => handleChange(e, setBlogTitle)}
                                autoComplete='off'
                                error={!!errors.blogTitle}
                                helperText={errors.blogTitle}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                Creator Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter name'
                                variant="standard"
                                className='CreateBlogInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={createrName}
                                onChange={(e) => handleChange(e, setCreaterName)}
                                autoComplete='off'
                                error={!!errors.createrName}
                                helperText={errors.createrName}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
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
                                value={blogTitleFarsi}
                                onChange={(e) => handleChange(e, setBlogTitleFarsi)}
                                autoComplete='off'
                                error={!!errors.blogTitle}
                                helperText={errors.blogTitle}
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
                                value={createrNameFarsi}
                                onChange={(e) => handleChange(e, setCreaterNameFarsi)}
                                autoComplete='off'
                                error={!!errors.createrName}
                                helperText={errors.createrName}
                            />
                        </Grid>
                    </Grid>

                    <Stack className='BorderBottom'></Stack>

                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                Content
                            </Typography>
                            <div style={{ width: '100%', height: 'auto' }}>
                                <ReactQuill
                                    value={content}
                                    onChange={handleContent}
                                    placeholder="Enter description"
                                    autoComplete='off'
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
                                    error={!!errors.content}
                                    helperText={errors.content}
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
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                            محتوا
                            </Typography>
                            <div style={{ width: '100%', height: 'auto' }}>
                                <ReactQuill
                                    value={contentFarsi}
                                    onChange={handleContentFarsi}
                                    placeholder="توضیحات را وارد کنید"
                                    autoComplete='off'
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

                    <Stack className='BorderBottom'></Stack>

                    <Grid container>
                        <Grid xs={12} md={12} lg={12}>

                            <Typography id="modal-modal-title" variant="h6" component="h2" className='CreateBlogHeadingTwo' sx={{ height: '20px' }}>
                                Media (رسانه ها)
                            </Typography>

                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                Upload Cover Image (آپلود تصویر جلد)
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
                    </Grid>




                    <Stack className='FormSubmitFieldCreateBlog'>
                        <Stack className='CreateBlogButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormCancelButtonCreateBlog'
                                onClick={() => handleCancelBlog()}
                            >
                                Cancel
                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormSubmitButtonCreateBlog'
                                onClick={() => handleUpdateBlog()}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>

                </Box>
            </Modal>
        </div >
    )
}

export default EditBlog
