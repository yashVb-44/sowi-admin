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

    const { editTermPrivacyData, fetchTermPrivacyContent } = useContent()

    const [loader, setLoader] = useState(false);

    const [title, setTitle] = useState()
    const [title2, setTitle2] = useState()
    const [content, setContent] = useState('')
    const [titleFarsi, setTitleFarsi] = useState()
    const [title2Farsi, setTitle2Farsi] = useState()
    const [contentFarsi, setContentFarsi] = useState('')

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }
    const handleContent = (value) => {
        setContent(value)
    }
    const handleContentFarsi = (value) => {
        setContentFarsi(value)
    }


    const handleEdit = async () => {
        setLoader(true)
        let response = await updateTermsContent(title, title2, content, titleFarsi, title2Farsi, contentFarsi, editTermPrivacyData?._id)
        try {
            if (response?.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    Alert('Success', response?.message, 'success')
                    handleCloseTermsEdit()
                    fetchTermPrivacyContent()
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
        setTitle(editTermPrivacyData?.en?.terms?.title)
        setTitle2(editTermPrivacyData?.en?.terms?.subTitle)
        setContent(editTermPrivacyData?.en?.terms?.content)
        //Farsi
        setTitleFarsi(editTermPrivacyData?.fa?.terms?.title)
        setTitle2Farsi(editTermPrivacyData?.fa?.terms?.subTitle)
        setContentFarsi(editTermPrivacyData?.fa?.terms?.content)
    }, [editTermPrivacyData])



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

                    <Stack className=''>
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
                    </Stack>

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
                        <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: '30px' }} className='CreateBlogFields'>
                            <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                محتوا
                            </Typography>
                            <div style={{ width: '100%', height: 'auto' }}>
                                <ReactQuill
                                    placeholder="محتوا را وارد کنید"
                                    value={contentFarsi}
                                    onChange={handleContentFarsi}
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
