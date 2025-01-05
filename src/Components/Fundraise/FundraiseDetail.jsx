import React, { useEffect, useState } from 'react'
import FundraiseDetailImg1 from '../../Assets/Images/FundCat/FundraiseDetailImg1.png'
import FundraiseDetailImg2 from '../../Assets/Images/FundCat/FundraiseDetailImg2.png'
import { Grid, Typography } from '@mui/material'
import { getAllProject } from '../../Lib/ProjectApi'
import { useLanguage } from '../../Context/LanguageContext'

const FundraiseDetail = () => {

    const [projectData, setProjectData] = useState([]);
    const {selectedLanguage} = useLanguage()

    const fetchProjects = async () => {
        try {
            const response = await getAllProject();
            if (response.statusCode === 200) {
                if (selectedLanguage === 'EN') {
                    setProjectData(response?.data?.map(cat => cat?.en))
                } else {
                    setProjectData(response?.data?.map(cat => cat?.fa))
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

    return (
        <div className='FundraiseDetail'>
            {projectData?.slice(-2)?.map((data, index) => {
                return (
                    <Grid container spacing={4} key={index} className='DisplayTabletNot'>
                        {index % 2 !== 0 ? (
                            <>
                                {/* Image side */}
                                <Grid item xs={12} md={6} lg={6} className='FundraiseDetailImg'>
                                    <img src={data?.documentUrl} alt='Fundraise' />
                                </Grid>
                                {/* Text side */}
                                <Grid item xs={12} md={6} lg={6} className='FundraiseDetailText'>
                                    <Typography className='SubHeadingColor'> {data?.categoryName} </Typography>
                                    <Typography className='HeadingListThree'> {data?.title} </Typography>
                                    <Typography sx={{ marginTop: '2%' }} className='ParaListTwo'> {data?.description?.slice(0, 1000)} {data?.description?.length > 800 ? "..." : ""} </Typography>
                                </Grid>
                            </>
                        ) : (
                            <>
                                {/* Text side */}
                                <Grid item xs={12} md={6} lg={6} className='FundraiseDetailText'>
                                    <Typography className='SubHeadingColor'> {data?.categoryName} </Typography>
                                    <Typography className='HeadingListThree'> {data?.title} </Typography>
                                    <Typography sx={{ marginTop: '2%' }} className='ParaListTwo'>{data?.description?.slice(0, 1000)} {data?.description?.length > 800 ? "..." : ""}</Typography>
                                </Grid>
                                {/* Image side */}
                                <Grid item xs={12} md={6} lg={6} className='FundraiseDetailImg'>
                                    <img src={data?.documentUrl} alt='Fundraise' />
                                </Grid>
                            </>
                        )}
                    </Grid>
                )
            })}


            {/* // this for small devices  */}
            {projectData?.slice(-2)?.map((data, index) => {
                return (
                    <Grid container spacing={4} key={index} className='DisplayTablet'>
                        <Grid item xs={12} md={6} lg={6} className='FundraiseDetailImg'>
                            <img src={data?.documentUrl} alt='Fundraise' />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} className='FundraiseDetailText'>
                            <Typography className='SubHeadingColor'> {data?.categoryName} </Typography>
                            <Typography className='HeadingListThree'> {data?.title} </Typography>
                            <Typography sx={{ marginTop: '2%' }} className='ParaListTwo'>{data?.description?.slice(0, 800)} {data?.description?.length > 800 ? "..." : ""}</Typography>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    )
}

export default FundraiseDetail
