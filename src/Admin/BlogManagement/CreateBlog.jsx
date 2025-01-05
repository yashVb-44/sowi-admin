import React, { useCallback, useState } from 'react'
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
import CreateBlogFarsi from './CreateBlogFarsi';
import { useAddBlog } from '../../AdminContext/AddBlogContext';

const CreateBlog = ({ openBlog, handleCloseBlog }) => {

    const [loader, setLoader] = useState(false);
    const { setBlogData } = useAdminSection()


    const handleCancelProject = () => {
        handleCloseBlog()
    }

    const { title, setTitle, author, setAuthor, content, setContent } = useAddBlog()

    const [errors, setErrors] = useState({
        title: '',
        author: '',
        content: '',
        fileData: '',
    });


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
        setContent(value)
    }
    const fetchBlog = async () => {
        let response = await getAllBlog()
        setBlogData(response?.blogs?.reverse())
    }

    const handleCreateBlog = async () => {
        let valid = true;
        let newErrors = {
            title: '',
            author: '',
            content: '',
        };

        if (!title) {
            newErrors.title = 'Title is required';
            valid = false;
        }
        if (!author) {
            newErrors.author = 'Author is required';
            valid = false;
        }
        if (!content) {
            newErrors.content = 'Content is required';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;
        handleOpenBlogFarsi()
    };

    const [openBlogFarsi, setOpenBlogFarsi] = useState(false);
    const handleOpenBlogFarsi = () => setOpenBlogFarsi(true);
    const handleCloseBlogFarsi = () => setOpenBlogFarsi(false);

    return (
        <div>
            <CreateBlogFarsi openBlogFarsi={openBlogFarsi} handleCloseBlogFarsi={handleCloseBlogFarsi} handleCloseBlog={handleCloseBlog} />
            <Modal
                open={openBlog}
                onClose={handleCloseBlog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='CreateBlogModal'>
                    <Stack className='CreateBlogDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='CreateBlogHeading'>
                            Create Blog
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseBlog()} className='CreateBlogCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>






                    <Typography id="modal-modal-title" variant="h6" component="h2" className='CreateBlogHeadingTwo'>
                        Blog Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }} >
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
                                value={title}
                                onChange={(e) => handleChange(e, setTitle)}
                                autoComplete='off'
                                error={!!errors.title}
                                helperText={errors.title}
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
                                value={author}
                                onChange={(e) => handleChange(e, setAuthor)}
                                autoComplete='off'
                                error={!!errors.author}
                                helperText={errors.author}
                            />
                        </Grid>


                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                Content
                            </Typography>
                            <div style={{ width: '100%', height: 'auto' }}>
                                <ReactQuill
                                    placeholder="Enter description"
                                    value={content}
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
                            {errors.content && (
                                <p style={{ color: 'red', fontSize:'10px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                    {errors.content}
                                </p>
                            )}

                        </Grid>
                    </Grid>


                    <Stack className='FormSubmitFieldCreateBlog'>
                        <Stack className='CreateBlogButtonFormSubmit'>
                            {/* <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormCancelButtonCreateBlog'
                                onClick={() => handleCancelProject()}
                            >
                                Cancel
                            </Button> */}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormSubmitButtonCreateBlog'
                                onClick={() => handleCreateBlog()}
                            >
                                Continue
                            </Button>
                        </Stack>
                    </Stack>

                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
        </div >
    )
}

export default CreateBlog
