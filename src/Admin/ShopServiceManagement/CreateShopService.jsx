import React, { useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '../../Common/Alert';
import { addShopService, getAllShopService } from '../../Lib/ShopServicesApi';
import { useShopServiceSection } from '../../Context/ShopServiceDetails';

const CreateShopService = ({ openShopServiceCreate, handleCloseShopServiceCreate }) => {
    const { setShopServiceData, page, rowsPerPage, searchQuery } = useShopServiceSection();

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

    const fetchShopService = async () => {
        let response = await getAllShopService({ page, search: searchQuery, limit: rowsPerPage });
        setShopServiceData(response?.services || []);
    };

    const handleCreateShopService = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await addShopService({
                name,
                serviceType,
            });

            if (response.type === 'success') {
                setLoader(false);
                fetchShopService();
                setTimeout(() => {
                    handleModelClose();
                    setName("")
                    Alert('Success', 'ShopService Created successfully', 'success');
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
        handleCloseShopServiceCreate()
        resetForm()
    }

    return (
        <div>
            <Modal
                open={openShopServiceCreate}
                onClose={handleModelClose}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Create ShopService
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleModelClose} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        ShopService Details
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
                            onClick={handleCreateShopService}
                            disabled={loader}
                        >
                            {loader ? 'Creating...' : 'Create ShopService'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateShopService;
