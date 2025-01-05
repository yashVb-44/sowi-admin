import React, { useEffect } from 'react';
import Header from '../../../Common/Header/Header';
import { Stack, Typography, InputBase, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './BlogList.css';
import BlogListDetail from './BlogListDetail';
import LatestBlog from './LatestBlog';
import AllBlog from './AllBlog';
import { useBlogDetail } from '../../../Context/BlogDetailContext';
import { getAllBlog } from '../../../Lib/BlogApi';
import { useLanguage } from '../../../Context/LanguageContext';
import { getTranslation } from '../../../Common/LanguageFile/transalation';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '10px',
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
    zIndex: 1,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
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

const BlogList = () => {

    const { blogData, fetchBlog } = useBlogDetail()
    const { selectedLanguage } = useLanguage()
    useEffect(() => {
        fetchBlog(selectedLanguage)
    }, [selectedLanguage])

    return (
        <div className='BlogListBg'>
            <div className='Header'>
                <Header />
            </div>
            <Stack className='BlogList'>
                <Typography gutterBottom variant="h5" component="div" className='BlogListText' sx={{ textTransform: 'capitalize' }}>
                    {getTranslation('blog.header', selectedLanguage)}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'uppercase' }} className='BlogHeadingsOne'>
                    {getTranslation('blog.heading', selectedLanguage)}
                </Typography>

                <Typography variant="body2" color="text.secondary" className='BlogPara'>
                    {getTranslation('blog.para', selectedLanguage)}
                </Typography>

                {/* <Stack style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2%' }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search here…"
                            inputProps={{ 'aria-label': 'search' }}
                            className='searchBlog'
                        />
                    </Search>
                </Stack> */}

                <BlogListDetail />
                <LatestBlog />
                {blogData?.length > 4 &&
                    <AllBlog />
                }
            </Stack>
        </div>
    );
};

export default BlogList;
