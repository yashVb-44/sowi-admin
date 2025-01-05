import React from 'react';
import './PrivacyPolicy.css';
import { Grid, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import AsyncTextRenderer from '../Context/AsyncTextRenderer';
import { useContent } from '../Context/ContentContext';
import { decodeHtmlEntities } from '../Lib/ApiCaller';

const PrivacyPolicy = () => {

    const { termPrivacyData } = useContent()

    return (
        <div>
            <div className='PrivacyBg'>
                <div className='Header'>
                    <Header />
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: '40px' }} className='PrivacyText'>
                        <Typography gutterBottom variant="h5" component="div" className='PrivacyHeadingOne' sx={{ textTransform: 'capitalize' }}>
                            {termPrivacyData?.privacy?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='PrivacyPara' >
                            {termPrivacyData?.privacy?.subTitle}
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <Grid className='PrivacyParaText'>
                <Typography className='PrivacyParaTwo'>
                    <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(termPrivacyData?.privacy?.content) }} />
                </Typography>

            </Grid>

        </div>
    );
};

export default PrivacyPolicy;
