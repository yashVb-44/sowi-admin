import React, { useState } from 'react'
import './CategoryManagement.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import CategoryManagementTabel from './CategoryManagementTabel';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
const CategoryManagement = () => {

    const [openCategory, setOpenCategory] = useState(false);
    const handleOpenCategory = () => setOpenCategory(true);
    const handleCloseCategory = () => setOpenCategory(false);

    const [openCategoryEdit, setOpenCategoryEdit] = useState(false);
    const handleOpenCategoryEdit = () => setOpenCategoryEdit(true);
    const handleCloseCategoryEdit = () => setOpenCategoryEdit(false);

    return (
        <div className='CategoryMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CategoryMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='CategoryMangHeading'>
                        Category Management
                    </Typography>
                    <Button onClick={() => handleOpenCategory()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add Category</Button>
                </Stack>

                <CategoryManagementTabel handleOpenCategoryEdit={handleOpenCategoryEdit} />
            </Grid>

            <AddCategory openCategory={openCategory} handleCloseCategory={handleCloseCategory} />
            <EditCategory openCategoryEdit={openCategoryEdit} handleCloseCategoryEdit={handleCloseCategoryEdit} />

        </div>
    )
}

export default CategoryManagement
