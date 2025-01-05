import React from 'react';
import Heart from '../../Assets/Images/World/Heart.png';
import WorldImg from '../../Assets/Images/World/WorldImg.png';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import './World.css';
import { useContent } from '../../Context/ContentContext';

const World = () => {

    const { homeContent } = useContent()

    return (
        <Grid container spacing={3} className='World'>
            <Grid item xs={12} md={8}>
                <div className='WorldText'>
                    <div className='WorldTextTwo'>
                        <Typography gutterBottom variant="h5" component="div" className='WorldHeading'>
                            {homeContent?.part3?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='WorldPara'>
                            {homeContent?.part3?.description}
                        </Typography>
                    </div>
                    <div className='WorldHeart'>
                        <img src={Heart} alt='Heart' className='WorldHeart' />
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={4} className='WorldImg'>
                <img src={WorldImg} alt='World' />
            </Grid>
        </Grid>
    );
}

export default World;
