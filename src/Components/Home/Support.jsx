import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Card, CardActionArea, CardContent, Stack } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Support.css';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getAllProject, getImageSrc } from '../../Lib/ProjectApi';
import { useProjectList } from '../../Context/ProjectListContext';
import { formatNumber } from '../../Lib/ApiCaller';
import { useLanguage } from '../../Context/LanguageContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useContent } from '../../Context/ContentContext';

const Support = () => {
    const sliderRef = React.useRef(null); // Create a ref for the slider
    const { homeContent } = useContent()
    const navigate = useNavigate();
    const { setProjectListData } = useProjectList();
    const { selectedLanguage } = useLanguage()

    const [projectData, setProjectData] = useState([]);
    const fetchProjects = async () => {
        try {
            const response = await getAllProject();
            if (response?.statusCode === 200) {
                const enData = response?.data?.map(cat => cat?.en);
                let filterEnData = enData.filter((data) => data.status === "active")
                const faData = response?.data?.map(cat => cat?.fa);
                let filterFaData = faData.filter((data) => data.status === "active")
                {
                    selectedLanguage === 'EN' ?
                        setProjectData(filterEnData)
                        :
                        setProjectData(filterFaData);
                }
            } else {
                // Alert('Info', `${response.message}`, 'info');
            }
        } catch (error) {
            // console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [selectedLanguage]);

    const handleProjectList = (data) => {
        navigate('/project-detail');
        localStorage.setItem('projectListData', JSON.stringify(data))
    };

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

    const settings = {
        dots: false,
        infinite: projectData.length > 1,  // Disable infinite loop for a single item
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: projectData.length > 1, // Disable autoplay for a single item
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: projectData.length > 1,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: projectData.length > 1,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: projectData.length > 1,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className='Support'>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={10}>
                    <div className='SupportTextTwo'>
                        <Typography gutterBottom variant="h5" component="div" className='SupportTextHead'>
                            {homeContent?.part0?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='SupportTextPara'>
                            {homeContent?.part0?.description}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} lg={2} style={{ display: 'flex', margin: 'auto 0px' }}>
                    <Button variant="outlined" className='SupportButton' sx={{ textTransform: 'none' }} onClick={() => navigate('/project')}> {getTranslation('common.seeAll', selectedLanguage)} </Button>
                </Grid>
            </Grid>

            <Slider ref={sliderRef} {...settings} className="Slider">
                {(Array.isArray(projectData) ? projectData : []).map((data, index) => {
                    const progressPercentage = data.goalAmount ? (data.currentAmount / data.goalAmount) * 100 : 0;
                    return (
                        <div key={index}>
                            <Card className='SupportCardTwo'>
                                <CardActionArea>
                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '250px', // Adjust height as needed
                                        backgroundImage: `url(${data?.documentUrl || 'default-image-path.png'})`, // Use default image if documentUrl is undefined
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
                                            {data?.description?.slice(0, 60)}...
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    );
                })}
            </Slider>

            <Stack className='SupportNextPrev'>
                <Button variant="outlined" className='SupportPrevButton' onClick={() => sliderRef.current.slickPrev()}> <ArrowBackIcon /> </Button>
                <Button variant="outlined" className='SupportNextButton' onClick={() => sliderRef.current.slickNext()}> <ArrowForwardIcon /> </Button>
            </Stack>
        </div>
    );
};

export default Support;
