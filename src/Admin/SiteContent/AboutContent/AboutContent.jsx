import React, { useEffect, useState } from 'react';
import './AboutContent.css';
import { Grid, Typography, Button, Stack, TextField, Box, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import bgImage from '../../../Assets/Images/homeBanner.png';
import SupportUs_Img_1 from '../../../Assets/Images/SupportUs/SupportUs_Img_1.png';
import SupportUs_Img_2 from '../../../Assets/Images/SupportUs/SupportUs_Img_2.png';
import SupportUs_Img_3 from '../../../Assets/Images/SupportUs/SupportUs_Img_3.png';
import SupportUs_Img_4 from '../../../Assets/Images/SupportUs/SupportUs_Img_4.png';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import CloudImage from '../../../Assets/AdminImages/CloudImgae.png'
import { useDropzone } from 'react-dropzone';
import './AboutContent.css'
import AboutContentEdit from './AboutContentEdit';
import teamImg from '../../../Assets/Images/About/Team1.png'
import teamImg2 from '../../../Assets/Images/About/Team2.png'
import { useContent } from '../../../Context/ContentContext';
import { getAboutContent, getAboutJourney, getTeam } from '../../../Lib/AboutContent';
import EditTeam from './EditTeam';

const AboutContent = () => {

    const {aboutJourneyEn, aboutJourneyFa, aboutContentAdmin, aboutJourney, teamDataAdmin, fetchAboutContent, fetchAboutJourney, fetchTeam, setEditTeamMember } = useContent()

    const [openAboutEdit, setOpenAboutEdit] = useState(false);
    const handleOpenAboutEdit = () => setOpenAboutEdit(true);
    const handleCloseAboutEdit = () => {
        setOpenAboutEdit(false)
    }


    useEffect(() => {
        fetchAboutContent()
        fetchAboutJourney()
        fetchTeam()
    }, [])


    const [openEditTeam, setOpenEditTeam] = useState(false);
    const handleOpenEditTeam = (data) => {
        setOpenEditTeam(true);
        handleCloseAboutEdit()
        setEditTeamMember(data)
    }
    const handleCloseEditTeam = () => {
        setOpenEditTeam(false)
    }


    return (
        <div className='AboutContentMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='AboutContentMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='AboutContentHeading'>
                        About Content
                    </Typography>
                </Stack>

                <Stack className='AboutContentSite'>
                    <Stack>
                        <Stack>
                            <Stack>
                                <Stack className='AboutContentEditBtn'>
                                    <Typography className='AboutContentHeadingTwo'>Hero Banner</Typography>
                                    <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='AboutContentEditIcon' />
                                </Stack>
                                <Typography className='AboutContentHeadingThree'>Sub Title 1</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.en?.heroBanner?.subTitle1}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Title</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.en?.heroBanner?.title}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true, readOnly: true }}

                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Sub Title 2</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.en?.heroBanner?.subTitle2}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                        </Stack>
                        <Stack className='BorderBottom' sx={{ margin: '1% 0px' }}></Stack>
                        <Stack>
                            <Stack>
                                <Stack className='AboutContentEditBtn'>
                                    <Typography className='AboutContentHeadingTwo'>بنر قهرمان</Typography>
                                    <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='AboutContentEditIcon' />
                                </Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان فرعی 1</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.fa?.heroBanner?.subTitle1}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.fa?.heroBanner?.title}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true, readOnly: true }}

                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان فرعی 2</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.fa?.heroBanner?.subTitle2}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Top Image</Typography>

                            <Stack className='PreviewUpload'>
                                <Box className='PreviewUploadImageContainer'>
                                    <img src={aboutContentAdmin?.heroBannerImg} className='PreviewUploadImage' alt="Preview" />
                                    <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='EditIconAddProject' />
                                </Box>
                            </Stack>

                        </Stack>


                    </Stack>

                    {/* Part 1 */}
                    <Stack className='AboutContentTopMar'>
                        <Stack className='AboutContentEditBtn'>
                            <Typography className='AboutContentHeadingTwo'>Part 1 :The Mission And Goals Of Our Organisation</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='AboutContentEditIcon' />
                        </Stack>
                        <Stack>
                                <Typography className='AboutContentHeadingThree'>Heading</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.en?.part1?.heading}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Sub Heading</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.en?.part1?.subHeading}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>سرفصل</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.fa?.part1?.heading}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان فرعی</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={aboutContentAdmin?.fa?.part1?.subHeading}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'></Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Title</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part1?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part1?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part1?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part1?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Title</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part1?.title2}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part1?.description2}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part1?.title2}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part1?.description2}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Title</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part1?.title3}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part1?.description3}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part1?.title3}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part1?.description3}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>

                    </Stack>
                    {/* <Stack className='BorderBottom'></Stack> */}

                    {/* Part 2 */}
                    {/* <Stack className='AboutContentTopMar'>
                        <Stack className='AboutContentEditBtn'>
                            <Typography className='AboutContentHeadingTwo'>Part 2 : Fund Raising Trusted Charity Foundations</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='AboutContentEditIcon' />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Title</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part2?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part2?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part2?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part2?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Title</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part2?.title2}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part2?.description2}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>

                        <Stack>
                            <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part2?.title2}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part2?.description2}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack className='BorderBottom'></Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Title</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part2?.title3}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.en?.part2?.description3}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part2?.title3}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='AboutContentInputFiled'
                                value={aboutContentAdmin?.fa?.part2?.description3}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>

                    </Stack>
                    <Stack className='BorderBottom'></Stack> */}


                    {/* Part 3 */}
                    {/* <Stack className='AboutContentTopMar'>
                        <Stack className='AboutContentEditBtn'>
                            <Typography className='AboutContentHeadingTwo'>Part 3 : How It Work Journey</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='AboutContentEditIcon' />
                        </Stack>
                        <Stack className='AboutContentTopMar'>
                            {Object.keys(aboutJourneyEn).slice(0, 4).map((partKey, index) => (
                                <Grid container key={partKey} spacing={2}>
                                    <Grid item xs={12} md={2} lg={1} className='AboutContentSupportIcon AboutContentMarginImage'>
                                        <Typography className='AboutContentHeadingThree'>Image</Typography>
                                        <Box>
                                            <Stack className=''>
                                                <Box className='AboutContentPreviewUploadImageContainer'>
                                                    <img src={aboutJourneyEn[partKey][`icon${index + 1}`]} className='AboutContentPreviewUploadImage' alt="Preview" />
                                                    <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit(partKey)} className='EditIconAboutContent' />
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={10} lg={11}>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                    <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                                        Year
                                                    </Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={aboutJourneyEn[partKey].year}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true, readOnly: true }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>Title</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={aboutJourneyEn[partKey].title}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true, readOnly: true }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={aboutJourneyEn[partKey].description}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true, readOnly: true }}
                                            />
                                        </Stack>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                    <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                                        سال
                                                    </Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={aboutJourneyFa[partKey].year}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true, readOnly: true }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={aboutJourneyFa[partKey].title}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true, readOnly: true }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={aboutJourneyFa[partKey].description}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true, readOnly: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ))}

                        </Stack>



                    </Stack> */}

                    {/* Part 4  team */}
                    {/* <Stack className='AboutContentTopMar'>
                        <Stack className='AboutContentEditBtn'>
                            <Typography className='AboutContentHeadingTwo'>Part 4 : Meet Our Team</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='AboutContentEditIcon' />
                        </Stack>

                        <Stack className='AboutContentTopMar'>
                            {teamDataAdmin?.map((data, index) => {
                                return (
                                    <Grid item container key={index}>
                                        <Grid item xs={12} sx={12} md={2} lg={1} className='AboutContentSupportIcon AboutContentMarginImage'>
                                            <Typography className='AboutContentHeadingThree'>Image</Typography>
                                            <Box>

                                                <Box className='AboutContentPreviewUploadImageContainer'>
                                                    <img src={data?.image} className='AboutContentPreviewUploadImage' alt="Preview" />
                                                    <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenEditTeam(data)} className='EditIconAboutContent' />
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                            <Stack className='AboutContentGridMarginLeft'>
                                                <Grid container spacing={4}>
                                                    <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                        <Typography className='AboutContentHeadingThree'>Name</Typography>
                                                        <TextField
                                                            className='AboutContentInputFiled'
                                                            value={data?.en?.name}
                                                            variant="standard"
                                                            fullWidth
                                                            InputProps={{ disableUnderline: true, readOnly: true }}

                                                        />
                                                    </Grid>
                                                    <Grid item sx={12} md={8} lg={8} style={{ marginTop: '2px' }}>
                                                        <Typography className='AboutContentHeadingThree'>Designation</Typography>
                                                        <TextField
                                                            className='AboutContentInputFiled'
                                                            value={data?.en?.designation}
                                                            variant="standard"
                                                            fullWidth
                                                            InputProps={{ disableUnderline: true, readOnly: true }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Typography className='AboutContentHeadingThree'>Description</Typography>
                                                <TextField
                                                    className='AboutContentInputFiled'
                                                    value={data?.en?.description}
                                                    variant="standard"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                                />
                                            </Stack>
                                            <Stack className='AboutContentGridMarginLeft'>
                                                <Grid container spacing={4}>
                                                    <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                        <Typography className='AboutContentHeadingThree'>نام</Typography>
                                                        <TextField
                                                            className='AboutContentInputFiled'
                                                            value={data?.fa?.name}
                                                            variant="standard"
                                                            fullWidth
                                                            InputProps={{ disableUnderline: true, readOnly: true }}

                                                        />
                                                    </Grid>
                                                    <Grid item sx={12} md={8} lg={8} style={{ marginTop: '2px' }}>
                                                        <Typography className='AboutContentHeadingThree'>تعیین</Typography>
                                                        <TextField
                                                            className='AboutContentInputFiled'
                                                            value={data?.fa?.designation}
                                                            variant="standard"
                                                            fullWidth
                                                            InputProps={{ disableUnderline: true, readOnly: true }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                                <TextField
                                                    className='AboutContentInputFiled'
                                                    value={data?.fa?.description}
                                                    variant="standard"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Stack>

                    </Stack> */}
                </Stack>
            </Grid>
            <AboutContentEdit openAboutEdit={openAboutEdit} handleCloseAboutEdit={handleCloseAboutEdit} />
            <EditTeam openEditTeam={openEditTeam} handleCloseEditTeam={handleCloseEditTeam} />

        </div>
    );
}

export default AboutContent;

