import React, { useState } from 'react'
// import './UserManagement.css'
import '../Common/CommonStyle.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import UserManagementTabel from './UserManagementTabel';
import EditUser from './EditUser';

const UserManagement = () => {

    const [openUserEdit, setOpenUserEdit] = useState(false);
    const handleOpenUserEdit = () => setOpenUserEdit(true);
    const handleCloseUserEdit = () => setOpenUserEdit(false);

    return (
        <div className='Common'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='CommonText'>
                    <Typography gutterBottom variant="h5" component="div" className='CommonHeading'>
                        User Management
                    </Typography>
                </Stack>
                <UserManagementTabel handleOpenUserEdit={handleOpenUserEdit} />
            </Grid>
            <EditUser openUserEdit={openUserEdit} handleCloseUserEdit={handleCloseUserEdit} />
        </div>
    )
}

export default UserManagement
