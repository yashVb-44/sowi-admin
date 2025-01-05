import React from 'react';
import { Grid, Typography, Stack } from '@mui/material';
import WorkImage from '../../Assets/Images/About/WorkImage.png';
import './About.css';
import { useContent } from '../../Context/ContentContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const AboutWork = () => {
    const { aboutJourney } = useContent()
    const { selectedLanguage } = useLanguage()
    const aboutContent = Object?.keys(aboutJourney)
        ?.filter(key => key?.startsWith('part'))
        ?.map(key => aboutJourney[key]);

    return (
        <div className='AboutWork'>
            <Grid container justifyContent='center' sx={{ mb: 4 }}>
                <Grid item xs={12} md={12} lg={10}>
                    <Typography gutterBottom variant="h5" component="div" textAlign='center' className='HeadingThree' sx={{ textTransform: 'capitalize', display: 'flex', justifyContent: 'center' }}>
                        {getTranslation('about.aboutWorkHeading', selectedLanguage)}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" textAlign='center' sx={{ textTransform: 'none', }} className='AboutSubPara'>
                        {getTranslation('about.aboutWorkPara', selectedLanguage)}
                    </Typography>
                </Grid>
            </Grid>


            {aboutContent &&
                <div className="section-timeline">
                    <div className="container">
                        <ul className="timeline">
                            {aboutContent.map((data, index) => (
                                <li key={index}>
                                    <div className="content">
                                        <Typography gutterBottom variant="h5" component="div" className='AboutWorkSubHeading DotGreenFlex'>
                                            <div className='DotGreen'></div>{data.year}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div" className='AboutSubHeading'>
                                            {data.title}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div" className='AboutSubParaTwo'>
                                            {data.description}
                                        </Typography>
                                    </div>
                                    <div className='content-img'>
                                        <img src={data[`icon${index + 1}`]} alt='' />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }

            <Stack className='ShowJourney'>
                {aboutContent.map((data, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <Grid container key={index} spacing={2} alignItems="center" className={`AboutWorkItem ${isEven ? 'even' : 'odd'}`}>
                            <Grid item xs={12} md={6} lg={6} className='AboutWorkImage'>
                                <img src={data[`icon${index + 1}`]} alt='Work Image' style={{ width: '100%', borderRadius: '6px' }} />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} className='AboutWorkText'>
                                <Typography gutterBottom variant="h5" component="div" className='AboutWorkSubHeading DotGreenFlex' sx={{ textTransform: 'capitalize' }}>
                                    <div className='DotGreen'></div> {data.year}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" className='AboutSubHeading' sx={{ textTransform: 'capitalize', margin: '0px' }}>
                                    {data.title}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'none' }} className='AboutSubParaTwo'>
                                    {data.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })}
            </Stack>


        </div>
    );
}

export default AboutWork;
