import React, { useEffect, useState } from 'react';
import './FundraiseCategoryDetail.css';
import { Grid, Typography, Button, Stack } from '@mui/material';
import Header from '../../../Common/Header/Header';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FundraiseCatImg from '../../../Assets/Images/FundCat/FundraiseCatDetailImg.png'
import AllFundRaise from './AllFundRaise';
import CategoryDetail from './CategoryDetail';
import { useFundraise } from '../../../Context/FundraiseContext';
import { useNavigate } from 'react-router-dom';
import { getTranslation } from '../../../Common/LanguageFile/transalation';
import { useLanguage } from '../../../Context/LanguageContext';
import { getCategoryById } from '../../../Lib/CategoryApi';
import { useContent } from '../../../Context/ContentContext';

const FundraiseCategoryDetail = () => {

    // const { categoryId, setCategoryId } = useFundraise()
    const navigate = useNavigate()

    const { selectedLanguage } = useLanguage()

    const { categoryIdData, setCategoryIdData } = useContent()
    const [ categoryIdDataRes, setCategoryIdDataRes ] = useState('')

    const categoryId = localStorage?.getItem('categoryId')
    const fetchCategoryById = async () => {
        try {
            let response = await getCategoryById(categoryId);
            setCategoryIdDataRes(response)
            if (selectedLanguage === 'EN') {
                setCategoryIdData(response?.en)
            } else {
                setCategoryIdData(response?.fa)
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchCategoryById();
    }, [categoryId, selectedLanguage]);


    return (
        <div>
            <div className='FundraiseBg'>
                <div className='Header'>
                    <Header />
                </div>
                <Grid container spacing={4} className='FundraiseCatText'>
                    <Grid item xs={12} md={5} lg={6} className='FundraiseCatDetailText'>
                        <Stack>
                            <Typography gutterBottom variant="h5" component="div" className='BlogDetailText' sx={{ textTransform: 'capitalize' }}>
                                {getTranslation('fundraise.fundCategories', selectedLanguage)}
                                <ArrowForwardIosIcon style={{ margin: 'auto 0px', fontSize: '14px' }} />
                                <Typography className='BlogDetailTextSuccess'>
                                    {categoryIdData?.title}
                                </Typography>
                            </Typography>
                        </Stack>
                        <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capital' }} className='FundraiseCatDetailHeadingOne'>
                            {categoryIdData?.categoryTitle}
                        </Typography>
                        <Stack className='FundraiseDonateCatDetailBtn'>
                            <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={() => navigate('/project')}>{getTranslation('button.donate', selectedLanguage)} </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={7} lg={6} className='FundraiseCatDetailImg'>
                        <img src={categoryIdDataRes?.image} alt='Category Image' />
                    </Grid>
                </Grid>
                <div style={{ backgroundColor: '#fff' }}>
                    <AllFundRaise />
                </div>
                <CategoryDetail />
            </div>
        </div>
    );
};

export default FundraiseCategoryDetail;


