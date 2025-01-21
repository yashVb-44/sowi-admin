import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import './CreateEmergencyService.css';
import CloseIcon from '@mui/icons-material/Close';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllEmergencyService, updateEmergencyService } from '../../Lib/EmergencyServicesApi';
import { useEmergencyServiceSection } from '../../Context/EmergencyServiceDetails';


const EditEmergencyService = ({ openEmergencyServiceEdit, handleCloseEmergencyServiceEdit }) => {
    const { editData, setEditData } = useAddProject();
    const { setEmergencyServiceData, page, rowsPerPage, searchQuery } = useEmergencyServiceSection()

    const [loader, setLoader] = useState(false);

    // Fields from the response
    const [name, setName] = useState('');
    const [createBy, setCreateBy] = useState('');
    const [isShow, setIsShow] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [errors, setErrors] = useState({
        name: '',
    });

    useEffect(() => {
        setName(editData?.name || '');
        setCreateBy(editData?.createdByModel || '');
        setIsShow(editData?.isShow);
        setIsDeleted(editData?.isDeleted);
        setServiceType(editData?.serviceType || '');
    }, [editData]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear error for the field
    };

    const handleCancelEmergencyService = () => {
        handleCloseEmergencyServiceEdit();
    };

    const fetchEmergencyService = async () => {
        let response = await getAllEmergencyService({ page, search: searchQuery, limit: rowsPerPage });
        setEmergencyServiceData(response?.services || []);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleUpdateEmergencyService = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await updateEmergencyService({
                name,
                isShow,
                serviceType,
                // isDeleted,
                emergencyServiceId: editData?._id
            });

            if (response.type === "success") {
                setLoader(false);
                fetchEmergencyService();
                setTimeout(() => {
                    handleModelClose();
                    Alert('Success', 'EmergencyService Updated successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleModelClose();
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleModelClose();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    const resetForm = () => {
        setName('');
        setIsDeleted(false);
        setErrors({});
    }

    const handleModelClose = () => {
        handleCloseEmergencyServiceEdit()
        setEditData()
        resetForm()
    }

    return (
        <div>
            <Modal
                open={openEmergencyServiceEdit}
                onClose={handleModelClose}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Edit EmergencyService
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleModelClose()} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        Emergency Service Details
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
                                Create By
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                placeholder="Enter createBy"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={createBy}
                                onChange={(e) => handleChange(e, setCreateBy)}
                                autoComplete="off"
                                error={!!errors.createBy}
                                helperText={errors.createBy}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Vehicle Type
                            </Typography>
                            <Select
                                value={serviceType}
                                onChange={(e) => handleChange(e, setServiceType)}
                                className="CreateCommonInputFiled"
                                error={!!errors.serviceType}
                                displayEmpty
                            >
                                <MenuItem value="1">2 wheeler</MenuItem>
                                <MenuItem value="2">3 wheeler</MenuItem>
                                <MenuItem value="3">4 wheeler</MenuItem>
                                <MenuItem value="4">Heavy Vehicle</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Is Show
                            </Typography>
                            <Select
                                value={isShow ? 'Yes' : 'No'}
                                onChange={(e) => setIsShow(e.target.value === 'Yes')}
                                className="CreateCommonInputFiled"
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>


                    {/* <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
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
                    </Grid> */}
                    <Box sx={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                textTransform: 'none',
                                borderRadius: '4px',
                                padding: '6px 20px',
                            }}
                            onClick={handleUpdateEmergencyService}
                            disabled={loader}
                        >
                            {loader ? 'Updating...' : 'Update EmergencyService'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditEmergencyService;
