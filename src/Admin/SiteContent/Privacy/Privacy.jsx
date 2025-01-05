import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Stack, TextField, Box } from '@mui/material';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import './Privacy.css'
import PrivacyEdit from './PrivacyEdit';
import { useContent } from '../../../Context/ContentContext';

const Privacy = () => {

    const { termPrivacyDataAdmin, fetchTermPrivacyContent } = useContent()

    const [openPrivacyEdit, setOpenPrivacyEdit] = useState(false);
    const handleOpenPrivacyEdit = () => setOpenPrivacyEdit(true);
    const handleClosePrivacyEdit = () => {
        setOpenPrivacyEdit(false)
    }

    useEffect(() => {
        fetchTermPrivacyContent()
    }, [])

    return (
        <div className='HomeContentMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='HomeContentMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='HomeContentHeading'>
                        Privacy Policy
                    </Typography>
                </Stack>

                <Stack className='HomeContentSite'>
                    <Stack>
                        <Stack>
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>Hero Banner</Typography>
                                <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenPrivacyEdit()} className='HomeContentEditIcon' />
                            </Stack>
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>
                        <Stack className='PrivacyContentTopMar'></Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree '>Title</Typography>
                            <TextField
                                className='HomeContentInputFiled '
                                value={termPrivacyDataAdmin?.en?.privacy?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree '>عنوان</Typography>
                            <TextField
                                className='HomeContentInputFiled '
                                value={termPrivacyDataAdmin?.fa?.privacy?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>

                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Sub Title 2</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={termPrivacyDataAdmin?.en?.privacy?.subTitle}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>عنوان فرعی 2</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={termPrivacyDataAdmin?.fa?.privacy?.subTitle}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>

                    </Stack>

                    {/* Part 1 */}
                    <Stack className='PrivacyContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingThree'>Privacy Policy Content</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenPrivacyEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>

                        <Stack style={{ marginTop: '1%', height:'500px', overflow:'scroll' }}>

                            <div
                                className='HomeContentInputFiled'
                                dangerouslySetInnerHTML={{ __html: termPrivacyDataAdmin?.en?.privacy?.content }}
                            />
                        </Stack>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingThree'>محتوای سیاست حفظ حریم خصوصی</Typography>
                        </Stack>
                        <Stack  style={{ marginTop: '3%', height:'500px', overflow:'scroll' }}>

                            <div
                                className='HomeContentInputFiled'
                                dangerouslySetInnerHTML={{ __html: termPrivacyDataAdmin?.fa?.privacy?.content }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>
            <PrivacyEdit openPrivacyEdit={openPrivacyEdit} handleClosePrivacyEdit={handleClosePrivacyEdit} />

        </div>
    );
}

export default Privacy;
