import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import ShopServiceManagementTabel from './ShopServiceManagementTable';
import EditShopService from './EditShopService';
import CreateShopService from './CreateShopService';

const ShopServiceManagement = () => {

    const [openShopServiceCreate, setOpenShopServiceCreate] = useState(false);
    const handleOpenShopServiceCreate = () => setOpenShopServiceCreate(true);
    const handleCloseShopServiceCreate = () => setOpenShopServiceCreate(false);

    const [openShopServiceEdit, setOpenShopServiceEdit] = useState(false);
    const handleOpenShopServiceEdit = () => setOpenShopServiceEdit(true);
    const handleCloseShopServiceEdit = () => setOpenShopServiceEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Shop-Service Management
                    </Typography>
                    <Button onClick={() => handleOpenShopServiceCreate()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add ShopService</Button>
                </Stack>
                <ShopServiceManagementTabel handleOpenShopServiceEdit={handleOpenShopServiceEdit} />
            </Grid>
            <CreateShopService openShopServiceCreate={openShopServiceCreate} handleCloseShopServiceCreate={handleCloseShopServiceCreate} />
            <EditShopService openShopServiceEdit={openShopServiceEdit} handleCloseShopServiceEdit={handleCloseShopServiceEdit} />
        </div>
    )
}

export default ShopServiceManagement
