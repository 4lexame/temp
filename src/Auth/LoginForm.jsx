import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import image1 from '../Assets/image1.png';
import openEye from '../Assets/password/eye.png';
import closeEye from '../Assets/password/invisible.png';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            console.log('User is logged in:', user);
        } else {
            console.log('No user is logged in');
            navigate('/login');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                toast.success('Login successful');
                localStorage.setItem('user', JSON.stringify(data.user));
                switch (data.role) {
                    case 0:
                        navigate('/adminhomepage');
                        break;
                    case 1:
                        navigate('/adviserhomepage');
                        break;
                    case 2:
                        navigate('/studenthomepage');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            } else {
                console.log('Login failed');
                toast.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Error during login');
        }
    }; 

    // to be remove   
    // const handleSignupRedirect = () => {
    //     navigate('/register');
    // };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

        return (
        <Container 
            fluid 
            className="m-0 vh-100"  
            style={{ background: '#ffffff', color: '#333333' }}
        >
            <Row className="h-100">  
                <Col sm={6} className="d-flex justify-content-center align-items-center">
                    <img 
                        className="img-fluid" 
                        src={image1} 
                        alt="A beautiful landscape showcasing nature" 
                        style={{ width: '650px', height: '650px' }} 
                    />
                </Col>
                <Col sm={6} className="d-flex justify-content-center align-items-center">  
                    <Card className='m-5 rounded' style={{ background: '#ffffff', width: '560px' }}>
                        <div className="p-4">
                            <div className="d-flex flex-column align-items-center" style={{ color: '#333333' }}>
                                <h2 className="loginHeader">Login</h2>
                                {/* to be remove */}
                                {/* <p>
                                    New to QueueIt?{' '}
                                    <span 
                                        onClick={handleSignupRedirect} 
                                        style={{ cursor: 'pointer', color: '#B9FF66' }}
                                    >
                                        Sign up for now
                                    </span>
                                </p> */}
                            </div>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control 
                                        type='email' 
                                        placeholder='example@email.com' 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="d-flex justify-content-between">
                                        Password
                                        <span 
                                            className="visiblePassword float-end" 
                                            onClick={togglePasswordVisibility} 
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? (
                                                <>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={closeEye} alt="Hide" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                                    <p style={{ margin: 0 }}>Hide</p>
                                                    </div>
                                                </>
                                              
                                            ) : (
                                                <>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={openEye} alt="Hide" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                                    <p style={{ margin: 0 }}>Show</p>
                                                    </div>
                                                </>
                                            )}
                                        </span>
                                    </Form.Label>
                                    <Form.Control 
                                        type={showPassword ? 'text' : 'password'} 
                                        placeholder='password' 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-center">
                                    <Button 
                                        className="m-0" 
                                        style={{ background: '#B9FF66', margin: 0, border: 'none' }} 
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}; 
