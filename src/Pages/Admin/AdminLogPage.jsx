import React from 'react'
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import vector from '../../Assets/Vector.png';

export default function AdminLogPage() {
  return (
    <div  className="m-0 vh-100" 
        style={{ 
        background: '#ffffff', 
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
    <AdminNavbar />
        <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '25px'}}> 
        </div>
    </div>
  )
}
