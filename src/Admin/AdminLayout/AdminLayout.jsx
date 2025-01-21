import React, { useState } from 'react';
import { Grid, useMediaQuery, useTheme, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideNavbar from '../Common/SideNavbar';
import UpperNavbar from '../Common/UpperNavbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Common/Footer';
import './AdminLayout.css';  // Add any additional styles needed

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <Grid container className='AdminLayout'>
                {!isXs && (
                    <Grid item xs={isSidebarOpen ? 3 : 0} md={isSidebarOpen ? 3 : 0} lg={isSidebarOpen ? 2 : 0}>
                        <SideNavbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    </Grid>
                )}
                <Grid item xs={isXs ? 12 : isSidebarOpen ? 9 : 12} md={isSidebarOpen ? 9 : 12} lg={isSidebarOpen ? 10 : 12}>
                    <UpperNavbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <Outlet />
                    <Footer />
                </Grid>
                {isXs && (
                    <div className={`side-drawer ${isSidebarOpen ? 'open' : ''}`}>
                        <SideNavbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    </div>
                )}
            </Grid>
        </div>
    );
};

export default AdminLayout;
