import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    
    if (token) {
      // Fetch user email using the token
      fetch('https://eshopeebackend.onrender.com/getUserEmail', { // Replace with your actual endpoint
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token // Include the token in headers
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setUserEmail(data.user.email); // Assuming your response structure
        } else {
          console.error(data.errors);
        }
      })
      .catch((error) => {
        console.error('Error fetching user email:', error);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setUserEmail(null); // Clear the user email state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='nav-bar'>
      <div className="container">
        <div className="nav-grid">
          <div className="adminPanelLogo">
            <h1>Admin Dashboard</h1>
          </div>
          <div className="userIcon">
            {userEmail ? (
              <>
                <h3>{userEmail}</h3>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <h3>Guest</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
