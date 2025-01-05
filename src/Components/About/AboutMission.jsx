import React from 'react'
import './About.css'
import { Grid, Typography, capitalize, Stack, Box } from '@mui/material';
import CircleImage from '../../Assets/Images/About/AboutCircleImage.png'
import LeftLeafImage from '../../Assets/Images/About/AboutLeftLeaf.png'
import RightLeafImage from '../../Assets/Images/About/AboutRightLeaf.png'
import { useContent } from '../../Context/ContentContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const AboutMission = () => {

    const { aboutContent } = useContent()
    const { selectedLanguage } = useLanguage()

    return (
        <div className='AboutMission'>
            <Grid container justifyContent="center" style={{ paddingTop: '4%' }} >
                <Grid item sx={12} md={11} lg={8} >
                    <Typography gutterBottom variant="h5" component="div" className='HeadingThree' sx={{ textTransform: 'capitalize' }}>
                        {aboutContent?.part1?.heading}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'none' }} className='AboutSubParaTwo' >
                    {aboutContent?.part1?.subHeading}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={1} lg={2} className='AboutLeftLeaf'>
                    <img src={LeftLeafImage} alt='Leaf' />
                </Grid>
                <Grid item xs={12} md={10} lg={8} justifyContent="start" style={{ padding: '5% 0px' }}>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6} lg={6}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    textAlign: 'center'
                                }}
                            >
                                <img src={CircleImage} alt='Circle' className='CircleImage' style={{ width: '100%', display: 'block' }} />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    className='AboutCircleHeading'
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '30%',
                                        transform: 'translate(-25%, -30%)',
                                        textTransform: 'capitalize',

                                    }}

                                >
                                    {aboutContent?.part1?.title}
                                </Typography>
                            </Box>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'none' }} className='AboutSubParaTwo'>
                                {aboutContent?.part1?.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    textAlign: 'center'
                                }}
                            >
                                <img src={CircleImage} alt='Circle' className='CircleImage' style={{ width: '100%', display: 'block' }} />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    className='AboutCircleHeading'
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '30%',
                                        transform: 'translate(-25%, -30%)',
                                        textTransform: 'capitalize',

                                    }}

                                >
                                    {aboutContent?.part1?.title2}
                                </Typography>
                            </Box>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'none' }} className='AboutSubParaTwo'>
                                {aboutContent?.part1?.description2}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    textAlign: 'center'
                                }}
                            >
                                <img src={CircleImage} alt='Circle' className='CircleImage' style={{ width: '100%', display: 'block' }} />
                                <Typography
                                    variant="h5"
                                    component="div"
                                    className='AboutCircleHeading'
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '30%',
                                        transform: 'translate(-25%, -30%)',
                                        textTransform: 'capitalize',

                                    }}

                                >
                                    {aboutContent?.part1?.title3}
                                </Typography>
                            </Box>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'none' }} className='AboutSubParaTwo'>
                                {aboutContent?.part1?.description3}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={1} lg={2} className='AboutRightLeaf'>
                    <img src={RightLeafImage} alt='Leaf' />
                </Grid>
            </Grid>

        </div>
    )
}

export default AboutMission
