import React, { useState, useMemo, useEffect } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../../../Common/Loader';
import ReactQuill from 'react-quill';
import { useContent } from '../../../Context/ContentContext';
import { updatePrivacyContent, updateTermsPrivacyContent } from '../../../Lib/TermsPrivacyContentApi';
import { Alert } from '../../../Common/Alert';


const PrivacyEdit = ({ openPrivacyEdit, handleClosePrivacyEdit }) => {

    const { settingContant, fetchSettingContent } = useContent()

    const [loader, setLoader] = useState(false);

    const [content, setContent] = useState('')

    const handleContent = (value) => {
        setContent(value)
    }

    const handleEdit = async () => {
        setLoader(true)
        let response = await updatePrivacyContent({privacy : content})
        try {
            if (response?.type === "success") {
                setTimeout(() => {
                    setLoader(false)
                    Alert('Success', response?.message, 'success')
                    handleClosePrivacyEdit()
                    fetchSettingContent()
                }, 2000);
            }
            else {
                setLoader(false)
                Alert('Info', response?.message, 'info')
                handleClosePrivacyEdit()
            }
        } catch (error) {
            setLoader(false)
            Alert('Info', response?.message, 'info')
            handleClosePrivacyEdit()
        }
    }

    useEffect(() => {
        setContent(settingContant?.privacy)
    }, [settingContant])



    return (
        <div>
            <Modal
                open={openPrivacyEdit}
                onClose={handleClosePrivacyEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='PrivacyContactContentModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            Edit Privacy Policy
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleClosePrivacyEdit} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>

                    <Stack className='BorderLine'></Stack>

                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                Content
                            </Typography>
                            <div style={{ width: '100%', height: 'auto' }}>
                                <ReactQuill
                                    placeholder="Enter content"
                                    value={content}
                                    onChange={handleContent}
                                    autoComplete='off'
                                    modules={{
                                        toolbar: [
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ 'color': [] }, { 'background': [] }],
                                            [{ 'align': [] }],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link', 'image'],
                                            ['clean']
                                        ],
                                    }}
                                    // formats={[
                                    //     'bold', 'italic', 'underline', 'strike',
                                    //     'color', 'background',
                                    //     'align',
                                    //     'list', 'bullet',
                                    //     'link', 'image'
                                    // ]}
                                    className='CreateBlogInputFiled'
                                />
                            </div>


                        </Grid>
                    </Grid>
                    <Stack className='AboutContentFieldCreateBlog'>
                        <Stack className='AboutContentButtonFormSubmit'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='AboutContentFormCancelButton'
                                onClick={handleClosePrivacyEdit}
                            >
                                Cancel
                            </Button>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className='AboutContentFormCreateButton'
                                onClick={handleEdit}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>

                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default PrivacyEdit;





