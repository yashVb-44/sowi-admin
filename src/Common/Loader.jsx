import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../Assets/Images/logo.png'

const Loader = ({ loader, setLoader }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const handleClose = () => setLoader(false);

    return (
        <div>
            <Modal
                open={loader}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img src={logo} alt='Logo' style={{ width: '50px', height: 'auto', marginBottom: '16px' }} />
                    <CircularProgress />
                    <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '12px' }}>
                        Processing your request...
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Loader;
