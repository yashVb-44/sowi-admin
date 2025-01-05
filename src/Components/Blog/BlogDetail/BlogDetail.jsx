import React, { useEffect, useState } from 'react'
import Header from '../../../Common/Header/Header'
import { Button, Card, CardActionArea, CardContent, Grid, InputBase, LinearProgress, Stack, Typography, alpha, colors, linearProgressClasses, styled } from '@mui/material'
import './BlogDetail.css'
import { useNavigate } from 'react-router-dom'
import { useBlogDetail } from '../../../Context/BlogDetailContext'
import AuthorImage from '../../../Assets/Images/BlogList/Man.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Facebook from '../../../Assets/Images/SocialMedia/Facebook.png'
import Insta from '../../../Assets/Images/SocialMedia/Insta.png'
import Youtube from '../../../Assets/Images/SocialMedia/YouTube.png'
import Linkdin from '../../../Assets/Images/SocialMedia/Linkdin.png'
import Twitter from '../../../Assets/Images/SocialMedia/Twitter.png'
import Telegram from '../../../Assets/Images/SocialMedia/telegram.png'
import SearchIcon from '@mui/icons-material/Search';
import { dateMonth, decodeHtmlEntities, formatNumber } from '../../../Lib/ApiCaller'
import he from 'he';
import { getAllBlog, getBlogByID } from '../../../Lib/BlogApi'
import { getAllProject, getImageSrc } from '../../../Lib/ProjectApi'
import { useProjectList } from '../../../Context/ProjectListContext'
import { useLanguage } from '../../../Context/LanguageContext'
import { getTranslation } from '../../../Common/LanguageFile/transalation'

const BlogDetail = () => {

    let dat = localStorage.getItem('blogData')
    let blogListData = JSON.parse(dat)

    const navigate = useNavigate()

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#239F40' : '#308fe8',
        },
    }));

    const SocialMediaImg = [
        {
          image: Twitter,
          link: "https://x.com/i/flow/login"
        },
        {
          image: Telegram,
          link: "https://t.me/"
        },
      ];


    const { blogData, setBlogData, fetchBlog } = useBlogDetail()
    const [projectData, setProjectData] = useState([]);
    const { selectedLanguage } = useLanguage()
    const [blogDataById, setBlogDataById] = useState(null)

    const fetchProjects = async () => {
        try {
            const response = await getAllProject();
            if (response?.statusCode === 200) {
                const enData = response.data.map(cat => cat.en);
                const faData = response.data.map(cat => cat.fa);
                if (selectedLanguage === 'EN') {
                    setProjectData(enData);
                } else {
                    setProjectData(faData);
                }
            } else {
                // Alert('Info', `${response.message}`, 'info');
            }
        } catch (error) {
        }
    };

    const fetchBlogById = async () => {
        let response = await getBlogByID(blogListData?._id)
        const enBlogs = response.blogs.en;
        const faBlogs = response.blogs.fa;
        {
            selectedLanguage === 'EN' ?
                setBlogDataById(enBlogs)
                :
                setBlogDataById(faBlogs)
        }
    }

    useEffect(() => {
        fetchProjects()
        fetchBlog(selectedLanguage)
        fetchBlogById()
    }, [selectedLanguage, blogData])

    const handleBlogDetail = (data) => {
        navigate('/blog-detail')
        localStorage.setItem('blogData', JSON.stringify(data))
        // setBlogListData(data)
    }
    const handleProjectList = (data) => {
        navigate('/project-detail');
        localStorage.setItem('projectListData', JSON.stringify(data))
    };




    return (
        <div>
            <div className='BlogDetailBg'>
                <div className='Header'>
                    <Header />
                </div>
                <Stack className='BlogDetail'>
                    <Stack>
                        <Typography gutterBottom variant="h5" component="div" className='BlogDetailText' sx={{ textTransform: 'capitalize' }}>
                            {getTranslation('blogDetail.blog', selectedLanguage)}
                            <ArrowForwardIosIcon style={{ margin: 'auto 0px', fontSize: '14px' }} />
                            <Typography className='BlogDetailTextSuccess'>
                                {blogDataById?.title}
                            </Typography>
                        </Typography>
                    </Stack>
                    <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize', }} className='BlogHeadingOne'>
                        {blogDataById?.title}
                    </Typography>
                    <Grid container spacing={4} >
                        <Grid item xs={12} sx={12} md={7} lg={8}>

                            <img src={blogDataById?.featuredImage} className='BlogDetailImage' />
                            <Stack direction="row" alignItems="center" spacing={1} className='BlogDetailAuthorSection'>
                                <img src={AuthorImage} alt='Man' className='AuthorImage' />
                                <div className='BlogDetailAuthor'>
                                    <Typography variant="body2" className='BlogAuthorName'> {blogDataById?.author} </Typography>
                                    <Stack className='LineDivideBlogDetail' ></Stack>
                                    <Typography variant="body2" className='BlogUploadDate'> {dateMonth(blogDataById?.datePublished)} </Typography>
                                </div>
                            </Stack>

                            <Typography component="div" sx={{ textTransform: 'none' }} className='BlogDetailParaa' style={{ marginTop: '3%' }} >
                                <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(blogDataById?.content) }} />
                            </Typography>

                            <Stack className='BlogDetailSocialMedia'>
                                <Typography component="div" style={{ textTransform: 'capitalize' }} className='BlogDetailDonateCreatedDate' >{getTranslation('common.shareThis', selectedLanguage)}</Typography>

                                {SocialMediaImg.map((data, index) => {
                                    return (
                                        <img src={data.image} alt='Social Media'  onClick={() => window.open(data.link, '_blank')} style={{ cursor: 'pointer' }} key={index} />
                                    )
                                })}
                            </Stack>



                        </Grid>
                        <Grid item xs={12} sx={12} md={5} lg={4}>
                            <Stack className='BlogDetailRight'>
                                <Stack>
                                    <Typography component='div' style={{ textTransform: 'capitalize' }} className='SubHeading'> {getTranslation('blogDetail.latestBlog', selectedLanguage)} </Typography>
                                </Stack>
                                {blogData?.slice(-2).map((data, index) => {
                                    return (
                                        <Stack className='LatestBlogDetail' key={index} style={{cursor:'pointer'}} onClick={() => handleBlogDetail(data)} >
                                            <img src={data?.featuredImage} alt='BlogImage' className='LatestBlogImageDetail' />
                                            <Stack className='LatestBlogParaDetail'>
                                                <Typography variant="h6" className='BlogSubHeading'> {data?.title} </Typography>
                                            </Stack>
                                        </Stack>
                                    )
                                })}
                                <Stack className='LineDivideXaxis'>

                                </Stack>

                                <Card className='ProjectCard'>
                                    {projectData?.slice(0, 1).map((data, index) => {
                                        const progressPercentage = (data?.currentAmount / data?.goalAmount) * 100;
                                        return (
                                            <CardActionArea>
                                                <div key={index} style={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '250px', // Adjust height as needed
                                                    backgroundImage: `url(${data?.documentUrl})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    borderRadius: '8px'
                                                }}
                                                    onClick={() => handleProjectList(data)}

                                                >
                                                    <Typography variant="body1" color="text.primary" style={{
                                                        position: 'absolute',
                                                        top: '10px', // Adjust the top position of the text
                                                        left: '10px', // Adjust the left position of the text
                                                        color: 'black',
                                                        backgroundColor: '#fff', // Add background color with some transparency
                                                        padding: '5px 15px',
                                                        borderRadius: '10px',
                                                        fontFamily: "DM Sans",
                                                        fontSize: '14px'
                                                    }}>
                                                        {`${data?.totalPeople} ${getTranslation('common.Donations', selectedLanguage)}`}

                                                    </Typography>
                                                    <Typography variant="body1" color="text.primary" style={{
                                                        position: 'absolute',
                                                        top: '6px', // Adjust the top position of the text
                                                        right: '10px', // Adjust the right position of the text
                                                        color: 'black',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add background color with some transparency
                                                        padding: '1px 4px',
                                                        borderRadius: '10px',

                                                    }}>
                                                        <img src={getImageSrc(data)} alt='' style={{ width: 'auto', height: '40px' }} />
                                                    </Typography>
                                                </div>
                                                <CardContent sx={{ marginTop: '30px', padding: '0px' }}>
                                                    <Typography gutterBottom variant="h5" component="div" className='SupportTextNumber'>
                                                        $ {`${formatNumber(data?.currentAmount)} ${getTranslation('common.Raised', selectedLanguage)}`}
                                                    </Typography>
                                                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                                        <BorderLinearProgress variant="determinate" value={progressPercentage} />
                                                    </Stack>
                                                    <Typography gutterBottom variant="h5" component="div" className='SupportText'>
                                                        {data?.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" className='SupportTextPara'>
                                                        {data?.description?.slice(0, 100)}
                                                    </Typography>
                                                    <Stack className='DonateShare'>
                                                        <Button
                                                            variant='contained'
                                                            className={`ProjectDonateButton `}
                                                            sx={{ textTransform: 'none' }}
                                                            onClick={() => handleProjectList(data)}
                                                        >
                                                            {getTranslation('button.donate', selectedLanguage)}
                                                        </Button>
                                                    </Stack>
                                                </CardContent>
                                            </CardActionArea>
                                        )
                                    })}
                                </Card>

                            </Stack>

                        </Grid>
                    </Grid>
                </Stack>

            </div>
        </div>
    )
}

export default BlogDetail
