import React, { useState } from 'react';
import { Grid, Button, Modal, Box, Typography, IconButton, Stack } from '@mui/material';
import { Facebook, Twitter, WhatsApp, Link } from '@mui/icons-material';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import './ShareModal.css'
import CloseIcon from '@mui/icons-material/Close';
import AsyncTextRenderer from '../Context/AsyncTextRenderer';
import {  Tooltip } from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';


const ShareModal = ({ open, handleClose, projectId }) => {

    const url = window.location.href;
    const shareUrl = `${url}/${projectId}`
    const [openModal, setOpenModal] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(shareUrl);
        setOpenModal(true);
        setTimeout(() => {
            setOpenModal(false);
        }, 2000); // Tooltip will be visible for 2 seconds
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="share-modal-title"
            aria-describedby="share-modal-description"

        >
            <Box className='ShareModal'>
                <Stack className='ShareModalClose'>
                    <CloseIcon onClick={() => handleClose()} className='ShareModalCloseIcon' />
                </Stack>
                <Typography id="share-modal-title" className='ShareModalHeadingTwo' variant="h6" component="h2">
                    <AsyncTextRenderer text="Help by sharing" />
                </Typography>
                <Typography id="share-modal-title" className='ShareModalPara' variant="h6" component="h2">
                    <AsyncTextRenderer text="Fundraisers shared on social networks raise up to 5k more. Share using your unique links below." />
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6} className='shareText'>
                        <FacebookShareButton url={shareUrl}>
                            <IconButton color="primary">
                                <Facebook className='ShareIcon' />
                            </IconButton>
                        </FacebookShareButton>
                        <Typography className='ShareTextTwo'>
                            <AsyncTextRenderer text="Facebook" />
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className='shareText'>
                        <WhatsappShareButton url={shareUrl}>
                            <IconButton color="success">
                                <WhatsApp className='ShareIcon' />
                            </IconButton>
                        </WhatsappShareButton>
                        <Typography className='ShareTextTwo'>
                            <AsyncTextRenderer text="WhatsApp" />
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className='shareText'>
                        <TwitterShareButton url={shareUrl}>
                            <IconButton color="primary">
                                <Twitter className='ShareIcon' />
                            </IconButton>
                        </TwitterShareButton>
                        <Typography className='ShareTextTwo'>
                            <AsyncTextRenderer text="Twitter" />
                        </Typography>
                    </Grid>
                    <Tooltip
                        title="Link copied!"
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        disableHoverListener
                        disableFocusListener
                        disableTouchListener
                    >
                        <Grid item xs={6} className='shareText'>
                            <IconButton
                                color="primary"
                                onClick={handleCopyClick}
                                style={{ width: '50px', height: '50px' }}
                            >
                                <Link />
                            </IconButton>
                            <Typography className='ShareTextTwo'>
                                <AsyncTextRenderer text="Copy link" />
                            </Typography>
                        </Grid>
                    </Tooltip>
                </Grid>
            </Box>
        </Modal>
    );
};

export default ShareModal