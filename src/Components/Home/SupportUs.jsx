import React, { useEffect } from 'react';
import './SupportUs.css';
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AsyncTextRenderer from '../../Context/AsyncTextRenderer';
import { useContent } from '../../Context/ContentContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const SupportUs = () => {

    const { supportContent, } = useContent()
    const { selectedLanguage, } = useLanguage()

    return (
        <Grid container spacing={2} className='SupportUS'>
            <Grid item xs={12} lg={12} className='SupportTextUs'>
                <Typography gutterBottom variant="h5" component="div" className='SupportUsTextHead' style={{ display: 'flex', justifyContent: 'center' }}>
                    {supportContent?.heading}
                </Typography>
                <Typography variant="body2" color="text.secondary" className='SupportUSTextParaa'>
                    {supportContent?.para}
                </Typography>

            </Grid>
            {supportContent &&
                <Grid container spacing={2}>
                    {Object?.keys(supportContent)?.map((key, index) => {
                        const data = supportContent[key];
                        // Check if the key contains 'support' to ensure we're only mapping over support fields
                        if (key?.startsWith('support')) {
                            return (
                                <Grid item xs={12} key={key} className='SupportWays'>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2} md={1} lg={1} className='SupportWaysImage'>
                                            <img src={data[`icon${index + 1}`]} alt='Support' />
                                        </Grid>
                                        <Grid item xs={10} md={8} lg={8} className='SupportWaysText'>
                                            <Typography gutterBottom variant="h5" component="div" className='SupportWaysHead'>
                                                {data?.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" className='SupportWaysPara'>
                                                {data?.description}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} md={2} lg={2} className='SupportWaysButton'>
                                            <Button variant="outlined" className='SupportWaysButtonTwo'>
                                                <ArrowForwardIcon />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        }
                        return null;
                    })}
                </Grid>
            }

        </Grid>
    );
}

export default SupportUs;
