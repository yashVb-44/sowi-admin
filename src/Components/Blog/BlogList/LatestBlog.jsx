import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import Man from '../../../Assets/Images/BlogList/Man.png';
import LatestBlog1 from '../../../Assets/Images/BlogList/LatestBlog1.png';
import LatestBlog2 from '../../../Assets/Images/BlogList/LatestBlog2.png';
import './BlogList.css';
import { useBlogDetail } from '../../../Context/BlogDetailContext';
import { useNavigate } from 'react-router-dom';
import { getAllBlog } from '../../../Lib/BlogApi';
import { dateMonth, decodeHtmlEntities } from '../../../Lib/ApiCaller';
import { useLanguage } from '../../../Context/LanguageContext';
import { getTranslation } from '../../../Common/LanguageFile/transalation';

const LatestBlog = () => {

    const { blogData, setBlogData } = useBlogDetail()

    const { selectedLanguage } = useLanguage()

    const navigate = useNavigate()

    const handleBlogDetail = (data) => {
        navigate('/blog-detail')
        localStorage.setItem('blogData', JSON.stringify(data))
        // setBlogListData(data)
    }

    return (
        <div className='BlogListDetail'>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }} className='BlogHeadingTwo'>
                {getTranslation('latestBlog.latestBlog', selectedLanguage)}
            </Typography>
            <Typography style={{ textTransform: 'none' }} className='BlogParaText'>
                {getTranslation('latestBlog.para', selectedLanguage)}
            </Typography>
            <Grid container spacing={4} style={{ marginTop: '1%' }} >
                {blogData?.slice(-4, -2)?.map((data, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} key={index} >
                        <Stack className='LatestBlog' onClick={() => handleBlogDetail(data)}>
                            <img src={data?.featuredImage} alt='BlogImage' className='LatestBlogImage' />
                            <Stack className='LatestBlogPara'>
                                <Typography variant="h6" className='BlogSubHeading'>
                                    {data.title}
                                </Typography>
                                <Typography
                                    sx={{ marginTop: '0.5%' }}
                                    variant="body2"
                                    color="text.secondary"
                                    className='BlogParaText'
                                >
                                    <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(data.content.slice(0, 600)) }} />
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} className='BlogListDetailAuthor'>
                                    <img src={Man} alt='Man' className='AuthorImage' />
                                    <div className='BlogListAuthor'>
                                        <Typography variant="body2" className='BlogListAuthorName'>
                                            {data.author}
                                        </Typography>
                                        <Typography variant="body2" className='BlogListUploadDate'>
                                            {dateMonth(data.datePublished)}
                                        </Typography>
                                    </div>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default LatestBlog;
