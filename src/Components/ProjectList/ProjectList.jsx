import React from 'react';
import './ProjectList.css';
import Hand from '../../Assets/Images/Contact/Hand.png';
import { Grid, Typography, capitalize } from '@mui/material';
import Header from '../../Common/Header/Header';
import RightLeaf from '../../Assets/Images/ProjectList/RightLeaf.png'
import LeftLeaf from '../../Assets/Images/ProjectList/LeftLeaf.png'
import ProjectListDetail from './ProjectListDetail';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const ProjectList = () => {
    const {selectedLanguage} = useLanguage()
    return (
        <div>
            <div className='ProjectListBg'>
                <div className='Header'>
                    <Header />
                </div>
                <Grid container spacing={1}>
                    <Grid item md={1} lg={1}>
                        <div className='LeftLeaf'>
                            <img src={LeftLeaf} alt='LeftLeaf' />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10} sx={{ marginBottom: '40px' }} className='ProjectListText'>
                        <Typography gutterBottom variant="h5" component="div" className='ProjectList' sx={{ textTransform: 'capitalize' }}>
                            {getTranslation('project.subHeading', selectedLanguage)}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'uppercase' }} className='ProjectListHeadingOne'>
                            {getTranslation('project.heading', selectedLanguage)}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" className='ProjectListPara' >
                            {getTranslation('project.para', selectedLanguage)}
                        </Typography>
                    </Grid>
                    <Grid item md={1} lg={1} className='ProjectRightLeaf'>
                        <img src={RightLeaf} alt='RightLeaf' />
                    </Grid>
                </Grid>
            </div>
            <ProjectListDetail />
        </div>
    );
};

export default ProjectList;
