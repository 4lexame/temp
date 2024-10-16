import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import RegistrationForm from './Auth/RegistrationForm';
//admin
import AdminHomePage from './Pages/Admin/AdminPage'; 
import AdminUserPage from './Pages/Admin/AdminUserPage'; 
import AdminLogPage from './Pages/Admin/AdminLogPage'; 
//adviser
import AdviserHomePage from './Pages/Adviser/AdviserPage'; 
import AdviserQueuePage from './Pages/Adviser/AdviserQueuePage'; 
import AdviserAvailabilityPage from './Pages/Adviser/AdviserAvailabilityPage';
import AdviserLogPage from './Pages/Adviser/AdviserLogPage';
//student
import StudentHomePage from './Pages/Student/StudentPage'; 
//users
import ProfilePage from './Pages/ProfilePage';
import { UserProvider } from './Components/User/UserContext';
import { ToastContainer } from 'react-toastify';


export default function App() {
    return ( 
        <div className='App'>
            <UserProvider>
                <Router> 
                    <ToastContainer />
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        {/* admin */}
                        <Route path="/adminhomepage" element={<AdminHomePage />} />
                        <Route path="/adminuserpage" element={<AdminUserPage />} />
                        <Route path="/adminlogpage" element={<AdminLogPage />} />

                        {/* adviser */}
                        <Route path="/adviserhomepage" element={<AdviserHomePage />} />
                        <Route path="/adviserqueuepage" element={<AdviserQueuePage />} />
                        <Route path="/adviseravailabilitypage" element={<AdviserAvailabilityPage />} />
                        <Route path="/adviserlogpage" element={<AdviserLogPage />} />

                        {/* student */}
                        <Route path="/studenthomepage" element={<StudentHomePage />} />

                        {/* user */}
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={<LoginForm />} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </Router>
            </UserProvider>
        </div>
        
    );
} 
