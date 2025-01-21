import React, { useState } from 'react'
// import './VendorManagement.css'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import VendorManagementTabel from './VendorManagementTabel';
import EditVendor from './EditVendor';

const VendorManagement = () => {

    const [openVendorEdit, setOpenVendorEdit] = useState(false);
    const handleOpenVendorEdit = () => setOpenVendorEdit(true);
    const handleCloseVendorEdit = () => setOpenVendorEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Vendor Management
                    </Typography>
                </Stack>
                <VendorManagementTabel handleOpenVendorEdit={handleOpenVendorEdit} />
            </Grid>
            <EditVendor openVendorEdit={openVendorEdit} handleCloseVendorEdit={handleCloseVendorEdit} />
        </div>
    )
}

export default VendorManagement
