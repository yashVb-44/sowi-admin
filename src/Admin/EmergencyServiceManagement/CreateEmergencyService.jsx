import React, { useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '../../Common/Alert';
import { addEmergencyService, getAllEmergencyService } from '../../Lib/EmergencyServicesApi';
import { useEmergencyServiceSection } from '../../Context/EmergencyServiceDetails';

const CreateEmergencyService = ({ openEmergencyServiceCreate, handleCloseEmergencyServiceCreate }) => {
    const { setEmergencyServiceData, page, rowsPerPage, searchQuery } = useEmergencyServiceSection();

    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [serviceType, setServiceType] = useState('1');
    const [errors, setErrors] = useState({
        name: '',
        serviceType: '',
    });

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear error for the field
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!serviceType) newErrors.serviceType = 'Vehicle Type is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const fetchEmergencyService = async () => {
        let response = await getAllEmergencyService({ page, search: searchQuery, limit: rowsPerPage });
        setEmergencyServiceData(response?.services || []);
    };

    const handleCreateEmergencyService = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await addEmergencyService({
                name,
                serviceType,
            });

            if (response.type === 'success') {
                setLoader(false);
                fetchEmergencyService();
                setTimeout(() => {
                    handleModelClose();
                    setName("")
                    Alert('Success', 'EmergencyService Created successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleModelClose();
                setName("")
                Alert('Warning', response.message, 'warning');
            }
        } catch (error) {
            setLoader(false);
            handleModelClose();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    const resetForm = () => {
        setName('');
        setErrors({});
    }

    const handleModelClose = () => {
        handleCloseEmergencyServiceCreate()
        resetForm()
    }

    return (
        <div>
            <Modal
                open={openEmergencyServiceCreate}
                onClose={handleModelClose}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Create EmergencyService
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleModelClose} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        EmergencyService Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Name
                            </Typography>
                            <TextField
                                id="name"
                                name="name"
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
                                Vehicle Type
                            </Typography>
                            <Select
                                id="serviceType"
                                name="serviceType"
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
                            {errors.serviceType && (
                                <Typography variant="body2" color="error">
                                    {errors.serviceType}
                                </Typography>
                            )}
                        </Grid>
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
                            onClick={handleCreateEmergencyService}
                            disabled={loader}
                        >
                            {loader ? 'Creating...' : 'Create EmergencyService'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateEmergencyService;
