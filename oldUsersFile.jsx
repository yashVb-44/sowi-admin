import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { Stack, Grid, TextField, Select, MenuItem, InputAdornment, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './CreateUser.css'
import { AttachMoney } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CloudImage from '../../Assets/AdminImages/CloudImgae.png'
import { useDropzone } from 'react-dropzone';
import EditIcon from '../../Assets/AdminImages/EditIcon.png'
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllUser, updateUser } from '../../Lib/UsersApi';
import { useAdminSection } from '../../Context/AdminSectionContext';

const EditUser = ({ openUserEdit, handleCloseUserEdit }) => {

    const { editData } = useAddProject()
    const { setUserData } = useAdminSection()

console.log(editData)
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

    const [userName, setUserName] = useState('')
    const [createrName, setCreaterName] = useState('')
    const [content, setContent] = useState('')
    const [userNameFarsi, setUserNameFarsi] = useState('')
    const [createrNameFarsi, setCreaterNameFarsi] = useState('')
    const [contentFarsi, setContentFarsi] = useState('')

    const [errors, setErrors] = useState({
        userName: '',
        createrName: '',
        content: '',
        file: '',
    });

    useEffect(() => {
        setUserName(editData?.name)
        setCreaterName(editData?.author)
        setContent(editData?.content)
        setFilePreview(editData?.featuredImage)
        setUserNameFarsi(editData?.fa?.name)
        setCreaterNameFarsi(editData?.fa?.author)
        setContentFarsi(editData?.fa?.content)
    }, [editData])

    const handleChange = (e, setter) => {
        setter(e.target.value)
        if (setter === setUserName) {
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

    const handleCancelUser = () => {
        handleCloseUserEdit()
    }

    const fetchUser = async () => {
        let response = await getAllUser()
        setUserData(response?.users?.reverse())
    }

    const handleUpdateUser = async () => {

        setLoader(true);
        try {
            let response = await updateUser(userName, createrName, content, file, editData?._id, userNameFarsi, createrNameFarsi, contentFarsi);
            // console.log("res --- ", JSON.stringify(response))

            if (response.statusCode === 200) {
                setLoader(false);
                fetchUser()
                setTimeout(() => {
                    handleCloseUserEdit();
                    Alert('Success', 'User Updated successfully', 'success');
                }, 100);
            }
            else if (response.statusCode === 403) {
                setLoader(false);
                handleCloseUserEdit();
                Alert('Info', 'Only Authorized user can update user', 'info');
            }
            else if (response.statusCode === 404) {
                setLoader(false);
                handleCloseUserEdit();
                Alert('Info', 'Required fields missing', 'info');
            }
            else {
                handleCloseUserEdit();
                setLoader(false);
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleCloseUserEdit();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };


    return (
        <div>
            <Modal
                open={openUserEdit}
                onClose={handleCloseUserEdit}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className='CreateUserModal'>
                    <Stack className='CreateUserDetail'>
                        <Typography id="modal-modal-name" variant="h6" component="h2" className='CreateUserHeading'>
                            Edit User
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseUserEdit()} className='CreateUserCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className='CreateUserHeadingTwo'>
                        User Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className='CreateUserFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateUserInputLabel'>
                                User Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your user name'
                                variant="standard"
                                className='CreateUserInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={userName}
                                onChange={(e) => handleChange(e, setUserName)}
                                autoComplete='off'
                                error={!!errors.userName}
                                helperText={errors.userName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className='CreateUserFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateUserInputLabel'>
                                Creator Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter name'
                                variant="standard"
                                className='CreateUserInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={createrName}
                                onChange={(e) => handleChange(e, setCreaterName)}
                                autoComplete='off'
                                error={!!errors.createrName}
                                helperText={errors.createrName}
                            />
                        </Grid>
                    </Grid>

                    <Stack className='BorderBottom'></Stack>

                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='CreateUserFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateUserInputLabel'>
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
                                    className='CreateUserInputFiled'
                                />
                            </div>

                        </Grid>
                    </Grid>


                    <Stack className='BorderBottom'></Stack>

                    <Grid container>
                        <Grid xs={12} md={12} lg={12}>

                            <Typography id="modal-modal-name" variant="h6" component="h2" className='CreateUserHeadingTwo' sx={{ height: '20px' }}>
                                Media
                            </Typography>

                            <Typography variant="body2" color="text.secondary" className='CreateUserInputLabel'>
                                Upload Cover Image
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
                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleResetUpload()} className='EditIconCreateUser' />
                                    </Box>
                                </Stack>

                            )}

                        </Grid>
                    </Grid>




                    <Stack className='FormSubmitFieldCreateUser'>
                        <Stack className='CreateUserButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormCancelButtonCreateUser'
                                onClick={() => handleCancelUser()}
                            >
                                Cancel
                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormSubmitButtonCreateUser'
                                onClick={() => handleUpdateUser()}
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

export default EditUser
