import React, { useState } from 'react'
import { Stack, Grid, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './ViewProject.css'
import CloseIcon from '@mui/icons-material/Close';
import EditIconGreen from '../../Assets/AdminImages/EditIconGreen.png'
import { useProjectList } from '../../Context/ProjectListContext';
import { useAddProject } from '../../AdminContext/AddProjectContext';

const ViewProject = ({ openView, handleCloseView, handleOpenEdit }) => {

    const { projectViewData } = useProjectList()
    const { setEditData } = useAddProject();

    const handleAddProject = () => {
        handleCloseView()
    }
    const handleCancelProject = () => {
        handleCloseView()
    }

    const handleEdit = (row) => {
        setEditData(row)
        handleOpenEdit(row)
        handleCloseView()
    };


    return (
        <div>
            <Modal
                open={openView}
                onClose={handleCloseView}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='ViewProjectModal'>
                    <Stack className='ViewProjectDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='ViewProjectSubHeading'>
                            View Project
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseView()} className='AddProjectCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='ViewProjectDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='ViewProjectHeading'>
                            {projectViewData?.en?.title}
                        </Typography>
                        <Stack className='ProjectViewEditButton' onClick={() => handleEdit(projectViewData)} sx={{cursor:'pointer'}}>
                            <img src={EditIconGreen} alt='Edit Icon' />
                            <Typography className='ProjectViewEditButtonText' >Edit Project</Typography>
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>



                    <Typography className='ViewProjectHeadingTwo'>
                        Target Amount
                    </Typography>
                    <Typography className='ViewProjectPara'>
                        ${projectViewData?.en?.goalAmount}
                    </Typography>

                    <Typography className='ViewProjectHeadingTwo'>
                        Description
                    </Typography>
                    <Typography className='ViewProjectPara'>
                        {projectViewData?.en?.description}
                    </Typography>


                    <Stack>
                        <Typography className='ViewProjectHeadingThree'>
                            Organisation Details :
                        </Typography>
                        <Grid container className='ViewProjectFields'>
                            <Grid item xs={6} md={4} lg={4}>
                                <Typography variant="body2" className='AddProjectInputLabel'>
                                    Organisation Name
                                </Typography>
                                <Typography className='AddProjectInputText'>
                                    {projectViewData?.en?.organisationName}
                                </Typography>

                            </Grid>
                            <Grid item xs={6} md={4} lg={4}>
                                <Typography variant="body2" className='AddProjectInputLabel'>
                                    Organiser Name
                                </Typography>
                                <Typography className='AddProjectInputText'>
                                    {projectViewData?.en?.organiserName}
                                </Typography>

                            </Grid>
                            <Grid item xs={6} md={4} lg={4}>
                                <Typography variant="body2" className='AddProjectInputLabel'>
                                    Contact
                                </Typography>
                                <Typography className='AddProjectInputText'>
                                    {projectViewData?.en?.email}
                                </Typography>

                            </Grid>
                        </Grid>

                    </Stack>
                    
                    <Stack className='ViewProjectImageCenter'>
                        <img src={projectViewData?.en?.documentUrl} alt='' className='ViewProjectImage' />
                    </Stack>
                    {/* <Stack>
                        <Typography className='ViewProjectHeadingThree'>
                            Organisation details :
                        </Typography>
                        <Grid container className='ViewProjectFields'>
                            <Grid item xs={6} md={6} lg={6}>
                                <Typography variant="body2" className='AddProjectInputLabel'>
                                    Payment for
                                </Typography>
                                <Typography className='AddProjectInputText'>
                                    For Self
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Typography variant="body2" className='AddProjectInputLabel'>
                                    Account number
                                </Typography>
                                <Typography className='AddProjectInputText'>
                                    {projectViewData?.bankDetails?.accountNumber}

                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Typography variant="body2" className='AddProjectInputLabel'>
                                    Account holder's name
                                </Typography>
                                <Typography className='AddProjectInputText'>
                                    {projectViewData?.bankDetails?.accountHolderName}

                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Typography variant="body2" className='AddProjectInputLabel'>
                                    Contact number
                                </Typography>
                                <Typography className='AddProjectInputText'>
                                    {projectViewData?.bankDetails?.contactNumber}

                                </Typography>
                            </Grid>

                        </Grid>

                    </Stack> */}




                    {/* <Stack className='ViewProjectMarginTop'></Stack> */}
                    <Stack className='FormSubmitFieldAddProject'>
                        <Stack className='AddProjectButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormCancelButtonAddProject'
                                onClick={() => handleCancelProject()}
                            >
                                Cancel
                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='FormSubmitButtonAddProject'
                                onClick={() => handleAddProject()}
                            >
                                Okay
                            </Button>
                        </Stack>
                    </Stack>

                </Box>
            </Modal>
        </div >
    )
}

export default ViewProject
