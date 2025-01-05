import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Stack, TextField, Box } from '@mui/material';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import './Terms.css'
import TermsEdit from './TermsEdit';
import { useContent } from '../../../Context/ContentContext';

const Terms = () => {

    const { termPrivacyDataAdmin, fetchTermPrivacyContent } = useContent()

    const [openTermsEdit, setOpenTermsEdit] = useState(false);
    const handleOpenTermsEdit = () => setOpenTermsEdit(true);
    const handleCloseTermsEdit = () => {
        setOpenTermsEdit(false)
    }

    useEffect(() => {
        fetchTermPrivacyContent()
    }, [])

    return (
        <div className='HomeContentMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='HomeContentMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='HomeContentHeading'>
                        Terms
                    </Typography>
                </Stack>

                <Stack className='HomeContentSite'>
                    <Stack>
                        <Stack>
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>Hero Banner</Typography>
                                <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenTermsEdit()} className='HomeContentEditIcon' />
                            </Stack>
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>
                        <Stack className='TermsContentTopMar'></Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree '>Title</Typography>
                            <TextField
                                className='HomeContentInputFiled '
                                value={termPrivacyDataAdmin?.en?.terms?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree '>عنوان</Typography>
                            <TextField
                                className='HomeContentInputFiled '
                                value={termPrivacyDataAdmin?.fa?.terms?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Sub Title 2</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={termPrivacyDataAdmin?.en?.terms?.subTitle}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>عنوان فرعی 2</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={termPrivacyDataAdmin?.fa?.terms?.subTitle}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>

                    </Stack>

                    {/* Part 1 */}
                    <Stack className='TermsContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingThree'>Terms Content</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenTermsEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>

                        <Stack style={{ marginTop: '1%', height:'500px', overflow:'scroll' }}>
                            <div
                                className='HomeContentInputFiled'
                                dangerouslySetInnerHTML={{ __html: termPrivacyDataAdmin?.en?.terms?.content }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingThree'> محتوای شرایط </Typography>
                        </Stack>
                        <Stack style={{ marginTop: '1%', height:'500px', overflow:'scroll' }}>
                            <div
                                className='HomeContentInputFiled'
                                dangerouslySetInnerHTML={{ __html: termPrivacyDataAdmin?.fa?.terms?.content }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>
            <TermsEdit openTermsEdit={openTermsEdit} handleCloseTermsEdit={handleCloseTermsEdit} />

        </div>
    );
}

export default Terms;
