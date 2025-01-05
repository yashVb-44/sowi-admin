import React from 'react';
import './Fundraise.css';
import { Grid, Typography, Button, Stack } from '@mui/material';
import Header from '../../Common/Header/Header';
import RightImage from '../../Assets/Images/FundCat/RightImage.png'
import LeftImage from '../../Assets/Images/FundCat/LeftImage.png'
import FundraiseCategory from './FundraiseCategory';
import FundraiseDetail from './FundraiseDetail';
import SupportUs from '../Home/SupportUs';
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const Fundraise = () => {

    const navigate = useNavigate()
    const {selectedLanguage} = useLanguage()

    return (
        <div>
            <div className='FundraiseBg'>
                <div className='Header'>
                    <Header />
                </div>
                <Grid container spacing={1}>
                    <Grid item md={1} lg={1} className='FundRaiseLeftImg'>
                        <img src={LeftImage} alt='FundRaiseLeftImg' />
                    </Grid>
                    <Grid item xs={12} md={10} lg={10} sx={{ marginBottom: '40px' }} className='FundraiseText'>
                        <Typography gutterBottom variant="h5" component="div" className='Fundraise' sx={{ textTransform: 'capitalize' }}>
                            {getTranslation('fundraise.allCategory', selectedLanguage)}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'uppercase' }} className='FundraiseHeadingOne'>
                            {getTranslation('fundraise.heading', selectedLanguage)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='FundraisePara' >
                            {getTranslation('fundraise.para', selectedLanguage)}
                        </Typography>
                        <div className='DonateButtonAbout'>
                            <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => navigate('/project')} > {getTranslation('button.donate', selectedLanguage)} </Button>
                        </div>

                    </Grid>
                    <Grid item md={1} lg={1} className='FundRaiseRightImg'>
                        <img src={RightImage} alt='RightLeaf' />
                    </Grid>
                </Grid>
                <FundraiseCategory />
                <FundraiseDetail />
                <div style={{ backgroundColor: '#fff' }}>
                    <SupportUs />
                </div>
            </div>
        </div>
    );
};

export default Fundraise;
