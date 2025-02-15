import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../Admin/AdminLayout/AdminLayout';
import Dashboard from '../Admin/Dashboard/Dashboard';
import UserManagement from '../Admin/UserManagement/UserManagement';
import BlogManagement from '../Admin/BlogManagement/BlogManagement';
import HomeContent from '../Admin/SiteContent/HomeContent/HomeContent';
import About from '../Admin/SiteContent/About/About';
import ContactContent from '../Admin/SiteContent/ContactContent/ContactContent';
import Terms from '../Admin/SiteContent/Terms/Terms';
import Privacy from '../Admin/SiteContent/Privacy/Privacy';
import ShopServiceManagement from '../Admin/ShopServiceManagement/ShopServiceManagement';
import EmergencyServiceManagement from '../Admin/EmergencyServiceManagement/EmergencyServiceManagement';
import CategoryManagement from '../Admin/CategoryManagement/CategoryManagement';
import ExpenseCategoryManagement from '../Admin/ExpenseCategoryManagement/ExpenseCategoryManagement';
import CompanyManagement from '../Admin/CompanyManagement/CompanyManagement';
import SupportManagement from '../Admin/SupportManagement/SupportManagement';
import VendorManagement from '../Admin/VendorManagement/VendorManagement';
import BannerManagement from '../Admin/BannerManagement/BannerManagement';
import VideoLibraryManagement from '../Admin/VideoLibraryManagement/VideoLibraryManagement';
import FAQ from '../Admin/SiteContent/FAQ/FAQ';
import SubscriptionPlans from '../Admin/SubScription/Subscription';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='user' element={<UserManagement />} />
                <Route path='vendor' element={<VendorManagement />} />
                <Route path='shop-service' element={<ShopServiceManagement />} />
                <Route path='emergency-service' element={<EmergencyServiceManagement />} />
                <Route path='category' element={<CategoryManagement />} />
                <Route path='company' element={<CompanyManagement />} />
                <Route path='support' element={<SupportManagement />} />
                <Route path='banner' element={<BannerManagement />} />
                <Route path='expense-category' element={<ExpenseCategoryManagement />} />
                <Route path='video-library' element={<VideoLibraryManagement />} />
                <Route path='blog' element={<BlogManagement />} />
                <Route path='site-content' element={<HomeContent />} />
                <Route path='site-content/about' element={<About />} />
                <Route path='site-content/contact' element={<ContactContent />} />
                <Route path='site-content/terms' element={<Terms />} />
                <Route path='site-content/privacy' element={<Privacy />} />
                <Route path='site-content/faq' element={<FAQ />} />
                <Route path='subscription' element={<SubscriptionPlans />} />
                <Route path='*' />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
