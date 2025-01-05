import React, { useCallback, useState } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png';
import Loader from '../../../Common/Loader';
import CloudImage from '../../../Assets/AdminImages/CloudImgae.png';
import { addTeamMember } from '../../../Lib/AboutContent';
import { Alert } from '../../../Common/Alert';
import { useContent } from '../../../Context/ContentContext';
import { useDropzone } from 'react-dropzone';
import AddTeamFarsi from './AddTeamFarsi';
import { useAddTeam } from '../../../AdminContext/AddTeamContext';

const AddTeam = ({ openAddTeam, handleCloseAddTeam }) => {
    const { fetchTeam } = useContent();
    const [loader, setLoader] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const { name, setName, designation, setDesignation, description, setDescription } = useAddTeam()

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleResetUpload = () => {
        setFileData(null);
        setFilePreview(null);
    };


    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        handleFileSelection(selectedFile);
    }, []);

    const handleFileSelection = (selectedFile) => {
        if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setFileData(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
        } else {
            alert('Only JPG and PNG files are allowed.');
        }
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxSize: 10485760, // 10MB
        noClick: true, // Disable the default click behavior
    });

    const handleClear = () => {
        setName('')
        setDescription('')
        setDesignation('')
        setFileData(null)
        setFilePreview(null)
    }
    const [errors, setErrors] = useState({
        name: '',
        designation: '',
        description: '',
    });

    const addTeam = async () => {
        let valid = true;
        let newErrors = {
            name: '',
            designation: '',
            description: '',
        };

        if (!name) {
            newErrors.name = 'Name is required';
            valid = false;
        }
        if (!designation) {
            newErrors.designation = 'Designation is required';
            valid = false;
        }
        if (!description) {
            newErrors.description = 'Description is required';
            valid = false;
        }

        setErrors(newErrors);
    
        if (!valid) return;

        handleOpenTeamFarsi()
    };

    const [openTeamFarsi, setOpenTeamFarsi] = useState(false);
    const handleOpenTeamFarsi = () => {
        setOpenTeamFarsi(true);
    }
    const handleCloseTeamFarsi = () => {
        setOpenTeamFarsi(false);
    }

    return (
        <div>
            <Modal
                open={openAddTeam}
                onClose={handleCloseAddTeam}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='AboutContentTeamModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            Team Add
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseAddTeam} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>

                    <Stack className='BorderLine'></Stack>
                    <Stack>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeadingTwo'>
                            Add Team Member
                        </Typography>
                    </Stack>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter name'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={name}
                                onChange={(e) => handleChange(e, setName)}
                                autoComplete='off'
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                Designation
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter designation'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={designation}
                                onChange={(e) => handleChange(e, setDesignation)}
                                autoComplete='off'
                                error={!!errors.designation}
                                helperText={errors.designation}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="body2" color="text.secondary" className='AboutContentHeadingThree'>
                                Description
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter description'
                                variant="standard"
                                className='AboutContentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={description}
                                onChange={(e) => handleChange(e, setDescription)}
                                autoComplete='off'
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                        </Grid>
                    </Grid>

                    <Stack className='AboutContentFieldCreateBlog'>
                        <Stack className='AboutContentButtonFormSubmit'>
                            {/* <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='AboutContentFormCancelButton'
                                onClick={handleCloseAddTeam}
                            >
                                Cancel
                            </Button> */}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='AboutContentFormCreateButton'
                                onClick={addTeam}
                            >
                                Continue
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
            <AddTeamFarsi openTeamFarsi={openTeamFarsi} handleCloseTeamFarsi={handleCloseTeamFarsi} handleCloseAddTeam={handleCloseAddTeam} />
        </div>
    );
};

export default AddTeam;
