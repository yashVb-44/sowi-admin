import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import SupportManagementTabel from './SupportManagementTable';
import EditSupport from './EditSupport';

const SupportManagement = () => {

    const [openSupportCreate, setOpenSupportCreate] = useState(false);
    const handleOpenSupportCreate = () => setOpenSupportCreate(true);
    const handleCloseSupportCreate = () => setOpenSupportCreate(false);

    const [openSupportEdit, setOpenSupportEdit] = useState(false);
    const handleOpenSupportEdit = () => setOpenSupportEdit(true);
    const handleCloseSupportEdit = () => setOpenSupportEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Technical Support Management
                    </Typography>
                    {/* <Button onClick={() => handleOpenSupportCreate()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add Support</Button> */}
                </Stack>
                <SupportManagementTabel handleOpenSupportEdit={handleOpenSupportEdit} />
            </Grid>
            {/* <CreateSupport openSupportCreate={openSupportCreate} handleCloseSupportCreate={handleCloseSupportCreate} /> */}
            <EditSupport openSupportEdit={openSupportEdit} handleCloseSupportEdit={handleCloseSupportEdit} />
        </div>
    )
}

export default SupportManagement
