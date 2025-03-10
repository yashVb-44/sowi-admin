import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Grid, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import ProjectIcon from '../../Assets/AdminImages/Dashboard/ProjectIcon.png'
import ProgressIcon from '../../Assets/AdminImages/Dashboard/ProgressIcon.png'
import CompleteIcon from '../../Assets/AdminImages/Dashboard/CompleteIcon.png'
import DonateIcon from '../../Assets/AdminImages/Dashboard/DonateIcon.png'
import DashboardTabel from './DashboardTabel';
import AddProject from '../AddProject/AddProject';
import ViewProject from '../ViewProject/ViewProject';
import EditProject from '../EditProject/EditProject';
import { formatNumber } from '../../Lib/ApiCaller';
import { dashboardInfo } from '../../Lib/AdminApi';
import BannerManagementTabel from '../BannerManagement/BannerManagementTable';
import UserManagementTabel from '../UserManagement/UserManagementTabel';

const Dashboard = () => {

    const [count, setCount] = useState(null)
    const fetchDashboard = async () => {
        let response = await dashboardInfo()
        setCount(response?.stats)
    }

    useEffect(() => {
        console.log("workkk")
        fetchDashboard()
    }, [])

    const dashboardJson = [
        {
            title: 'Total User',
            number: count?.totalUsers,
            icon: ProjectIcon,
            color: '#FFFAEB'
        },
        {
            title: 'Total Vendor',
            number: count?.totalVendors,
            icon: ProgressIcon,
            color: '#EFFDF3'
        },
        {
            title: 'Total Sale',
            number: count?.totalTransactions,
            icon: CompleteIcon,
            color: '#F7F2FF'
        },
        {
            title: 'Total Revenue',
            number: count?.totalAmountReceived,
            icon: DonateIcon,
            color: '#FEF0EF'
        },
    ]

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const [openView, setOpenView] = useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);


    return (
        <div className='Dashboard'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='DashboardText'>
                    <Typography gutterBottom variant="h5" component="div" className='DashboardHeading'>
                        DashBoard
                    </Typography>
                    {/* <Button onClick={handleOpen} variant="outlined" className='AddProjectButton' sx={{ textTransform: 'none' }} startIcon={<AddIcon />} >Add Project</Button> */}
                </Stack>
            </Grid>
            <Grid container spacing={3} className='ProjectMangMarginTop'>
                {dashboardJson.map((data, index) => (
                    <Grid item xs={6} md={3} lg={3} key={index}>
                        <Stack className='ProjectMangText'>
                            <Stack className='ProjectMangTextImage' style={{ backgroundColor: `${data.color}` }}>
                                <img src={data.icon} alt={data.title} />
                            </Stack>
                            <Stack className='ProjectMangTextDetail'>
                                <Typography component="div" className='ProjectMangTextTitle'>
                                    {data.title}
                                </Typography>
                                <Typography component="div" className='ProjectMangTextNumber'>
                                    {data.title === 'Total Donations' ? `$ ${formatNumber(data.number)}` : formatNumber(data.number)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
            {/* <UserManagementTabel />
            <BannerManagementTabel /> */}
        </div>
    )
}

export default Dashboard
