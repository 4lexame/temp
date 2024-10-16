import { Container, Nav, Navbar, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useState } from 'react';  
import pu from '../../Assets/icons/profile-user.png'
import darkwo from '../../Assets/logo/dark(wo-outline).png';

export default function StudentNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfile = () => {
      console.log("Navigating to profile...");  
      navigate('/profile');
  };

  const handleLogout = () => {
      console.log("User logged out"); 
      localStorage.removeItem('user');
      document.cookie = 'token=; Max-Age=0; path=/; domain=' + window.location.hostname; 
      window.history.replaceState(null, null, '/login'); 
      window.location.href = '/login'; 
  };

  const handleMouseEnter = () => {
      setShowDropdown(true);
  };

  const handleMouseLeave = () => {
      setShowDropdown(false);
  };
  return (
    <div>
        <Navbar expand="lg" className="m-4" style={{ background: 'transparent' }}>
            <Container className="d-flex justify-content-between align-items-center">
                <Navbar.Brand href="home">
                    <img src={darkwo} alt="System Logo" style={{ width: '125px', height: '40px' }} />
                </Navbar.Brand>
                {/* Profile */}
                <Nav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="profile-tooltip">User Profile</Tooltip>}>
                        <Dropdown show={showDropdown}>
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-profile">
                                <img
                                    src={pu}
                                    alt="User Profile"
                                    style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                                />
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end">
                                <Dropdown.Item onClick={handleProfile}>View Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </OverlayTrigger>
                </Nav>
            </Container>
        </Navbar>
    </div>
  )
}
