import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import './CreateCategory.css';
import CloseIcon from '@mui/icons-material/Close';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllCategory, updateCategory } from '../../Lib/CategorysApi';
import { useCategorySection } from '../../Context/CategoryDetails';


const EditCategory = ({ openCategoryEdit, handleCloseCategoryEdit }) => {
    const { editData } = useAddProject();
    const { setCategoryData, page, rowsPerPage, searchQuery } = useCategorySection()

    const [loader, setLoader] = useState(false);

    // Fields from the response
    const [name, setName] = useState('');
    const [createBy, setCreateBy] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [errors, setErrors] = useState({

        name: '',
        createBy: '',
        mobileNo: '',
        country: '',
        language: '',
        role: '',
        dateOfBirth: '',
        file: '',
    });

    useEffect(() => {
        setName(editData?.name);
        setCreateBy(editData?.createdBy);
        setIsActive(editData?.isActive);
        setIsDeleted(editData?.isDeleted);
    }, [editData]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleCancelCategory = () => {
        handleCloseCategoryEdit();
    };

    const fetchCategory = async () => {
        let response = await getAllCategory({ page, search: searchQuery, limit: rowsPerPage });
        setCategoryData(response?.categories || []);
    };

    const handleUpdateCategory = async () => {
        setLoader(true);
        try {
            let response = await updateCategory({
                name,
                isActive,
                isDeleted,
                categoryId: editData?._id
            });

            if (response.type === "success") {
                setLoader(false);
                fetchCategory();
                setTimeout(() => {
                    handleCloseCategoryEdit();
                    Alert('Success', 'Category Updated successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleCloseCategoryEdit();
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleCloseCategoryEdit();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    return (
        <div>
            <Modal
                open={openCategoryEdit}
                onClose={handleCloseCategoryEdit}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Edit Category
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseCategoryEdit()} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        Category Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Name
                            </Typography>
                            <TextField
                                id="standard-required"
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
                            onClick={handleUpdateCategory}
                            disabled={loader}
                        >
                            {loader ? 'Updating...' : 'Update Category'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditCategory;
