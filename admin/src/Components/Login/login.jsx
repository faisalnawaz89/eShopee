import React from 'react'

const Login = () => {
  return (
    <div className='login-page'>
        <div className="container">
            <div className="form container">
                <h3>Login</h3>
                <div className="form-input">
                    <input type="text" name="email" placeholder='Email:' />
                </div>
                <div className="form-input">
                    <input type="password" name="password" placeholder='Password:' />
                </div>
                <button className='login'>LOGIN</button>
            </div>
        </div>
    </div>
  )
}

export default Login