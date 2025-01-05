import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../Common/Header/Header'
import { Button } from '@mui/material'
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Img_1 from '../../Assets/Images/Mission/Img_1.png'
import Img_2 from '../../Assets/Images/Mission/Img_2.png'
import Img_3 from '../../Assets/Images/Mission/Img_3.png'
import Img_4 from '../../Assets/Images/Mission/Img_4.png'
import { CenterFocusStrong } from '@mui/icons-material';
import Support from './Support';
import FundRaise from './FundRaise';
import Solution from './Solution';
import World from './World';
import SupportUs from './SupportUs';
import Footer from '../../Common/Footer/Footer';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { dashboardInfo, formatNumber } from '../../Lib/ApiCaller';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../Context/ContentContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const Home = () => {

    const { homeContent, homeContentAdmin, missionContent } = useContent()
    const { selectedLanguage } = useLanguage()

    const navigate = useNavigate()

    return (
        <div>
            <div className='HomeBannerImg' style={{ backgroundImage: `url(${homeContentAdmin?.heroBannerImg})` }}>
                <div className='Header'>
                    <Header />
                </div>
                <div className='HomeText'>
                    <p> {homeContent?.heroBanner?.subTitle1} </p>
                    <h1 style={{ textTransform: 'uppercase' }}> {homeContent?.heroBanner?.title} </h1>
                    <p className='HomeDesc'> {homeContent?.heroBanner?.subTitle2} </p>
                    <div className='DonateButtonAbout'>
                        <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => navigate('/project')} >{getTranslation('button.donate', selectedLanguage)}
                        </Button>
                    </div>
                </div>
                <div className='Mission'>
                    <h1> {missionContent?.heading} </h1>
                    <p> {missionContent?.para} </p>
                    {missionContent &&
                        <Grid container spacing={2} className="MissionCard">
                            {['mission1', 'mission2', 'mission3', 'mission4'].map((missionKey, index) => {
                                const data = missionContent[missionKey]
                                return (
                                    <Grid item xs={6} md={3} lg={3} index={missionKey}>
                                        {data &&
                                            <Card className="MissionCardTwo" sx={{ maxWidth: 345 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        className="MissionCardImg"
                                                        image={data[`icon${index + 1}`]}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent sx={{ marginTop: { xs: '2px', md: '5px' } }}>
                                                        <Typography gutterBottom variant="h5" component="div" className="MissionTextBody" style={{ display: 'flex', justifyContent: 'center' }}>
                                                            {/* {data.number} */}
                                                            {formatNumber(data?.number)}
                                                        </Typography>
                                                        <Typography color="text.secondary" className="MissionTextBodyTwo">
                                                            {data?.description}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        }
                                    </Grid>
                                )
                            })}
                        </Grid>
                    }
                </div>
            </div>
            <Support />
            <FundRaise />
            {/* <Solution /> */}
            {/* <World /> */}
            <SupportUs />
            {/* <Footer /> */}
        </div>
    )
}

export default Home
