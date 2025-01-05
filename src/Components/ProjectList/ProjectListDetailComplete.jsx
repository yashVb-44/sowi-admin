import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardActionArea, CardContent, Grid, InputBase, LinearProgress, Stack, Typography, alpha, linearProgressClasses, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { getAllProject, getImageSrc, getProjectCategory } from '../../Lib/ProjectApi';
import { getCategory } from '../../Lib/CategoryApi';
import { Alert } from '../../Common/Alert';
import { useProjectList } from '../../Context/ProjectListContext';
import ScrollToTop from '../../Routes/ScrollToTop';
import { formatNumber } from '../../Lib/ApiCaller';
import { useLanguage } from '../../Context/LanguageContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';

const ProjectListDetailComplete = () => {
    const navigate = useNavigate();
    const { selectedLanguage } = useLanguage();


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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            colors: '#252525',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const [categoryData, setCategoryData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [projectData, setProjectData] = useState([]);
    const [filteredProjectData, setFilteredProjectData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProjects = async () => {
        try {
            const response = await getAllProject();
            if (response?.statusCode === 200) {

                const enData = response.data.map(cat => cat.en);
                let filterEnData = enData.filter((data) => data.status === "inactive")
                const faData = response.data.map(cat => cat.fa);
                let filterFaData = faData.filter((data) => data.status === "inactive")
                if (selectedLanguage === 'EN') {
                    setProjectData(filterEnData);
                    setFilteredProjectData(filterEnData);
                } else {
                    setProjectData(filterFaData);
                    setFilteredProjectData(filterFaData);
                }

            } else {
                // Alert('Info', `${response.message}`, 'info');
            }
        } catch (error) {
            // console.error('Error fetching projects:', error);
        }
    };

    const handleCategory = async (data) => {
        try {
            if (data === 'All') {
                fetchProjects();
            } else {
                const response = await getProjectCategory(data?._id);
                if (response?.statusCode === 200) {
                    const enData = response.data.map(cat => cat.en);
                    let filterEnData = enData.filter((data) => data.status === "inactive")
                    const faData = response.data.map(cat => cat.fa);
                    let filterFaData = faData.filter((data) => data.status === "inactive")
                    if (selectedLanguage === 'EN') {
                        setProjectData(filterEnData);
                        setFilteredProjectData(filterEnData);
                    } else {
                        setProjectData(filterFaData);
                        setFilteredProjectData(filterFaData);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching project category:', error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await getCategory();
            const enCategories = response.categories.map(cat => cat.en);
            const faCategories = response.categories.map(cat => cat.fa);
            {
                selectedLanguage === 'EN' ?
                    (
                        setCategoryData(enCategories)
                    )
                    :
                    setCategoryData(faCategories)
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    useEffect(() => {
        fetchCategory();
        fetchProjects();
    }, [selectedLanguage]);

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchQuery(searchValue);
        if (searchValue.trim() === '') {
            setFilteredProjectData(projectData);
        } else {
            const filteredProjects = projectData.filter((project) =>
                project.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredProjectData(filteredProjects);
        }
    };


    const handleProjectList = (data) => {
        navigate('/project-detail');
        localStorage.setItem('projectListData', JSON.stringify(data))
    };

    const searchInputRef = useRef(null);
    // Focus management logic if needed in specific cases
    useEffect(() => {
        if (searchInputRef.current && document.activeElement !== searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchQuery]);

    return (
        <div className='ProjectListDetail'>
            <ScrollToTop />
            <Stack>
                <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }} className='HeadingListThree'>
                    {getTranslation('projectListDetail.heading', selectedLanguage)}
                </Typography>
                <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='ParaListTwo' >
                    {getTranslation('projectListDetail.para', selectedLanguage)}
                </Typography>
            </Stack>

            <Grid container spacing={3} className='Categories'>
                <Grid item xs={12} md={12} lg={4} style={{ padding: '0px' }}>
                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={selectedLanguage === 'EN' ? 'Search here…' : 'اینجا جستجو کنید…'}
                            inputProps={{ 'aria-label': 'search' }}
                            className='search'
                            value={searchQuery}
                            onChange={handleSearch}
                            // autoFocus  
                            inputRef={searchInputRef}
                        />
                    </Search>
                </Grid>

                <Grid item xs={12} md={12} lg={8} style={{ padding: '0px' }} className='CategoriesList' >
                    <Typography sx={{ marginTop: '1%', cursor: 'pointer' }} style={{ fontWeight: 'All' ? '800' : '400' }} variant="body2" color="text.secondary" className='CategoriesListTwo' onClick={() => handleCategory('All')}>
                        {getTranslation('projectListDetail.all', selectedLanguage)}
                    </Typography>
                    {categoryData?.slice(0, 5)?.map((data, index) => (
                        <Typography key={index} sx={{ marginTop: '1%', cursor: 'pointer' }} style={{ fontWeight: data.title === projectData?.data?.categoryTitle ? '800' : '400' }} variant="body2" color="text.secondary" className='CategoriesListTwo' onClick={() => handleCategory(data)}>
                            {data?.title}
                        </Typography>
                    ))}
                </Grid>
            </Grid>

            <Grid container spacing={2} className='ProjectListImage'>
                {filteredProjectData?.slice(0, visibleCount)?.map((data, index) => {

                    const progressPercentage = Math.min((data?.currentAmount / data?.goalAmount) * 100, 100);
                    return (
                        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                            <Card className='ProjectCard'>
                                <CardActionArea>
                                    <div style={{

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
                                            $  {`${formatNumber(data?.currentAmount)} ${getTranslation('common.Raised', selectedLanguage)}`}
                                        </Typography>
                                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                            <BorderLinearProgress variant="determinate" value={progressPercentage} />
                                        </Stack>
                                        <Typography gutterBottom variant="h5" component="div" className='SupportText'>
                                            {data?.title?.slice(0, 30)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className='SupportTextPara'>
                                            {data?.description?.slice(0, 60)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <Stack className='ProjectListButton'>
                <Button
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                    onClick={handleLoadMore}
                    disabled={visibleCount >= filteredProjectData.length}
                >
                    {selectedLanguage === 'EN' ? (visibleCount >= filteredProjectData.length ? 'No More Projects' : 'Load More') : (visibleCount >= filteredProjectData.length ? 'بدون پروژه دیگر' : 'بارگذاری بیشتر')}
                </Button>
            </Stack>
        </div>
    );
};


export default ProjectListDetailComplete
