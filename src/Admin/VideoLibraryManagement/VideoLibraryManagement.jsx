import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import VideoLibraryManagementTabel from './VideoLibraryManagementTable';
import EditVideoLibrary from './EditVideoLibrary';
import CreateVideoLibrary from './CreateVideoLibrary';

const VideoLibraryManagement = () => {

    const [openVideoLibraryCreate, setOpenVideoLibraryCreate] = useState(false);
    const handleOpenVideoLibraryCreate = () => setOpenVideoLibraryCreate(true);
    const handleCloseVideoLibraryCreate = () => setOpenVideoLibraryCreate(false);

    const [openVideoLibraryEdit, setOpenVideoLibraryEdit] = useState(false);
    const handleOpenVideoLibraryEdit = () => setOpenVideoLibraryEdit(true);
    const handleCloseVideoLibraryEdit = () => setOpenVideoLibraryEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Video-Library Management
                    </Typography>
                    <Button onClick={() => handleOpenVideoLibraryCreate()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add VideoLibrary</Button>
                </Stack>
                <VideoLibraryManagementTabel handleOpenVideoLibraryEdit={handleOpenVideoLibraryEdit} />
            </Grid>
            <CreateVideoLibrary openVideoLibraryCreate={openVideoLibraryCreate} handleCloseVideoLibraryCreate={handleCloseVideoLibraryCreate} />
            <EditVideoLibrary openVideoLibraryEdit={openVideoLibraryEdit} handleCloseVideoLibraryEdit={handleCloseVideoLibraryEdit} />
        </div>
    )
}

export default VideoLibraryManagement
