import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [username, setUsername] = useState('Guest'); // Default to 'Guest'
    const [dropdown, setDropdown] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('https://eshopeebackend.onrender.com/getUserName', {
                method: 'GET',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setUsername(data.user.name);  // Set the correct username
                    localStorage.setItem('Username', data.user.name);
                } else {
                    setUsername('Guest');  // If the token is invalid, set back to Guest
                }
            })
            .catch((error) => {
                console.error('Error fetching username:', error);
                setUsername('Guest');  // Handle error case and reset to Guest
            });
        } else {
            setUsername('Guest');  // No token found, set to Guest
        }
    }, []);  // Run this effect only once when the component mounts

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('Username');
        setUsername('Guest');  // Reset to Guest after logout
        navigate('/Login');
        window.location.reload();  // Refresh the page to go back to the login page
    };

    return (
        <div className='nav-bar'>
            <div className="container">
                <div className="nav-grid">
                    <div className="adminPanelLogo">
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className="userIcon">
                        {username === 'Guest' ? (
                            <h3>{username}</h3>
                        ) : (
                            <>
                            <div className="userWrapper">
                            <di className="userInfo" onClick={()=>setDropdown(!dropdown)}>
                                <span className='arrow'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </span>
                                <h3>{username}</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </di>
                            <div className={`logoutBtn ${dropdown?'open':''}`} onClick={handleLogout}>Logout</div>
                            </div> 
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
