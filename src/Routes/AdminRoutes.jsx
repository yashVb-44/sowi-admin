import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../Admin/AdminLayout/AdminLayout';
import Dashboard from '../Admin/Dashboard/Dashboard';
import UserManagement from '../Admin/UserManagement/UserManagement';
import CategoryManagement from '../Admin/CategoryManagement/CategoryManagement';
import BlogManagement from '../Admin/BlogManagement/BlogManagement';
import HomeContent from '../Admin/SiteContent/HomeContent/HomeContent';
import AboutContent from '../Admin/SiteContent/AboutContent/AboutContent';
import ContactContent from '../Admin/SiteContent/ContactContent/ContactContent';
import Terms from '../Admin/SiteContent/Terms/Terms';
import Privacy from '../Admin/SiteContent/Privacy/Privacy';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='user' element={<UserManagement />} />
                {/* <Route path='category' element={<CategoryManagement />} /> */}
                <Route path='blog' element={<BlogManagement />} />
                <Route path='site-content' element={<HomeContent />} />
                <Route path='site-content/about' element={<AboutContent />} />
                <Route path='site-content/contact' element={<ContactContent />} />
                <Route path='site-content/terms' element={<Terms />} />
                <Route path='site-content/privacy' element={<Privacy />} />
                <Route path='*' />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
