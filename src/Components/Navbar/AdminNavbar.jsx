import { Container, Nav, Navbar, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useState } from 'react';  
import { toast } from 'react-toastify';
import pu from '../../Assets/icons/profile-user.png' 
import darkwo from '../../Assets/logo/dark(wo-outline).png';

export default function AdminNavbar() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleProfile = () => {
        console.log("Navigating to profile...");  
        navigate('/profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/login'); 
    };
 
    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div>
            <Navbar expand="lg" className="mt-0" style={{ background: 'transparent' }}>
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="adminhomepage">
                        <img src={darkwo} alt="System Logo" style={{ width: '125px', height: '40px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <div className="m-4" style={{background: 'rgba(198, 198, 198, 0.5)', border: '.1em solid #666666', borderRadius: '10px', padding: '10px' }}>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="justify-content-center">
                                <Nav.Link className="me-3 nav-link-custom" href="adminhomepage" style={{ color: '#666666' }}>Classrooms</Nav.Link>
                                <Nav.Link className="me-3 nav-link-custom" href="adminuserpage" style={{ color: '#666666' }}>Users</Nav.Link>
                                <Nav.Link className="me-3 nav-link-custom" href="adminlogpage" style={{ color: '#666666' }}>Logs</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
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
    );
}