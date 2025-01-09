import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import './CreateCompany.css';
import CloseIcon from '@mui/icons-material/Close';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllCompany, updateCompany } from '../../Lib/CompanyApi';
import { useCompanySection } from '../../Context/CompanyDetails';


const EditCompany = ({ openCompanyEdit, handleCloseCompanyEdit }) => {
    const { editData } = useAddProject();
    const { setCompanyData, page, rowsPerPage, searchQuery } = useCompanySection()

    const [loader, setLoader] = useState(false);

    // Fields from the response
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [serviceType, setServiceType] = useState('');
    const [errors, setErrors] = useState({

        name: '',
        companyName: '',
    });

    useEffect(() => {
        setName(editData?.name);
        setCompanyName(editData?.companyName);
        setServiceType(editData?.serviceType)
        setIsDeleted(editData?.isDeleted);
    }, [editData]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear error for the field
    };

    const handleCancelCompany = () => {
        handleCloseCompanyEdit();
    };

    const fetchCompany = async () => {
        let response = await getAllCompany({ page, search: searchQuery, limit: rowsPerPage });
        setCompanyData(response?.companies || []);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!companyName.trim()) newErrors.companyName = 'Company Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleUpdateCompany = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await updateCompany({
                name,
                serviceType,
                isDeleted,
                companyName,
                companyId: editData?._id
            });

            if (response.type === "success") {
                setLoader(false);
                fetchCompany();
                setTimeout(() => {
                    handleCloseCompanyEdit();
                    Alert('Success', 'Company Updated successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleCloseCompanyEdit();
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleCloseCompanyEdit();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    return (
        <div>
            <Modal
                open={openCompanyEdit}
                onClose={handleCloseCompanyEdit}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Edit Company
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseCompanyEdit()} className="CreateCommonCloseIcon" />
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
                                id="standard-required"
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
                                id="standard-required"
                                name="companyName"
                                placeholder="Enter createBy"
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


                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
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
                    <Box sx={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                textTransform: 'none',
                                borderRadius: '4px',
                                padding: '6px 20px',
                            }}
                            onClick={handleUpdateCompany}
                            disabled={loader}
                        >
                            {loader ? 'Updating...' : 'Update Company'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditCompany;
