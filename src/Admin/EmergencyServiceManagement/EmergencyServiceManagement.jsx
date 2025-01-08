import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import EmergencyServiceManagementTabel from './EmergencyServiceManagementTable';
import EditEmergencyService from './EditEmergencyService';
import CreateEmergencyService from './CreateEmergencyService';

const EmergencyServiceManagement = () => {

    const [openEmergencyServiceCreate, setOpenEmergencyServiceCreate] = useState(false);
    const handleOpenEmergencyServiceCreate = () => setOpenEmergencyServiceCreate(true);
    const handleCloseEmergencyServiceCreate = () => setOpenEmergencyServiceCreate(false);

    const [openEmergencyServiceEdit, setOpenEmergencyServiceEdit] = useState(false);
    const handleOpenEmergencyServiceEdit = () => setOpenEmergencyServiceEdit(true);
    const handleCloseEmergencyServiceEdit = () => setOpenEmergencyServiceEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Emergency-Service Management
                    </Typography>
                    <Button onClick={() => handleOpenEmergencyServiceCreate()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add EmergencyService</Button>
                </Stack>
                <EmergencyServiceManagementTabel handleOpenEmergencyServiceEdit={handleOpenEmergencyServiceEdit} />
            </Grid>
            <CreateEmergencyService openEmergencyServiceCreate={openEmergencyServiceCreate} handleCloseEmergencyServiceCreate={handleCloseEmergencyServiceCreate} />
            <EditEmergencyService openEmergencyServiceEdit={openEmergencyServiceEdit} handleCloseEmergencyServiceEdit={handleCloseEmergencyServiceEdit} />
        </div>
    )
}

export default EmergencyServiceManagement
