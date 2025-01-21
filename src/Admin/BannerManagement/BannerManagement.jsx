import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import BannerManagementTabel from './BannerManagementTable';
import EditBanner from './EditBanner';
import CreateBanner from './CreateBanner';

const BannerManagement = () => {

    const [openBannerCreate, setOpenBannerCreate] = useState(false);
    const handleOpenBannerCreate = () => setOpenBannerCreate(true);
    const handleCloseBannerCreate = () => setOpenBannerCreate(false);

    const [openBannerEdit, setOpenBannerEdit] = useState(false);
    const handleOpenBannerEdit = () => setOpenBannerEdit(true);
    const handleCloseBannerEdit = () => setOpenBannerEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Banner Management
                    </Typography>
                    <Button onClick={() => handleOpenBannerCreate()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add Banner</Button>
                </Stack>
                <BannerManagementTabel handleOpenBannerEdit={handleOpenBannerEdit} />
            </Grid>
            <CreateBanner openBannerCreate={openBannerCreate} handleCloseBannerCreate={handleCloseBannerCreate} />
            <EditBanner openBannerEdit={openBannerEdit} handleCloseBannerEdit={handleCloseBannerEdit} />
        </div>
    )
}

export default BannerManagement
