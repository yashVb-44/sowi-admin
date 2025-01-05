import React, { useEffect, useState } from 'react'
import CategoryImg from '../../../Assets/Images/FundCat/FundraiseCatDetailImg2.png'
import './FundraiseCategoryDetail.css'
import { Grid, Stack, Typography } from '@mui/material'
import { useFundraise } from '../../../Context/FundraiseContext'
import { getProjectCategory } from '../../../Lib/ProjectApi'
import { useProjectList } from '../../../Context/ProjectListContext'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../../Context/LanguageContext'
import { getCategoryById } from '../../../Lib/CategoryApi'

const CategoryDetail = () => {

    // const { categoryId, setCategoryId } = useFundraise()

    const { setProjectListData } = useProjectList()
    const { selectedLanguage } = useLanguage()
    const navigate = useNavigate()

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryId = localStorage?.getItem('categoryId')

    const fetchProject = async () => {
        setLoading(true);
        try {
            let response = await getProjectCategory(categoryId);
            if (response?.statusCode === 200) {
                if (selectedLanguage === 'EN') {
                    setCategoryData(response?.data?.map(cat => cat?.en))
                } else {
                    setCategoryData(response?.data?.map(cat => cat?.fa))
                }
            }
        } catch (error) {
        } finally {
            setLoading(false); // Set loading to false after API call completes
        }
    };

    useEffect(() => {
        fetchProject();
    }, [categoryId, selectedLanguage]);

    const handleProjectList = (data) => {
        navigate('/project-detail');
        setProjectListData(data)
    };

    return (

        <Grid container >
            {loading ? (
                <Typography variant="h5" component="div">
                    {/* Loading... */}
                </Typography>
            ) : (
                <>
                    {categoryData?.slice(0, 1)?.map((data, index) => {
                        return (
                            <Grid item sx={12} md={10} lg={10} style={{ cursor: 'pointer' }} className='FundCatDetail' onClick={() => handleProjectList(data)} >

                                <img src={data?.documentUrl} alt='Category Image' />

                                <Stack className='FundCatDetailText'>
                                    <Typography className='SubHeadingColor'> {data?.categoryId?.title}   </Typography>
                                    <Typography className='HeadingListThree'> {data?.title}  </Typography>
                                    <Typography sx={{ marginTop: '2%' }} className='ParaListTwo'> {data?.description?.slice(0, 800)}  {data?.description?.length > 800 ? '...' : ''} </Typography>
                                </Stack>
                            </Grid>
                        )
                    })}
                </>
            )}
        </Grid>

    )
}

export default CategoryDetail
