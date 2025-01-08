import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import CategoryManagementTabel from './CategoryManagementTable';
import EditCategory from './EditCategory';
import CreateCategory from './CreateCategory';

const CategoryManagement = () => {

    const [openCategoryCreate, setOpenCategoryCreate] = useState(false);
    const handleOpenCategoryCreate = () => setOpenCategoryCreate(true);
    const handleCloseCategoryCreate = () => setOpenCategoryCreate(false);

    const [openCategoryEdit, setOpenCategoryEdit] = useState(false);
    const handleOpenCategoryEdit = () => setOpenCategoryEdit(true);
    const handleCloseCategoryEdit = () => setOpenCategoryEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Category Management
                    </Typography>
                    <Button onClick={() => handleOpenCategoryCreate()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add Category</Button>
                </Stack>
                <CategoryManagementTabel handleOpenCategoryEdit={handleOpenCategoryEdit} />
            </Grid>
            <CreateCategory openCategoryCreate={openCategoryCreate} handleCloseCategoryCreate={handleCloseCategoryCreate} />
            <EditCategory openCategoryEdit={openCategoryEdit} handleCloseCategoryEdit={handleCloseCategoryEdit} />
        </div>
    )
}

export default CategoryManagement
