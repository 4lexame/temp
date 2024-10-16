import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ClassroomCard from '../../Components/Card/ClassroomCard';
import AdviserNavbar from '../../Components/Navbar/AdviserNavbar';
import vector from '../../Assets/Vector.png';

export default function AdviserPage() { 
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]); 
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
 
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await fetch(`http://localhost:8080/classroom/ClassroomsByAdviser?userID=${user.userID}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched classrooms:', data);
          setClassrooms(data);  
        } else {
          console.error('Failed to fetch classrooms:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };
 
    if (user && user.userID) {
      fetchClassrooms();
    }
  }, [user]);

  return (
    <div className="m-0 vh-100" 
       style={{ 
        background: '#ffffff', 
        color: '#333333',
        backgroundImage: `url(${vector})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
         }}>
      <AdviserNavbar />
      <div className="mx-5" style={{ background: 'rgba(238, 238, 238, 0.9)', color: '#333333', height: '100vh', borderRadius: '20px', padding: '25px'}}> 
        <h2>Active Classrooms</h2> 
        {classrooms.length === 0 ? (
          <p>No active classrooms found.</p>
        ) : (
          <div style={{ display: 'flex' }}>
            {classrooms.map((classroom) => (
              <ClassroomCard 
                key={classroom.classId}
                subjectName={classroom.subjectName} 
                style={{ margin: '0px' }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
