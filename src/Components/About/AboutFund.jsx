import React from 'react'
import './About.css'
import { Grid, Typography, capitalize, Stack, Box, Button } from '@mui/material';
import FundRaise1 from '../../Assets/Images/About/FundRaise1.png'
import FundRaise2 from '../../Assets/Images/About/FundRaise2.png'
import FundRaise3 from '../../Assets/Images/About/FundRaise3.png'
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../Context/ContentContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const AboutFund = () => {

    const { aboutContent } = useContent()
    const { selectedLanguage } = useLanguage()

    const navigate = useNavigate()

    return (
        <div className='AboutFund'>
            <Grid container justifyContent='center' >
                <Grid item sx={12} md={12} lg={11}  >
                    <Typography gutterBottom variant="h5" component="div" textAlign='center' className='HeadingThree' sx={{ textTransform: 'capitalize', display: 'flex', justifyContent: 'center' }}>
                        {getTranslation('about.aboutFundHeading', selectedLanguage)}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" textAlign='center' sx={{ textTransform: 'none', }} className='AboutSubParaTwo' >
                        {getTranslation('about.aboutFundPara', selectedLanguage)}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent='center'>
                <Grid item xs={12} md={11} lg={11} style={{ paddingTop: '2%' }}>
                    <Grid container spacing={4} >
                        <Grid item xs={12} md={6} lg={4}>
                            <img src={FundRaise1} alt='FundRaise' className='AboutFundImage' />
                            <Typography
                                variant="h5"
                                component="div"
                                className='AboutSubHeading'
                                sx={{
                                    textTransform: 'capitalize',
                                    padding: '1% 0px'
                                }}
                            >
                                {aboutContent?.part2?.title}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'none' }} className='AboutSubParaTwo'>
                                {aboutContent?.part2?.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <img src={FundRaise2} alt='FundRaise' className='AboutFundImage' />
                            <Typography
                                variant="h5"
                                component="div"
                                className='AboutSubHeading'
                                sx={{
                                    textTransform: 'capitalize',
                                    padding: '1% 0px'
                                }}
                            >
                                {aboutContent?.part2?.title2}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'none' }} className='AboutSubParaTwo'>
                                {aboutContent?.part2?.description2}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <img src={FundRaise3} alt='FundRaise' className='AboutFundImage' />
                            <Typography
                                variant="h5"
                                component="div"
                                className='AboutSubHeading'
                                sx={{
                                    textTransform: 'capitalize',
                                    padding: '1% 0px'
                                }}
                            >
                                {aboutContent?.part2?.title3}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'none' }} className='AboutSubParaTwo'>
                                {aboutContent?.part2?.description3}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


            <div className='DonateButtonAbout'>
                <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => navigate('/project')} > {getTranslation('button.donate', selectedLanguage)} </Button>
            </div>

        </div>
    )
}

export default AboutFund
