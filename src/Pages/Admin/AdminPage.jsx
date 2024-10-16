import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import vector from '../../Assets/Vector.png';


export default function AdminPage() { 
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log('User is logged in:', storedUser);
      setUser(storedUser);
    } else {
      console.log('No user is logged in');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="m-0 vh-100" 
      style={{ 
      background: '#ffffff', 
      color: '#333333',
      backgroundImage: `url(${vector})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
        }}>
    <AdminNavbar />
    <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '25px'}}> 
      <h1>Welcome, {user?.firstname}!</h1>
    </div>
  </div>
  )
} 
