import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Stack, TextField, Box } from '@mui/material';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import './FAQ.css'
import FAQEdit from './FAQEdit';
import { useContent } from '../../../Context/ContentContext';

const FAQ = () => {

    const { settingContant, fetchSettingContent } = useContent()

    const [openFAQEdit, setOpenFAQEdit] = useState(false);
    const handleOpenFAQEdit = () => setOpenFAQEdit(true);
    const handleCloseFAQEdit = () => {
        setOpenFAQEdit(false)
    }

    useEffect(() => {
        fetchSettingContent()
    }, [])

    return (
        <div className='HomeContentMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='HomeContentMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='HomeContentHeading'>
                        FAQ Policy
                    </Typography>
                </Stack>

                <Stack className='HomeContentSite'>

                    {/* Part 1 */}
                    <Stack className='FAQContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingThree'>FAQ Policy Content</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenFAQEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>

                        <Grid container spacing={2}>
                            {settingContant?.faqs?.map((faq, index) => (
                                <Grid item xs={12} key={index} className='CreateBlogFields'>
                                    <Typography variant="body2" color="text.secondary" className='CreateBlogInputLabel'>
                                        Question {index + 1}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter question"
                                        value={faq.question}
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
                                        className='CreateBlogInputFiled'
                                    />
                                </Grid>
                            ))}
                        </Grid>

                    </Stack>
                </Stack>
            </Grid>
            <FAQEdit openFAQEdit={openFAQEdit} handleCloseFAQEdit={handleCloseFAQEdit} />

        </div>
    );
}

export default FAQ;
