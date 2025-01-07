import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import ShopServiceManagementTabel from './ShopServiceManagementTable';
import EditShopService from './EditShopService';

const ShopServiceManagement = () => {

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
                </Stack>
                <ShopServiceManagementTabel handleOpenShopServiceEdit={handleOpenShopServiceEdit} />
            </Grid>
            <EditShopService openShopServiceEdit={openShopServiceEdit} handleCloseShopServiceEdit={handleCloseShopServiceEdit} />
        </div>
    )
}

export default ShopServiceManagement
