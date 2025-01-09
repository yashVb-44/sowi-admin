import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import './CreateExpenseCategory.css';
import CloseIcon from '@mui/icons-material/Close';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllExpenseCategory, updateExpenseCategory } from '../../Lib/ExpenseCategorysApi';
import { useExpenseCategorySection } from '../../Context/ExpenseCategoryDetails';


const EditExpenseCategory = ({ openExpenseCategoryEdit, handleCloseExpenseCategoryEdit }) => {
    const { editData } = useAddProject();
    const { setExpenseCategoryData, page, rowsPerPage, searchQuery } = useExpenseCategorySection()

    const [loader, setLoader] = useState(false);

    // Fields from the response
    const [name, setName] = useState('');
    const [createBy, setCreateBy] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
    });

    useEffect(() => {
        setName(editData?.name);
        setCreateBy(editData?.createdBy);
        setIsActive(editData?.isActive);
        setIsDeleted(editData?.isDeleted);
    }, [editData]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear error for the field
    };

    const handleCancelExpenseCategory = () => {
        handleCloseExpenseCategoryEdit();
    };

    const fetchExpenseCategory = async () => {
        let response = await getAllExpenseCategory({ page, search: searchQuery, limit: rowsPerPage });
        setExpenseCategoryData(response?.categories || []);
    };

    const validateFields = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleUpdateExpenseCategory = async () => {
        if (!validateFields()) return; // Exit if validation fails
        setLoader(true);
        try {
            let response = await updateExpenseCategory({
                name,
                isActive,
                isDeleted,
                expenseCategoryId: editData?._id
            });

            if (response.type === "success") {
                setLoader(false);
                fetchExpenseCategory();
                setTimeout(() => {
                    handleCloseExpenseCategoryEdit();
                    Alert('Success', 'Expense Category Updated successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleCloseExpenseCategoryEdit();
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleCloseExpenseCategoryEdit();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    return (
        <div>
            <Modal
                open={openExpenseCategoryEdit}
                onClose={handleCloseExpenseCategoryEdit}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Edit ExpenseCategory
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseExpenseCategoryEdit()} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        Expense Category Details
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
                            onClick={handleUpdateExpenseCategory}
                            disabled={loader}
                        >
                            {loader ? 'Updating...' : 'Update Expense Category'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditExpenseCategory;
