import React, { useEffect, useState } from 'react'
import './Fundraise.css'
import { Button, Grid, LinearProgress, Stack, Typography, alpha, colors, linearProgressClasses, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getCategory } from '../../Lib/CategoryApi'
import { useFundraise } from '../../Context/FundraiseContext'
import { useLanguage } from '../../Context/LanguageContext'
import { getTranslation } from '../../Common/LanguageFile/transalation'

const FundraiseCategory = () => {
    const navigate = useNavigate();

    const { setCategoryId } = useFundraise()
    const { selectedLanguage } = useLanguage()

    const handleNavigate = (data) => {
        setCategoryId(data)
        navigate('/fundraise-cat');
        let dat = JSON.stringify(data)
        localStorage.setItem('categoryId', data._id)
    };

    const [categoryData, setCategoryData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);


    const fetchCategory = async () => {
        let response = await getCategory();
        if (selectedLanguage === 'EN') {
            setCategoryData(response?.categories?.map(cat => cat?.en))
        } else {
            setCategoryData(response?.categories?.map(cat => cat?.fa))
        }
        // setCategoryData(response.categories);
    };

    useEffect(() => {
        fetchCategory();
    }, [selectedLanguage]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 4);
    };

    return (
        <div className='FundraiseCat'>
            <Stack>
                <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }} className='HeadingListThree'>
                    {getTranslation('fundraise.fundCatHeading', selectedLanguage)}
                </Typography>
                <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='ParaListTwo'>
                    {getTranslation('fundraise.fundCatPara', selectedLanguage)}
                </Typography>
            </Stack>
            <Grid container style={{ cursor: 'pointer' }}>
                {categoryData?.slice(0, visibleCount).map((data, index) => (
                    <Grid item xs={12} sx={6} md={6} lg={3} key={index} className='FundraiseCatImage' onClick={() => handleNavigate(data)}>
                        <img src={data?.image} alt={data?.title} />
                        <Typography sx={{ marginTop: '1%', textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} className='SubHeading'>
                            {data?.title}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            <Stack className='FundraiseButton'>
                <Button
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                    onClick={handleLoadMore}
                    disabled={visibleCount >= categoryData.length}
                >
                    {visibleCount >= categoryData.length ? getTranslation('common.noMoreCategories', selectedLanguage) : getTranslation('common.loadMore', selectedLanguage)}
                </Button>
            </Stack>
        </div>
    );
};

export default FundraiseCategory;
