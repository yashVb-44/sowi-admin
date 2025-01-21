import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import './CreateSupport.css';
import CloseIcon from '@mui/icons-material/Close';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import { getAllSupport, updateSupport } from '../../Lib/SupportApi';
import { useSupportSection } from '../../Context/SupportDetails';


const EditSupport = ({ openSupportEdit, handleCloseSupportEdit }) => {
    const { editData, setEditData } = useAddProject();
    const { setSupportData, page, rowsPerPage, searchQuery } = useSupportSection()

    const [loader, setLoader] = useState(false);

    // Fields from the response
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')
    const [createBy, setCreateBy] = useState('');
    const [status, setStatus] = useState("0")
    const [errors, setErrors] = useState({

        name: '',
    });

    useEffect(() => {
        setName(editData?.name || '');
        setMobileNo(editData?.mobileNo)
        setEmail(editData?.email)
        setSubject(editData?.subject)
        setMessage(editData?.message)
        setResponse(editData?.response)
        setCreateBy(editData?.customerModel || '');
        setStatus(editData?.status || '')
    }, [editData]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleCancelSupport = () => {
        handleCloseSupportEdit();
    };

    const fetchSupport = async () => {
        let response = await getAllSupport({ page, search: searchQuery, limit: rowsPerPage });
        setSupportData(response?.supportData || []);
    };

    const handleUpdateSupport = async () => {
        setLoader(true);
        try {
            let apiResponse = await updateSupport({
                response,
                status,
                supportId: editData?._id
            });

            if (apiResponse.type === "success") {
                setLoader(false);
                fetchSupport();
                setTimeout(() => {
                    handleModelClose();
                    Alert('Success', 'Technical Support Updated successfully', 'success');
                }, 100);
            } else {
                setLoader(false);
                handleModelClose();
                Alert('Info', 'Unable to process your request, Please try later!', 'info');
            }
        } catch (error) {
            setLoader(false);
            handleModelClose();
            Alert('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    const resetForm = () => {
        setName('');
        setErrors({});
    }

    const handleModelClose = () => {
        handleCloseSupportEdit()
        setEditData()
        resetForm()
    }

    return (
        <div>
            <Modal
                open={openSupportEdit}
                onClose={handleModelClose}
                aria-labelledby="modal-modal-name"
                aria-describedby="modal-modal-description"
            >
                <Box className="CreateCommonModal">
                    <Stack className="CreateCommonDetail">
                        <Typography id="modal-modal-name" variant="h6" component="h2" className="CreateCommonHeading">
                            Edit Technical Support
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleModelClose()} className="CreateCommonCloseIcon" />
                        </Stack>
                    </Stack>
                    <Stack className="BorderLine"></Stack>

                    <Typography id="modal-modal-name" variant="h6" component="h2" sx={{ marginTop: '3%' }} className="CreateCommonHeadingTwo">
                        Technical Support Details
                    </Typography>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Name
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                // placeholder="Enter name"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={name}
                                onChange={(e) => handleChange(e, setName)}
                                autoComplete="off"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Create By
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                placeholder="Enter createBy"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={createBy}
                                onChange={(e) => handleChange(e, setCreateBy)}
                                autoComplete="off"
                                error={!!errors.createBy}
                                helperText={errors.createBy}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Mobile Number
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                // placeholder="Enter mobile number"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={mobileNo}
                                onChange={(e) => handleChange(e, setEmail)}
                                autoComplete="off"
                                error={!!errors.mobileNo}
                                helperText={errors.mobileNo}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Email
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                // placeholder="Enter email"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={email}
                                onChange={(e) => handleChange(e, setEmail)}
                                autoComplete="off"
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Subject
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                InputProps={{ disableUnderline: true }}
                                value={subject}
                                onChange={(e) => handleChange(e, setSubject)}
                                autoComplete="off"
                                error={!!errors.subject}
                                helperText={errors.subject}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Message
                            </Typography>
                            <TextField
                                disabled
                                id="standard-required"
                                variant="standard"
                                className="CreateCommonInputFiled"
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true }}
                                value={message}
                                onChange={(e) => handleChange(e, setMessage)}
                                autoComplete="off"
                                error={!!errors.message}
                                helperText={errors.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Response (Solution)
                            </Typography>
                            <TextField
                                id="standard-required"
                                variant="standard"
                                placeholder='Enter your response here'
                                className="CreateCommonInputFiled"
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true }}
                                value={response}
                                onChange={(e) => handleChange(e, setResponse)}
                                autoComplete="off"
                                error={!!errors.response}
                                helperText={errors.response}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ paddingRight: '30px' }}>
                        <Grid item xs={12} md={6} lg={6} className="CreateCommonFields">
                            <Typography variant="body2" color="text.secondary" className="CreateCommonInputLabel">
                                Status
                            </Typography>
                            <Select
                                value={status}
                                onChange={(e) => handleChange(e, setStatus)}
                                className="CreateCommonInputFiled"
                                error={!!errors.gender}
                                displayEmpty
                            >
                                <MenuItem value="0">Pending</MenuItem>
                                <MenuItem value="1">Approved</MenuItem>
                                <MenuItem value="2">Rejected</MenuItem>
                                <MenuItem value="3">Ongoing</MenuItem>
                                <MenuItem value="4">Completed</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                textTransform: 'none',
                                borderRadius: '4px',
                                padding: '6px 20px',
                            }}
                            onClick={handleUpdateSupport}
                            disabled={loader}
                        >
                            {loader ? 'Updating...' : 'Update Support'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditSupport;
