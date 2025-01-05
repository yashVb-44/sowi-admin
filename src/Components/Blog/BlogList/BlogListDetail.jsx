import React, { useEffect, useState } from 'react'
import BlogList1 from '../../../Assets/Images/BlogList/BlogList1.png'
import { Button, Card, CardActionArea, CardContent, Grid, InputBase, LinearProgress, Stack, Typography, alpha, colors, linearProgressClasses, styled } from '@mui/material'
import Man from '../../../Assets/Images/BlogList/Man.png'
import BlogImage from '../../../Assets/Images/BlogList/BlogImage.png'
import { getAllBlog } from '../../../Lib/BlogApi'
import { dateMonth, decodeHtmlEntities } from '../../../Lib/ApiCaller'
import { useNavigate } from 'react-router-dom'
import { useBlogDetail } from '../../../Context/BlogDetailContext'
import { useLanguage } from '../../../Context/LanguageContext'

const BlogListDetail = () => {

    const navigate = useNavigate()
    const { blogData, setBlogData } = useBlogDetail()


    const handleBlogDetail = (data) => {
        navigate('/blog-detail')
        // setBlogListData(data)
        localStorage.setItem('blogData', JSON.stringify(data))
    }

    return (
        <div className='BlogListDetail'>
            <div className="BlogItem">
                {blogData?.slice(-1)?.map((data, index) => {
                    return (
                        <Stack className="BlogItemContainer" sx={{ cursor: 'pointer' }} key={index} onClick={() => handleBlogDetail(data)}>
                            <img src={data?.featuredImage} alt='BlogImage' className="BlogImage" />
                            <Stack className="BlogContent">
                                <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='BlogSubHeadingImage'>
                                    {data.title}
                                </Typography>

                                <Typography
                                    sx={{ marginTop: '0.5%' }}
                                    variant="body2"
                                    color="text.secondary"
                                    className='BlogParaTextImage'
                                >
                                    <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(data.content.slice(0, 500)) }} />
                                </Typography>

                                <Stack className='BlogListDetailAuthorImage'>
                                    <img src={Man} alt='Man' />
                                    <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='BlogListAuthorNameImage'>
                                        {data.author}
                                    </Typography>
                                    <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='BlogListUploadDateImage'>
                                        {dateMonth(data.datePublished)}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    )
                })}
            </div>

            {blogData?.slice(-2, -1)?.map((data, index) => {
                return (
                    <Grid container spacing={6} style={{ marginTop: '2%', cursor: 'pointer' }} key={index} onClick={() => handleBlogDetail(data)}>
                        <Grid item xs={12} sx={12} md={6} lg={6}>
                            <img src={data.featuredImage} alt='BlogImage' className='BlogListImage' />
                        </Grid>
                        <Grid item xs={12} sx={12} md={6} lg={6} className='BlogListDetailText'>
                            <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='BlogSubHeading' >
                                {data.title}
                            </Typography>
                            <Typography
                                sx={{ marginTop: '0.5%' }}
                                variant="body2"
                                color="text.secondary"
                                className='BlogParaTextImage'
                            >
                                <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(data.content.slice(0, 800)) }} />
                            </Typography>

                            <Stack className='BlogListDetailAuthor'>
                                <img src={Man} alt='Man' />
                                <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='BlogListAuthorName' >
                                    {data.author}
                                </Typography>
                                <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='BlogListUploadDate' >
                                    {dateMonth(data.datePublished)}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    )
}

export default BlogListDetail
