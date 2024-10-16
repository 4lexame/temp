import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './auth.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image1 from '../Assets/image1.png';

export default function RegistrationForm () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);  

        const userData = {
            username: email,
            password: password,
            firstname: firstName,
            lastname: lastName,
            photoURL: ''
        };

        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log('Registration successful');
                toast.success('Registration successful!'); 
                navigate('/login');
            } else {
                console.log('Registration failed');
                toast.error('Registration failed. Please try again.');  
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('An error occurred. Please try again later.'); 
        } finally {
            setLoading(false); 
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">

            <div className='left'>
                <img className="image1" src={image1} alt="A beautiful landscape showcasing nature" />
            </div>

            <div className='right'>
                <div className="registration-form">
                    <h2 className="registrationHeader">Sign up now</h2>
                    <form onSubmit={handleRegister}>
                        <div className="align-name">
                            <div>
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password 
                                <span className="visiblePassword" onClick={togglePasswordVisibility}>
                                    {showPassword ? '🙈Hide' : '👁️Show'}
                                </span>
                            </label>
                            <div className="password-field">
                                <input
                                    type={showPassword ? 'text' : 'password'}  
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <div className="align">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">I agree to the terms and conditions</label>
                        </div>
                        <br />
                        <div className="submit">
                            <button type="submit" disabled={loading}> 
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                            <p>
                                Already have an account?{' '}
                                <span onClick={handleLoginRedirect}>Login</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    
        
    );
}; 
