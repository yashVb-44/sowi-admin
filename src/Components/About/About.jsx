import React from 'react';
import './About.css';
import Hand from '../../Assets/Images/Contact/Hand.png';
import { Grid, Typography, capitalize, Stack } from '@mui/material';
import Header from '../../Common/Header/Header';
import AboutImages from '../../Assets/Images/About/AboutImage.png'
import AboutMission from './AboutMission';
import AboutFund from './AboutFund';
import AboutImage from './AboutImage';
import Team from './Team';
import AboutWork from './AboutWork';
import { useContent } from '../../Context/ContentContext';

const About = () => {
    const { aboutContent } = useContent()
    return (
        <div>
            <div className='AboutBg'>
                <div className='Header'>
                    <Header />
                </div>
                <Grid container spacing={1} className='AboutTextPara'>
                    <Grid item xs={12} lg={8} className='AboutText'>
                        <Typography gutterBottom variant="h5" component="div" className='About' sx={{ textTransform: 'capitalize' }}>
                            {aboutContent?.heroBanner?.subTitle1}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'uppercase' }} className='AboutHeadingOne'>
                            {aboutContent?.heroBanner?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='AboutPara' >
                            {aboutContent?.heroBanner?.subTitle2}
                        </Typography>
                    </Grid>
                </Grid>
                <Stack className='AboutImage'>
                    <img src={aboutContent?.heroBannerImg} alt='About Image' />
                </Stack>
            </div>
            <AboutMission />
            {/* <AboutFund /> */}
            {/* <AboutImage /> */}
            {/* <AboutWork /> */}
            {/* <Team /> */}
        </div>
    );
};

export default About;
