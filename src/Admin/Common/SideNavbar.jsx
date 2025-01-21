import React, { useState } from 'react';
import { Stack, Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';
import SowiImage from '../../Assets/AdminImages/sowi-img.png';
import ProjectIcon from '../../Assets/AdminImages/SideNavbar/ProjectIcon.png';
import ProjectGreenIcon from '../../Assets/AdminImages/SideNavbar/ProjectGreenIcon.png';
import UserIcon from '../../Assets/AdminImages/SideNavbar/BlogIcon.png';
import UserGreenIcon from '../../Assets/AdminImages/SideNavbar/BlogGreenIcon.png';
import BlogIcon from '../../Assets/AdminImages/SideNavbar/BlogIcon.png';
import SiteIcon from '../../Assets/AdminImages/SideNavbar/SiteContent.png';
import BlogGreenIcon from '../../Assets/AdminImages/SideNavbar/BlogGreenIcon.png';
import CategoryIcon from '../../Assets/AdminImages/SideNavbar/CategoryIcon.png';
import CategoryGreenIcon from '../../Assets/AdminImages/SideNavbar/CategoryGreenIcon.png';
import SiteIconGreen from '../../Assets/AdminImages/SideNavbar/SiteContentGreen.png';
import './SideNavbar.css';

const SideNavbar = ({ isOpen, toggleSidebar }) => {
    const [isSiteContentOpen, setIsSiteContentOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const sidenavbarMenu = [
        {
            icon: ProjectIcon,
            iconGreen: ProjectGreenIcon,
            name: 'DashBoard',
            path: '/admin'
        },
        {
            icon: UserIcon,
            iconGreen: UserGreenIcon,
            name: 'User Management',
            path: '/admin/user'
        },
        {
            icon: UserIcon,
            iconGreen: UserGreenIcon,
            name: 'Vendor Management',
            path: '/admin/vendor'
        },
        {
            icon: CategoryIcon,
            iconGreen: CategoryGreenIcon,
            name: 'Category Management',
            path: '/admin/category'
        },
        {
            icon: CategoryIcon,
            iconGreen: CategoryGreenIcon,
            name: 'Expense-Category Management',
            path: '/admin/expense-category'
        },
        {
            icon: CategoryIcon,
            iconGreen: CategoryGreenIcon,
            name: 'Company Management',
            path: '/admin/company'
        },
        {
            icon: CategoryIcon,
            iconGreen: CategoryGreenIcon,
            name: 'Shop-Service Management',
            path: '/admin/shop-service'
        },
        {
            icon: CategoryIcon,
            iconGreen: CategoryGreenIcon,
            name: 'Emergency-Service Management',
            path: '/admin/emergency-service'
        },
        {
            icon: BlogIcon,
            iconGreen: BlogGreenIcon,
            name: 'Banner Management',
            path: '/admin/banner'
        },
        {
            icon: BlogIcon,
            iconGreen: BlogGreenIcon,
            name: 'Video-Library Management',
            path: '/admin/video-library'
        },
        {
            icon: BlogIcon,
            iconGreen: BlogGreenIcon,
            name: 'Support Management',
            path: '/admin/support'
        },
        // {
        //     icon: SiteIcon,
        //     iconGreen: SiteIconGreen,
        //     name: 'Site Content',
        //     path: '/admin/site-content',
        //     arrow: KeyboardArrowRightIcon,
        //     arrowDown: KeyboardArrowDownIcon,
        // },
    ];

    const siteContent = [
        {
            name: 'Home',
            path: '/admin/site-content'
        },
        {
            name: 'About',
            path: '/admin/site-content/about'
        },
        {
            name: 'Contact US',
            path: '/admin/site-content/contact'
        },
        {
            name: 'Terms',
            path: '/admin/site-content/terms'
        },
        {
            name: 'Privacy',
            path: '/admin/site-content/privacy'
        },
    ];

    const handleNavigate = (data) => {
        navigate(data);
        if (data.startsWith('/admin/site-content')) {
            setIsSiteContentOpen(true);
        }
    };

    return (
        <div className={`SideNavbar ${isOpen ? 'open' : 'closed'}`}>
            {isOpen && (
                <Box role="presentation">
                    <Stack className='container'>
                        <CloseIcon className='closeIcon' onClick={toggleSidebar} />
                        <img src={SowiImage} alt="Logo" className='SideNavbarLogo' />
                    </Stack>
                    <List>
                        {sidenavbarMenu.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    className={`
                                        ${location.pathname === item.path ? 'SideNavbarTextFieldActive' : 'SideNavbarTextField'}
                                        ${isSiteContentOpen && item.path === '/admin/site-content' ? 'SideNavbarTextFieldActive' : 'SideNavbarTextField'}
                                    `}
                                    onClick={() => {
                                        handleNavigate(item.path);
                                    }}
                                >
                                    {item.icon && <img src={`${location.pathname === item.path ? item.iconGreen : item.icon}`} alt={item.name} />}
                                    <ListItemText primary={item.name} />
                                    {item.arrow && (isSiteContentOpen ? <item.arrowDown /> : <item.arrow />)}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {isSiteContentOpen && (
                        <Stack>
                            {siteContent.map((data, index) => (
                                <Stack
                                    key={index}
                                    className={`${location.pathname === data.path ? 'SideNavbarSiteContentActive' : 'SideNavbarSideContent'}`}
                                    onClick={() => handleNavigate(data.path)}
                                >
                                    <RemoveIcon />
                                    <Typography
                                        className={`${location.pathname === data.path ? 'sitecontectTextActive' : 'SitecontectText'}`}
                                    >
                                        {data.name}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    )}
                </Box>
            )}
        </div>
    );
};

export default SideNavbar;
