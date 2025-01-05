import { Button, Card, CardActionArea, CardContent, Box, Grid, LinearProgress, Stack, Typography, alpha, colors, linearProgressClasses, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageSrc, getProjectCategory } from '../../../Lib/ProjectApi';
import { useFundraise } from '../../../Context/FundraiseContext';
import { useProjectList } from '../../../Context/ProjectListContext';
import { useLanguage } from '../../../Context/LanguageContext';
import { getTranslation } from '../../../Common/LanguageFile/transalation';
import { formatNumber } from '../../../Lib/ApiCaller';
import { useContent } from '../../../Context/ContentContext';

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

const AllFundRaise = () => {
    const navigate = useNavigate();
    const { categoryIdData } = useContent();

    const [categoryData, setCategoryData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);

    const { setProjectListData } = useProjectList()
    const { selectedLanguage } = useLanguage()
    const [loading, setLoading] = useState(false);


    const categoryId = localStorage?.getItem('categoryId')
    const fetchProject = async () => {
        setLoading(true);
        try {
            let response = await getProjectCategory(categoryId);
            if (response?.statusCode === 200) {
                if (selectedLanguage === 'EN') {
                    setCategoryData(response?.data?.map(cat => cat?.en) || []);
                } else {
                    setCategoryData(response?.data?.map(cat => cat?.fa) || []);
                }
            }
            else {
                setCategoryData([]);
            }
        } catch (error) {
            setCategoryData([]);
            // console.error('Error fetching project categories:', error);
        } finally {
            setLoading(false); // Set loading to false after API call completes
        }  
    };

    useEffect(() => {
        fetchProject();
    }, [categoryId, selectedLanguage]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 8);
    };

    const handleProjectList = (data) => {
        navigate('/project-detail');
        setProjectListData(data)
        localStorage.setItem('projectListData', JSON.stringify(data))
    };

    return (
        <div className='ProjectListDetail'>
            {loading ? (
                <Typography variant="h5" component="div">
                    Loading...
                </Typography>
            ) : (
                <>
                    <Stack>
                        {categoryIdData &&
                            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }} className='HeadingListThree'>
                                {`${getTranslation('fundraise.allFundraisingFor', selectedLanguage)} ${(categoryIdData?.title)}`}
                            </Typography>
                        }
                        <Typography sx={{ marginTop: '0.5%' }} variant="body2" color="text.secondary" className='ParaListTwo'>
                            {categoryIdData?.categoryDescription}
                        </Typography>
                    </Stack>

                    <Grid container className='ProjectListImage' style={{ gap: '20px' }}>
                        {categoryData?.slice(0, visibleCount)?.map((data, index) => {
                            const progressPercentage = Math.min((data?.currentAmount / data?.goalAmount) * 100, 100);

                            return (
                                <Grid className='FundraiseBox' key={index}>
                                    <Card className='FundraiseCard' onClick={() => handleProjectList(data)}>
                                        <CardActionArea>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: '390px', // Responsive width
                                                    //maxWidth: '390px', // Fixed max-width for larger screens
                                                    height: '250px', // Fixed height for all devices
                                                    mx: 'auto', // Center the Box horizontally
                                                    backgroundImage: `url(${data?.documentUrl})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden', // Ensure content does not overflow the Box
                                                  
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        left: '10px',
                                                        color: 'black',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                        padding: '5px 15px',
                                                        borderRadius: '10px',
                                                        fontFamily: "DM Sans",
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    {`${(data?.totalPeople)} ${getTranslation('common.Donations', selectedLanguage)}`}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        color: 'black',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                        padding: '1px 4px',
                                                        borderRadius: '10px',
                                                        display: 'flex',
                                                        alignItems: 'center', // Ensure the image is centered within the Typography
                                                    }}
                                                >
                                                    <img src={getImageSrc(data)} alt='' style={{ width: 'auto', height: '40px' }} />
                                                </Typography>
                                            </Box>
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
                                                    {data?.description.slice(0, 80)} {data?.description?.length > 80 ? '...' : ''}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>




                    <Stack className='ProjectListButton'>
                        <Button
                            variant="outlined"
                            sx={{ textTransform: 'none' }}
                            onClick={handleLoadMore}
                            disabled={visibleCount >= categoryData?.length}
                        >
                            {visibleCount >= categoryData.length ? getTranslation('common.noMoreProject', selectedLanguage) : getTranslation('common.loadMore', selectedLanguage)}
                        </Button>
                    </Stack>
                </>
            )}
        </div>
    );
};

export default AllFundRaise;
