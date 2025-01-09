import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import ExpenseCategoryManagementTabel from './ExpenseCategoryManagementTable';
import EditExpenseCategory from './EditExpenseCategory';
import CreateExpenseCategory from './CreateExpenseCategory';

const ExpenseCategoryManagement = () => {

    const [openExpenseCategoryCreate, setOpenExpenseCategoryCreate] = useState(false);
    const handleOpenExpenseCategoryCreate = () => setOpenExpenseCategoryCreate(true);
    const handleCloseExpenseCategoryCreate = () => setOpenExpenseCategoryCreate(false);

    const [openExpenseCategoryEdit, setOpenExpenseCategoryEdit] = useState(false);
    const handleOpenExpenseCategoryEdit = () => setOpenExpenseCategoryEdit(true);
    const handleCloseExpenseCategoryEdit = () => setOpenExpenseCategoryEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Expense Category Management
                    </Typography>
                    <Button onClick={() => handleOpenExpenseCategoryCreate()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add Expense Category</Button>
                </Stack>
                <ExpenseCategoryManagementTabel handleOpenExpenseCategoryEdit={handleOpenExpenseCategoryEdit} />
            </Grid>
            <CreateExpenseCategory openExpenseCategoryCreate={openExpenseCategoryCreate} handleCloseExpenseCategoryCreate={handleCloseExpenseCategoryCreate} />
            <EditExpenseCategory openExpenseCategoryEdit={openExpenseCategoryEdit} handleCloseExpenseCategoryEdit={handleCloseExpenseCategoryEdit} />
        </div>
    )
}

export default ExpenseCategoryManagement
