import React, { useState, useMemo, useEffect } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../../../Common/Loader';
import ReactQuill from 'react-quill';
import { useContent } from '../../../Context/ContentContext';
import { Alert } from '../../../Common/Alert';
import { updateTermsContent } from '../../../Lib/TermsPrivacyContentApi';


const TermsEdit = ({ openTermsEdit, handleCloseTermsEdit }) => {

    const { settingContant, fetchSettingContent } = useContent()

    const [loader, setLoader] = useState(false);

    const [title, setTitle] = useState()
    const [title2, setTitle2] = useState()
    const [content, setContent] = useState('')
    const [invoiceContent, setInvoiceContent] = useState('')
    const [titleFarsi, setTitleFarsi] = useState()
    const [title2Farsi, setTitle2Farsi] = useState()
    const [contentFarsi, setContentFarsi] = useState('')

    const handleContent = (value) => {
        setContent(value)
    }

    const handleInoviceContent = (value) => {
        setInvoiceContent(value)
    }


    const handleEdit = async () => {
        setLoader(true)
        let response = await updateTermsContent({ terms: content, invoiceTerms: invoiceContent })
        console.log(response)
        try {
            if (response?.type === "success") {
                setTimeout(() => {
                    setLoader(false)
                    Alert('Success', response?.message, 'success')
                    handleCloseTermsEdit()
                    fetchSettingContent()
                }, 2000);
            }
            else {
                setLoader(false)
                Alert('Info', response?.message, 'info')
                handleCloseTermsEdit()
            }
        } catch (error) {
            setLoader(false)
            Alert('Info', response?.message, 'info')
            handleCloseTermsEdit()
        }
    }

    useEffect(() => {
        setContent(settingContant?.terms)
        setInvoiceContent(settingContant?.invoiceTerms)
    }, [settingContant])



    return (
        <div>
            <Modal
                open={openTermsEdit}
                onClose={handleCloseTermsEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='TermsContactContentModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            Edit Terms
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseTermsEdit} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>

                    <Stack className='BorderLine'></Stack>

                    {/* <Stack className=''>
                        <Stack>
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>Hero Banner</Typography>
                            </Stack>
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree '>Title</Typography>
                            <TextField
                                className='HomeContentInputFiled '
                                value={title}
                                onChange={(e) => handleChange(e, setTitle)}
                                variant="standard"
                                fullWidth
                                placeholder='Enter Title'
                                InputProps={{ disableUnderline: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree '>عنوان</Typography>
                            <TextField
                                className='HomeContentInputFiled '
                                value={titleFarsi}
                                onChange={(e) => handleChange(e, setTitleFarsi)}
                                variant="standard"
                                fullWidth
                                placeholder='عنوان را وارد کنید'
                                InputProps={{ disableUnderline: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Sub Title 2</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={title2}
                                onChange={(e) => handleChange(e, setTitle2)}
                                variant="standard"
                                fullWidth
                                multiline
                                placeholder='Enter Sub Title 2'
                                rows={4}
                                InputProps={{ disableUnderline: true }}
                            />
                        </Stack>

                        <Stack>
                            <Typography className='HomeContentHeadingThree'>عنوان فرعی 2</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={title2Farsi}
                                onChange={(e) => handleChange(e, setTitle2Farsi)}
                                variant="standard"
                                fullWidth
                                multiline
                                placeholder='عنوان فرعی 2 را وارد کنید'
                                rows={4}
                                InputProps={{ disableUnderline: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>


                        <Stack className='AboutContentFieldCreateBlog'>
                            <Stack className='AboutContentButtonFormSubmit'>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    className='AboutContentFormCancelButton'
                                    onClick={handleCloseTermsEdit}
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
                    </Stack> */}

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
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                Content
                            </Typography>
                            <div style={{ width: '100%', height: 'auto' }}>
                                <ReactQuill
                                    placeholder="Enter content"
                                    value={invoiceContent}
                                    onChange={handleInoviceContent}
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
                                onClick={handleCloseTermsEdit}
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

export default TermsEdit;
