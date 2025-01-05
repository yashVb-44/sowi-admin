import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import MainLayout from '../Common/MainLayout/MainLayout';
import Home from '../Components/Home/Home';
import Contact from '../Components/Contact/Contact';
import ProjectList from '../Components/ProjectList/ProjectList';
import ProjectDetail from '../Components/ProjectDetail/ProjectDetail';
import Payment from '../Components/Payment/Payment';
import BlogList from '../Components/Blog/BlogList/BlogList';
import BlogDetail from '../Components/Blog/BlogDetail/BlogDetail';
import About from '../Components/About/About';
import Signup from '../Components/Auth/Signup';
import SignIn from '../Components/Auth/SignIn';
import PasswordReset from '../Components/Auth/PasswordReset/PasswordReset';
import AdminLogin from '../Admin/AdminAuth/AdminLogin/AdminLogin';
import AdminForgetPass from '../Admin/AdminAuth/AdminLogin/AdminForgetPass';
import AdminResetPass from '../Admin/AdminAuth/AdminLogin/AdminResetPass';
import Fundraise from '../Components/Fundraise/Fundraise';
import FundraiseCategoryDetail from '../Components/Fundraise/FundraiseCategory/FundraiseCategoryDetail';
import AdminRoutes from './AdminRoutes';
import { useAuth } from '../Context/AuthContext';
import ScrollToTop from '../Routes/ScrollToTop'
import PrivacyPolicy from '../Common/PrivacyPolicy';
import TermsOfUse from '../Common/TermsOfUse';
import ProjectListComplete from '../Components/ProjectList/ProjectListComplete';


const AppRoutes = () => {
    const { adminToken, setAdminToken } = useAuth();

    useEffect(() => {
        setAdminToken(localStorage?.getItem('adminToken'));
    }, []);


    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path='/signup' element={<Signup />} />
                {/* <Route path='/signin' element={<SignIn />} /> */}
                <Route path='/password-reset' element={<PasswordReset />} />

                {/* <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='about-us' element={<About />} />
                    <Route path='contact-us' element={<Contact />} />
                    <Route path='categories' element={<Fundraise />} />
                    <Route path='fundraise-cat' element={<FundraiseCategoryDetail />} />
                    <Route path='project' element={<ProjectList />} />
                    <Route path='project-complete' element={<ProjectListComplete />} />
                    <Route path='project-detail' element={<ProjectDetail />} />
                    <Route path='project-detail/:id' element={<ProjectDetail />} />
                    <Route path='payment' element={<Payment />} />
                    <Route path='blog' element={<BlogList />} />
                    <Route path='blog-detail' element={<BlogDetail />} />
                    <Route path='privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='terms-of-use' element={<TermsOfUse />} />
                </Route> */}

                <Route path='/admin/*' element={adminToken ? <AdminRoutes /> : <AdminLogin />} />
                {/* <Route path='/admin/*' element={ <AdminRoutes /> } /> */}
                <Route path='/admin-forget' element={<AdminForgetPass />} />
                <Route path='/admin-reset-pass/:email' element={<AdminResetPass />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
