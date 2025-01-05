import React, { useState } from 'react'
import './BlogManagement.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BlogManagementTabel from './BlogManagementTabel';
import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';
const BlogManagement = () => {

    const [openBlog, setOpenBlog] = useState(false);
    const handleOpenBlog = () => setOpenBlog(true);
    const handleCloseBlog = () => setOpenBlog(false);

    const [openBlogEdit, setOpenBlogEdit] = useState(false);
    const handleOpenBlogEdit = () => setOpenBlogEdit(true);
    const handleCloseBlogEdit = () => setOpenBlogEdit(false);

    return (
        <div className='CategoryMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CategoryMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='BlogMangHeading'>
                        Blog Management
                    </Typography>
                    <Button onClick={() => handleOpenBlog()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add Blog</Button>
                </Stack>

                <BlogManagementTabel handleOpenBlogEdit={handleOpenBlogEdit} />
            </Grid>

            <CreateBlog openBlog={openBlog} handleCloseBlog={handleCloseBlog} />
            <EditBlog openBlogEdit={openBlogEdit} handleCloseBlogEdit={handleCloseBlogEdit} />

        </div>
    )
}

export default BlogManagement
