import React, { useState } from 'react';

const Login = () => {
  
  const baseURL = 'https://eshopeebackend.onrender.com';

  // const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    let responseData;
    // console.log('Login', formData);

    try {
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/addproduct')
      } else {
        alert(responseData.errors);
      }
      
    } catch (error) {
      console.error('Login error:', error);
    }
    
  }

  return (
    <div className='container'>
      <div className='loginSignup'>
        <div className="loginSingup-container">
          <h1>Login</h1>
          <div className="loginSignup-fields">
            <input
              value={formData.email}
              onChange={changeHandler}
              name="email"
              type="email"
              placeholder="Email ID"
            />
            <input
              value={formData.password}
              onChange={changeHandler}
              name="password"
              type="password"
              placeholder="Password"
            />
            <button onClick={handleLogin}>Log In</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
