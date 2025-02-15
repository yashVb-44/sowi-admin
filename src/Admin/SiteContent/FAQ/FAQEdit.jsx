import React, { useState, useEffect } from 'react';
import { Stack, Grid, TextField, Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../../Common/Loader';
import { Alert } from '../../../Common/Alert';
import { useContent } from '../../../Context/ContentContext';
import { updateFAQContent } from '../../../Lib/TermsPrivacyContentApi';  // Update API function

const FAQEdit = ({ openFAQEdit, handleCloseFAQEdit }) => {
    const { settingContant, fetchSettingContent } = useContent();
    const [loader, setLoader] = useState(false);
    const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);

    useEffect(() => {
        setFaqs(settingContant?.faqs || [{ question: '', answer: '' }]);
    }, [settingContant]);

    const handleFAQChange = (index, field, value) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index][field] = value;
        setFaqs(updatedFaqs);
    };

    const handleCloseFAQEditBtn = () => {
        fetchSettingContent()
        handleCloseFAQEdit()
    }

    const addFAQ = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
    };

    const removeFAQ = (index) => {
        const updatedFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(updatedFaqs);
    };

    const handleEdit = async () => {
        setLoader(true);
        let response = await updateFAQContent({ faqs });

        try {
            if (response?.type === "success") {
                setTimeout(() => {
                    setLoader(false);
                    Alert('Success', response?.message, 'success');
                    handleCloseFAQEdit();
                    fetchSettingContent();
                }, 2000);
            } else {
                setLoader(false);
                Alert('Info', response?.message, 'info');
                handleCloseFAQEdit();
            }
        } catch (error) {
            setLoader(false);
            Alert('Info', response?.message, 'info');
            handleCloseFAQEdit();
        }
    };

    return (
        <div>
            <Modal
                open={openFAQEdit}
                onClose={handleCloseFAQEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='PrivacyContactContentModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            Edit FAQs
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseFAQEdit} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>

                    <Stack className='BorderLine'></Stack>

                    <Grid container spacing={2}>
                        {faqs.map((faq, index) => (
                            <Grid item xs={12} key={index} className='CreateBlogFields'>
                                <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                    Question {index + 1}
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter question"
                                    value={faq.question}
                                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                                    className='CreateBlogInputFiled'
                                />
                                <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                    Answer
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter answer"
                                    multiline
                                    rows={3}
                                    value={faq.answer}
                                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                                    className='CreateBlogInputFiled'
                                />
                                {faqs.length > 1 && <IconButton onClick={() => removeFAQ(index)} color="error">
                                    <DeleteIcon />
                                </IconButton>}
                            </Grid>
                        ))}
                    </Grid>

                    <Stack className='AboutContentFieldCreateBlog'>
                        <Button variant="contained" onClick={addFAQ} className='AboutContentFormCreateButton'>
                            + Add FAQ
                        </Button>
                    </Stack>

                    <Stack className='AboutContentButtonFormSubmit'>
                        <Button
                            variant="contained"
                            className='AboutContentFormCancelButton'
                            onClick={handleCloseFAQEditBtn}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className='AboutContentFormCreateButton'
                            onClick={handleEdit}
                        >
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
        </div>
    );
};

export default FAQEdit;
