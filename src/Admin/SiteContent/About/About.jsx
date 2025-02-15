import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Stack, TextField, Box } from '@mui/material';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import './About.css'
import AboutEdit from './AboutEdit';
import { useContent } from '../../../Context/ContentContext';

const About = () => {

    const { settingContant, fetchSettingContent } = useContent()

    const [openAboutEdit, setOpenAboutEdit] = useState(false);
    const handleOpenAboutEdit = () => setOpenAboutEdit(true);
    const handleCloseAboutEdit = () => {
        setOpenAboutEdit(false)
    }

    useEffect(() => {
        fetchSettingContent()
    }, [])

    return (
        <div className='HomeContentMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='HomeContentMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='HomeContentHeading'>
                        About Us
                    </Typography>
                </Stack>

                <Stack className='HomeContentSite'>
                    {/* <Stack>
                        <Stack>
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>Hero Banner</Typography>
                                <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='HomeContentEditIcon' />
                            </Stack>
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>
                        <Stack className='AboutContentTopMar'></Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree '>Title</Typography>
                            <TextField
                                className='HomeContentInputFiled '
                                value={settingContant?.en?.about?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree '>عنوان</Typography>
                            <TextField
                                className='HomeContentInputFiled '
                                value={settingContant?.fa?.about?.title}
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
                                value={settingContant?.en?.about?.subTitle}
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
                                value={settingContant?.fa?.about?.subTitle}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>

                    </Stack> */}

                    {/* Part 1 */}
                    <Stack className='AboutContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingThree'>About Content</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>

                        <Stack style={{ marginTop: '1%', height: '500px', overflow: 'scroll' }}>

                            <div
                                className='HomeContentInputFiled'
                                dangerouslySetInnerHTML={{ __html: settingContant?.about }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>
            <AboutEdit openAboutEdit={openAboutEdit} handleCloseAboutEdit={handleCloseAboutEdit} />

        </div>
    );
}

export default About;
