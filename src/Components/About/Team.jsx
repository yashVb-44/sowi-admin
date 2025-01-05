import React from 'react';
import { Grid, Typography, Stack } from '@mui/material';
import AsyncTextRenderer from '../../Context/AsyncTextRenderer';
import { useContent } from '../../Context/ContentContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const Team = () => {

    const { teamData } = useContent()
    const { selectedLanguage } = useLanguage()

    return (
        <div className='AboutFund'>
            <Grid container justifyContent='center' >
                <Grid item sx={12} md={12} lg={11}  >
                    <Typography gutterBottom variant="h5" component="div" textAlign='center' className='HeadingThree' sx={{ textTransform: 'capitalize', display: 'flex', justifyContent: 'center' }}>
                        {getTranslation('about.teamHeading', selectedLanguage)}
                    </Typography>
                    <Typography gutterBottom textAlign='center' sx={{ textTransform: 'none', }} className='AboutSubPara center-tex' >
                        {getTranslation('about.teamPara', selectedLanguage)}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                {teamData?.map((data, index) => (
                    <Grid item xs={12} md={6} lg={6} key={index} display='flex' flexWrap='wrap'>
                        <Grid item xs={12} sm={3} md={5} lg={3} className='AboutTeam'>
                            <img src={data.image} alt={data.name} />
                        </Grid>
                        <Grid item xs={12} sm={9} md={7} lg={9} style={{ margin: 'auto 0px' }}>
                            <Typography component="div" variant="h6" sx={{ textTransform: 'capitalize' }} className='AboutTeamHeading'>
                                {data.name}
                            </Typography>
                            <Typography component="div" variant="subtitle1" sx={{ textTransform: 'none' }} className='AboutTeamSubHeading'>
                                {data.designation}
                            </Typography>
                            <Typography component="div" variant="body1" sx={{ textTransform: 'none' }} className='AboutTeamPara'>
                                {data.description}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
};

export default Team;
