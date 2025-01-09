import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './CreateUser.css';
import { AttachMoney } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import CloudImage from '../../Assets/AdminImages/CloudImgae.png';
import SowiImage from '../../Assets/AdminImages/sowi-img.png';
import NoImage from '../../Assets/AdminImages/no-image-available.png';
import { useDropzone } from 'react-dropzone';
import EditIcon from '../../Assets/AdminImages/EditIcon.png';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllUser, updateUser } from '../../Lib/UsersApi';
import { useUserSection } from '../../Context/UserDetailsContext';

const EditUser = ({ openUserEdit, handleCloseUserEdit }) => {
    const { editData } = useAddProject();
    const { setUserData, page, rowsPerPage, searchQuery } = useUserSection()

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
        setFilePreview(null);
    };

    const [loader, setLoader] = useState(false);



    const changeDateFormat = (date) => {
        try {
            const dateParts = date.split('/');
            const formattedDate = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
            return formattedDate
        } catch (error) {
            return "01-01-2001"
        }
    }

    // Fields from the response
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const [isActive, setIsActive] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [errors, setErrors] = useState({
        name: '',
    });

    useEffect(() => {
        setName(editData?.name);
        setEmail(editData?.email);
        setMobileNo(editData?.mobileNo);
        setIsBlocked(editData?.isBlocked);
        setIsVerified(editData?.isVerified);
        setIsActive(editData?.isActive);
        setIsDeleted(editData?.isDeleted);
        setCountry(editData?.country);
        setLanguage(editData?.language);
        setGender(editData?.gender);
        setRole(editData?.role);
        // setDateOfBirth(changeDateFormat(editData?.dateOfBirth));
        setDateOfBirth(editData?.dateOfBirth);
        setFilePreview(editData?.profileImage);
    }, [editData]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear error for the field
    };

    const handleCancelUser = () => {
        handleCloseUserEdit();
    };

    const fetchUser = async () => {
        let response = await getAllUser({ page, search: searchQuery, limit: rowsPerPage });
        setUserData(response?.users || []);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleUpdateUser = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await updateUser({
                name,
                email,
                mobileNo,
                isBlocked,
                isVerified,
                isActive,
                isDeleted,
                country,
                language,
                gender,
                role,
                file,
                dateOfBirth,
                userId: editData?._id
            });

            if (response.type === "success") {
                setLoader(false);
                fetchUser();
                setTimeout(() => {
                    handleCloseUserEdit();
                    Alert('Success', 'User Updated successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleCloseUserEdit();
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
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Edit User
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseUserEdit()} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        User Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                name='name'
                                placeholder="Enter name"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={name}
                                onChange={(e) => handleChange(e, setName)}
                                autoComplete="off"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Email
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                placeholder="Enter email"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={email}
                                onChange={(e) => handleChange(e, setEmail)}
                                autoComplete="off"
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Mobile Number
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                placeholder="Enter mobile number"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={mobileNo}
                                onChange={(e) => handleChange(e, setMobileNo)}
                                autoComplete="off"
                                error={!!errors.mobileNo}
                                helperText={errors.mobileNo}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Country
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder="Enter country"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={country}
                                onChange={(e) => handleChange(e, setCountry)}
                                autoComplete="off"
                                error={!!errors.country}
                                helperText={errors.country}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Language
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder="Enter language"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={language}
                                onChange={(e) => handleChange(e, setLanguage)}
                                autoComplete="off"
                                error={!!errors.language}
                                helperText={errors.language}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Date of Birth
                            </Typography>
                            <TextField
                                id="standard-required"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={dateOfBirth}
                                onChange={(e) => handleChange(e, setDateOfBirth)}
                                autoComplete="off"
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth}
                            />
                        </Grid>
                    </Grid>

                    {/* <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Role
                            </Typography>
                            <Select
                                value={role}
                                onChange={(e) => handleChange(e, setRole)}
                                className="CreateCommonInputFiled"
                                error={!!errors.role}
                                displayEmpty
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Vendor">Vendor</MenuItem>
                                <MenuItem value="User">User</MenuItem>
                            </Select>
                        </Grid>
                    </Grid> */}

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Gender
                            </Typography>
                            <Select
                                value={gender}
                                onChange={(e) => handleChange(e, setGender)}
                                className="CreateCommonInputFiled"
                                error={!!errors.gender}
                                displayEmpty
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Is Blocked
                            </Typography>
                            <Select
                                value={isBlocked ? 'Yes' : 'No'}
                                onChange={(e) => setIsBlocked(e.target.value === 'Yes')}
                                className="CreateCommonInputFiled"
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Is Verified
                            </Typography>
                            <Select
                                value={isVerified ? 'Yes' : 'No'}
                                onChange={(e) => setIsVerified(e.target.value === 'Yes')}
                                className="CreateCommonInputFiled"
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Is Active
                            </Typography>
                            <Select
                                value={isActive ? 'Yes' : 'No'}
                                onChange={(e) => setIsActive(e.target.value === 'Yes')}
                                className="CreateCommonInputFiled"
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Is Deleted
                            </Typography>
                            <Select
                                value={isDeleted ? 'Yes' : 'No'}
                                onChange={(e) => setIsDeleted(e.target.value === 'Yes')}
                                className="CreateCommonInputFiled"
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                        <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                            Profile Image
                        </Typography>
                        <Box
                            {...getRootProps()}
                            className={`CreateUserDropzone ${isDragActive ? "active" : ""}`}
                        >
                            {filePreview ? (
                                <img
                                    src={filePreview}
                                    alt="Profile Preview"
                                    className="CreateUserImagePreview"
                                    onError={(e) => e.target.src = SowiImage}

                                />
                            ) : (
                                <img src={NoImage} alt="Default Image" className="CreateUserImagePreview" />
                            )}

                            {/* <input {...getInputProps()} /> */}
                        </Box>
                    </Grid>


                    <Box sx={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                textTransform: 'none',
                                borderRadius: '4px',
                                padding: '6px 20px',
                            }}
                            onClick={handleUpdateUser}
                            disabled={loader}
                        >
                            {loader ? 'Updating...' : 'Update User'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditUser;
