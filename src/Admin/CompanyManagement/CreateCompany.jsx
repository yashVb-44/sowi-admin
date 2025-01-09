import React, { useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '../../Common/Alert';
import { addCompany, getAllCompany } from '../../Lib/CompanyApi';
import { useCompanySection } from '../../Context/CompanyDetails';

const CreateCompany = ({ openCompanyCreate, handleCloseCompanyCreate }) => {
    const { setCompanyData, page, rowsPerPage, searchQuery } = useCompanySection();

    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [serviceType, setServiceType] = useState('1');
    const [companyName, setCompanyName] = useState('');
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
        if (!companyName.trim()) newErrors.companyName = 'Company Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const fetchCompany = async () => {
        let response = await getAllCompany({ page, search: searchQuery, limit: rowsPerPage });
        setCompanyData(response?.companies || []);
    };

    const handleCreateCompany = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await addCompany({
                name,
                serviceType,
                companyName
            });

            if (response.type === 'success') {
                setLoader(false);
                fetchCompany();
                setTimeout(() => {
                    handleCloseCompanyCreate();
                    setName("")
                    setCompanyName("")
                    Alert('Success', 'Company Created successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleCloseCompanyCreate();
                setName("")
                setCompanyName("")
                Alert('Warning', response.message, 'warning');
            }
        } catch (error) {
            setLoader(false);
            handleCloseCompanyCreate();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    return (
        <div>
            <Modal
                open={openCompanyCreate}
                onClose={handleCloseCompanyCreate}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Create Company
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseCompanyCreate} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        Company Details
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
                                Company Name
                            </Typography>
                            <TextField
                                id="companyName"
                                name="companyName"
                                placeholder="Enter Company Name"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={companyName}
                                onChange={(e) => handleChange(e, setCompanyName)}
                                autoComplete="off"
                                error={!!errors.companyName}
                                helperText={errors.companyName}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Service Type
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
                            onClick={handleCreateCompany}
                            disabled={loader}
                        >
                            {loader ? 'Creating...' : 'Create Company'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateCompany;
