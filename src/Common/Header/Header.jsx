import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Divider, Radio, Stack } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ReactCountryFlag from 'react-country-flag';
import './Header.css';
import { getCategory } from '../../Lib/CategoryApi';
import { useFundraise } from '../../Context/FundraiseContext';
import axios from 'axios';
import { useLanguage } from '../../Context/LanguageContext';
import { fetchTranslations } from '../../Lib/ApiCaller';
import { getTranslation } from '../LanguageFile/transalation';
import en from '../LanguageFile/en.json'
import fa from '../LanguageFile/fa.json'

const Header = () => {

  const location = useLocation();
  const navigate = useNavigate()

  let accessToken = sessionStorage?.getItem('accessToken')

  const { setCategoryId } = useFundraise()

  const { selectedLanguage, setSelectedLanguage, languageList, selectedFlagCode, setSelectedFlagCode, selectedLangaugeName, setSelectedLanguageName } = useLanguage()

  const [pages, setPages] = useState([]);
  useEffect(() => {
    if (selectedLanguage === 'EN') {
      setPages(en.header.pages);
    } else {
      setPages(fa.header.pages);
    }
  }, [selectedLanguage]);

  const handleLogout = () => {
    localStorage.clear(accessToken)
    navigate('/signin')
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElFund, setAnchorElFund] = useState(null);
  const [anchorElProject, setAnchorElProject] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenMenuFund = (event) => {
    setAnchorElFund(event.currentTarget);
  };
  const handleOpenMenuProject = (event) => {
    setAnchorElProject(event.currentTarget);
  };

  const handleCloseMenuFund = () => {
    setAnchorElFund(null);
  };
  const handleCloseMenuProject = () => {
    setAnchorElProject(null);
  };


  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (language) => {
    let lanData = JSON.stringify(language)
    localStorage.setItem('language', lanData)
    setSelectedLanguage(language.code);
    setSelectedFlagCode(language.flag);
    setSelectedLanguageName(language.name);
    handleCloseMenu();
  };

  useEffect(() => {
    let data = localStorage.getItem('language');
    if (data) {
      let dat = JSON.parse(data);
      handleChangeLanguage(dat);
    }
  }, []);

  const [project, setProject] = useState([])

  const projectEnglish = [
    {
      "name": "Completed Project",
      "link": "project-complete"
    },
    {
      "name": "Incomplete Project",
      "link": "project"
    },
  ]
  const projectFarsi = [
    {
      "name": "پروژه تکمیل شده",
      "link": "project-complete"
    },
    {
      "name": "پروژه تکمیل نشده",
      "link": "project"
    },
  ]

  useEffect(() => {
    {
      selectedLanguage === 'EN' ?
        setProject(projectEnglish)
        :
        setProject(projectFarsi)
    }
  }, [project, selectedLanguage])

  const [categoryData, setCategoryData] = useState([])

  const fetchCategory = async () => {
    let response = await getCategory()
    {
      selectedLanguage === 'EN' ?
        (
          setCategoryData(response?.categories?.map(cat => cat.en))
        )
        :
        setCategoryData(response?.categories?.map(cat => cat.fa))
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [selectedLanguage])

  const handleChangeFund = (data) => {
    const dat = JSON.stringify(data)
    localStorage.setItem('categoryId', data._id)
    handleCloseMenuFund();
    navigate('/fundraise-cat')
    // window.location.reload(); 
  };

  const handleChangeProject = (data) => {
    navigate(`/${data.link}`)
    // window.location.reload(); 
  };



  return (
    <AppBar position="static" className='Navbar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt='Logo' className='HomeLogo' />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages?.map((page) => (
                (page.name === 'Categories' || page.name === 'دسته بندی ها') ? (
                  <MenuItem key="Fundraise">
                    <Stack className='FundRaiseDropdown'>
                      <Button
                        aria-controls="fundraise-menu"
                        aria-haspopup="true"
                        onClick={handleOpenMenuFund}
                        sx={{ my: 2, color: '#252525', display: 'flex', textTransform: 'none', fontWeight: location.pathname === '/fundraise' ? '600' : '400' }}
                        className='LanguageDropDown FontFamily'
                        endIcon={<ExpandMore style={{ color: '#565656' }} />}
                      >

                        {getTranslation('header.Categories', selectedLanguage)}

                      </Button>
                      <Menu
                        id="fundraise-menu"
                        anchorEl={anchorElFund}
                        open={Boolean(anchorElFund)}
                        onClose={handleCloseMenuFund}
                        className='LanguageMenu FontFamily'
                      >
                        {categoryData?.slice(0, 4)?.map((data, index) => (
                          <MenuItem key={index} onClick={() => handleChangeFund(data)}>
                            <Stack className='FontFamily' spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                              {data?.title}
                            </Stack>
                          </MenuItem>
                        ))}
                        <Stack className='LanguageDivider' />
                        <MenuItem component={Link} to='/categories' >
                          <Typography className='FundraiseSeeAll' sx={{ cursor: 'pointer' }} > {getTranslation('common.seeAll', selectedLanguage)} </Typography>
                        </MenuItem>
                      </Menu>
                    </Stack>
                  </MenuItem>
                ) : (
                  (page.name === 'Project' || page.name === 'پروژه') ? (
                    <Stack key="Project" className='FundRaiseDropdown '>
                      <Button
                        aria-controls="fundraise-menu"
                        aria-haspopup="true"
                        onClick={handleOpenMenuProject}
                        sx={{ my: 2, color: '#252525', display: 'flex', textTransform: 'none', fontWeight: location.pathname === '/fundraise' ? '600' : '400' }}
                        className='LanguageDropDown FontFamily'
                        endIcon={<ExpandMore style={{ color: '#565656' }} />}
                      >
                        {getTranslation('header.Project', selectedLanguage)}
                      </Button>
                      <Menu
                        id="fundraise-menu"
                        anchorEl={anchorElProject}
                        open={Boolean(anchorElProject)}
                        onClose={handleCloseMenuProject}
                        className='LanguageMenu FontFamily '
                      >
                        {project?.map((data, index) => (
                          <MenuItem key={index} onClick={() => handleChangeProject(data)} className='FundRaiseDropdownTwo'>
                            <Stack className='FontFamily' spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                              {data?.name}
                            </Stack>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Stack>
                  )
                    : (
                      <Button
                        key={page.name}
                        component={Link}
                        to={`/${page.link.toLowerCase().replace(/\s+/g, '-')}`}
                        className='FontFamily'
                        sx={{
                          color: '#252525',
                          textTransform: 'none',
                          fontWeight: location.pathname === `/${page.link.toLowerCase().replace(/\s+/g, '-')}` ? '600' : '400',
                        }}
                      >
                        <MenuItem
                          key={page.name}
                          onClick={handleCloseNavMenu}
                          component={Link}
                          to={`/${page.link.toLowerCase().replace(/\s+/g, '-')}`}
                          selected={location.pathname === `/${page.link.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Typography textAlign="center" className='Service FontFamily'>
                            {page.name}
                          </Typography>
                        </MenuItem>
                      </Button>
                    )
                )
              ))}
            </Menu>
          </Box>

          <Box className="Service" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages?.map((page) => (
              (page.name === 'Categories' || page.name === 'دسته بندی ها') ? (
                <Stack key="Fundraise" className='FundRaiseDropdown '>
                  <Button
                    aria-controls="fundraise-menu"
                    aria-haspopup="true"
                    onClick={handleOpenMenuFund}
                    sx={{ my: 2, color: '#252525', display: 'flex', textTransform: 'none', fontWeight: location.pathname === '/fundraise' ? '600' : '400' }}
                    className='LanguageDropDown FontFamily'
                    endIcon={<ExpandMore style={{ color: '#565656' }} />}
                  >
                    {getTranslation('header.Categories', selectedLanguage)}
                  </Button>
                  <Menu
                    id="fundraise-menu"
                    anchorEl={anchorElFund}
                    open={Boolean(anchorElFund)}
                    onClose={handleCloseMenuFund}
                    className='LanguageMenu FontFamily '
                  >
                    {categoryData?.slice(0, 4)?.map((data, index) => (
                      <MenuItem key={index} onClick={() => handleChangeFund(data)} className='FundRaiseDropdownTwo'>
                        <Stack className='FontFamily' spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                          {data?.title}
                        </Stack>
                      </MenuItem>
                    ))}
                    <Stack className='LanguageDivider' />
                    <MenuItem component={Link} to='/categories' className='FundRaiseDropdownTwo' >
                      <Typography className='FundraiseSeeAll' sx={{ cursor: 'pointer' }} >{selectedLanguage === 'EN' ? 'See All' : 'همه را ببین'}</Typography>
                    </MenuItem>
                  </Menu>
                </Stack>
              ) : (
                (page.name === 'Project' || page.name === 'پروژه') ? (
                  <Stack key="Project" className='FundRaiseDropdown '>
                    <Button
                      aria-controls="fundraise-menu"
                      aria-haspopup="true"
                      onClick={handleOpenMenuProject}
                      sx={{ my: 2, color: '#252525', display: 'flex', textTransform: 'none', fontWeight: location.pathname === '/fundraise' ? '600' : '400' }}
                      className='LanguageDropDown FontFamily'
                      endIcon={<ExpandMore style={{ color: '#565656' }} />}
                    >
                      {getTranslation('header.Project', selectedLanguage)}
                    </Button>
                    <Menu
                      id="fundraise-menu"
                      anchorEl={anchorElProject}
                      open={Boolean(anchorElProject)}
                      onClose={handleCloseMenuProject}
                      className='LanguageMenu FontFamily '
                    >
                      {project?.map((data, index) => (
                        <MenuItem key={index} onClick={() => handleChangeProject(data)} className='FundRaiseDropdownTwo'>
                          <Stack className='FontFamily' spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            {data?.name}
                          </Stack>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                )
                  : (
                    <Button
                      key={page.name}
                      component={Link}
                      to={`/${page.link.toLowerCase().replace(/\s+/g, '-')}`}
                      className='FontFamily'
                      sx={{
                        color: '#252525',
                        textTransform: 'none',
                        fontWeight: location.pathname === `/${page.link.toLowerCase().replace(/\s+/g, '-')}` ? '600' : '400',
                      }}
                    >
                      <MenuItem
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        component={Link}
                        to={`/${page.link.toLowerCase().replace(/\s+/g, '-')}`}
                        selected={location.pathname === `/${page.link.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <Typography textAlign="center" className='Service FontFamily'>
                          {page.name}
                        </Typography>
                      </MenuItem>
                    </Button>
                  )
              )
            ))}
          </Box>

          <Box className="Service_Two" xs={{ display: 'none' }} sx={{ display: 'flex' }} md={{ flexGrow: 0, display: 'flex' }}>
            <Stack className='LanguageDropDown'>
              <Stack style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={selectedFlagCode} svg style={{ margin: 'auto 0px', width: '20px', height: '20px', borderRadius: '20px' }} />
                <Button
                  aria-controls="language-menu"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                  sx={{ my: 2, color: '#252525', display: 'flex', textTransform: 'none', fontWeight: '400' }}
                  className='LanguageDropDown FontFamily'
                  endIcon={<ExpandMore style={{ color: '#565656' }} />}
                >
                  {selectedLanguage}
                </Button>
              </Stack>
              <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                className='LanguageMenu FontFamily'
              >
                <MenuItem>
                  <Radio
                    checked
                    color="primary"
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: '1rem',
                      },
                      '&.Mui-checked': {
                        color: '#239F40',
                      },
                    }}
                  />
                  <Stack className='FontFamily' spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <img src={selectedFlagCode} svg style={{ margin: 'auto 0px', width: '20px', height: '20px', borderRadius: '20px' }} />
                    {selectedLangaugeName}
                  </Stack>
                </MenuItem>
                <Stack className='LanguageDivider' />
                {languageList.map((data, index) => (
                  selectedLanguage !== data.code && (
                    <MenuItem key={index} onClick={() => handleChangeLanguage(data)}>
                      <Radio
                        checked={selectedLanguage === data.code}
                        color="primary"
                        className='FontFamily'
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: '1rem',
                          },
                          '&.Mui-checked': {
                            color: '#239F40',
                          },
                        }}
                      />
                      <Stack className='FontFamily' spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <img src={data.flag} svg style={{ margin: 'auto 0px', width: '20px', height: '20px', borderRadius: '20px' }} />  {data.name}
                      </Stack>
                    </MenuItem>
                  )
                ))}
              </Menu>
            </Stack>

            {!accessToken &&
              <Button
                component={Link}
                className='FontFamily'
                to="/signin"
                sx={{ my: 2, color: '#252525', display: 'block', textTransform: 'none' }}
              >
                {selectedLanguage === 'EN' ? 'Sign in' : 'ورود'}
              </Button>
            }

            {accessToken &&
              <Button
                className='FontFamily'
                onClick={() => handleLogout()}
                sx={{ my: 2, color: '#252525', display: 'block', textTransform: 'none' }}
              >
                {getTranslation('common.logout', selectedLanguage)}
              </Button>
            }


            <Button
              component={Link}
              to="/project"
              className='DonateButton FontFamily Service_Three'
              sx={{ textTransform: 'none' }}
            >
              {getTranslation('button.donate', selectedLanguage)}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
