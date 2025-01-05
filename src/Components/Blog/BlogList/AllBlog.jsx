import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Pagination as MuiPagination } from '@mui/material';
import Man from '../../../Assets/Images/BlogList/Man.png';
import './BlogList.css';
import { json, useNavigate } from 'react-router-dom';
import { useBlogDetail } from '../../../Context/BlogDetailContext';
import { getAllBlog } from '../../../Lib/BlogApi';
import { dateMonth, decodeHtmlEntities } from '../../../Lib/ApiCaller';
import { useLanguage } from '../../../Context/LanguageContext';
import { getTranslation } from '../../../Common/LanguageFile/transalation';

const AllBlog = () => {
    const { setBlogListData, blogData, setBlogData } = useBlogDetail();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6; // Number of posts per page

    const { selectedLanguage } = useLanguage();

    // Exclude the top 4 blogs
    const filteredBlogData = blogData?.slice(0, -4) || [];

    // Calculate pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredBlogData?.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleBlogDetail = (data) => {
        navigate('/blog-detail');
        localStorage.setItem('blogData', JSON.stringify(data));
        // setBlogListData(data);
    };

    const pageCount = Math.ceil(filteredBlogData?.length / postsPerPage);

    return (
        <div className='BlogListDetail'>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }} className='BlogHeadingTwo'>
                {getTranslation('allBlog.allBlog', selectedLanguage)}
            </Typography>
            <Typography style={{ textTransform: 'none' }} className='BlogParaText'>
                {getTranslation('allBlog.para', selectedLanguage)}
            </Typography>
            <Grid container spacing={4} style={{ marginTop: '1%' }}>
                {currentPosts?.map((data, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={index} style={{ cursor: 'pointer' }}>
                        <Stack className='LatestBlog' onClick={() => handleBlogDetail(data)}>
                            <img src={data.featuredImage} alt='BlogImage' className='LatestBlogImage' />
                            <Stack className='LatestBlogPara'>
                                <Typography variant="h6" className='BlogSubHeading BlogSubHeadingHeight'>
                                    {data?.title?.slice(0, 30)}...
                                </Typography>
                                <Typography
                                    sx={{ marginTop: '0.5%' }}
                                    variant="body2"
                                    color="text.secondary"
                                    className='BlogParaText BlogParaTextHeight'
                                >
                                    <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(data.content.slice(0, 120)) }} />
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} className='BlogListDetailAuthor'>
                                    <img src={Man} alt='Man' className='AuthorImage' />
                                    <div className='BlogListAuthor'>
                                        <Typography variant="body2" className='BlogListAuthorName'>
                                            {data?.author}
                                        </Typography>
                                        <Typography variant="body2" className='BlogListUploadDate'>
                                            {dateMonth(data?.datePublished)}
                                        </Typography>
                                    </div>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
            {/* Pagination */}
            {filteredBlogData?.length > postsPerPage && (
                <MuiPagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    size="large"
                    className='pagination'
                />
            )}
        </div>
    );
};

export default AllBlog;
