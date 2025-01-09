import React, { useState } from 'react'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import CompanyManagementTabel from './CompanyManagementTable';
import EditCompany from './EditCompany';
import CreateCompany from './CreateCompany';

const CompanyManagement = () => {

    const [openCompanyCreate, setOpenCompanyCreate] = useState(false);
    const handleOpenCompanyCreate = () => setOpenCompanyCreate(true);
    const handleCloseCompanyCreate = () => setOpenCompanyCreate(false);

    const [openCompanyEdit, setOpenCompanyEdit] = useState(false);
    const handleOpenCompanyEdit = () => setOpenCompanyEdit(true);
    const handleCloseCompanyEdit = () => setOpenCompanyEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        Company Management
                    </Typography>
                    <Button onClick={() => handleOpenCompanyCreate()} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add Company</Button>
                </Stack>
                <CompanyManagementTabel handleOpenCompanyEdit={handleOpenCompanyEdit} />
            </Grid>
            <CreateCompany openCompanyCreate={openCompanyCreate} handleCloseCompanyCreate={handleCloseCompanyCreate} />
            <EditCompany openCompanyEdit={openCompanyEdit} handleCloseCompanyEdit={handleCloseCompanyEdit} />
        </div>
    )
}

export default CompanyManagement
