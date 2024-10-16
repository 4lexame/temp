import React from 'react'
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import vector from '../../Assets/Vector.png';

export default function AdviserQueuePage() {
  return (
    <div  
    className="m-0 vh-100" 
    style={{ 
    background: '#ffffff', 
    color: '#333333',
    backgroundImage: `url(${vector})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
      }}>
    <AdviserNavbar />
    <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '25px'}}> 
    </div>
    </div>
  )
}
