import React from 'react';
import Solution_Img from '../../Assets/Images/Solution/Solution_Img.png';
import './Solution.css';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { useContent } from '../../Context/ContentContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const Solution = () => {
    
    const { homeContent } = useContent()
    const {selectedLanguage} = useLanguage()

    return (
        <Grid container spacing={6} className='Solution'>
            <Grid item xs={12} md={6} className='SolutionText'>

                <Typography gutterBottom variant="h5" component="div" className='SolutionHeading'>
                    {homeContent?.part2?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className='SolutionPara'>
                    {homeContent?.part2?.description}
                </Typography>
                <Button variant="outlined" className='SolutionButton' sx={{ textTransform: 'none' }} > {getTranslation('projectListDetail.learn', selectedLanguage)} </Button>

            </Grid>
            <Grid item xs={12} md={6}>
                <div className='SolutionImg'>
                    <img src={Solution_Img} alt='Solution' />
                </div>
            </Grid>
        </Grid>
    );
}

export default Solution;
