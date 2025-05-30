import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import AdminRegister from '../src/pages/AdminRegister';
import AdminLogin from '../src/pages/AdminLogin';
import AdminDashboard from '../src/pages/AdminDashboard';
import  About from '../src/pages/About';
import  Contact from '../src/pages/Contact';
import  Contacts from '../src/pages/Contacts';
import  Feedback from '../src/pages/Feedback';
import  Reviews from '../src/pages/Reviews';
import  Blog from '../src/pages/Blog';
import  Faqs from '../src/pages/Faqs';
import  UserHistory from '../src/pages/UserHistory';
import  UserHistoryPage from '../src/pages/UserHistoryPage';
import  CategorySelection from '../src/pages/CategorySelection';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import axios from 'axios';
import '../src/styles/App.css';

axios.defaults.baseURL = 'https://anomaly-detection-qgwh.onrender.com';
axios.defaults.withCredentials = true;

import { AdminContextProvider } from '../context/adminContext';

function App() {
  return (
    <UserContextProvider>
      <AdminContextProvider>
        <div className="App">
          <Navbar />
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adminregister" element={<AdminRegister />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faqs" element={<Faqs />} />
             <Route path="/history" element={<UserHistory />} />
             <Route path="/admin/user/:userId/history" element={<UserHistoryPage />} />
             <Route path="/select-category" element={<CategorySelection />} />
          </Routes>
        </div>
      </AdminContextProvider>
    </UserContextProvider>
  );
}


export default App;