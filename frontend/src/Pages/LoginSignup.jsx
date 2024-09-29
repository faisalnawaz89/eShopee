import React, { useState } from 'react'

const LoginSignup = () => {

    const [state, setSate] = useState('Login')
    const [formData, setFormdata] = useState({
        username:'',
        email:'',
        password:''
    })
    const changeHandler = (e) =>{
        setFormdata({...formData,[e.target.name]:e.target.value})
    }

    const SignUp = async () =>{
        console.log('signup', formData)
        let responseData;
        await fetch('http://localhost:5000/signup',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then((response)=> response.json())
          .then((data)=> responseData = data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token)
            window.location.replace("/")
        }else{
            alert(responseData.errors)
        }
    }

    const Login = async () =>{
        let responseData
        console.log('Login', formData)
        await fetch('http://localhost:5000/login',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        }).then((response)=> response.json())
          .then((data)=> responseData = data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token)
            window.location.replace("/")
        }else{
            alert(responseData.errors)
        }
    }

  return (
    <div className='container'>
        <div className='loginSignup'>
            <div className="loginSingup-container">
                <h1>{state}</h1>
                <div className="loginSignup-fields">
                    {state === 'Sign Up'?<input value={formData.username} onChange={changeHandler} name="username" type="text" placeholder='Name:'/>:""}
                    <input value={formData.email} onChange={changeHandler} name="email" type="email" placeholder='Email ID'/>
                    <input value={formData.password} onChange={changeHandler} name="password" type="password" placeholder='Password' />
                    <button onClick={()=>{state === 'Login'?Login():SignUp()}}>Continue</button>
                    {state === 'Login'?<p className="loginSignup-login">Create an account? <span onClick={()=>setSate('Sign Up')}>Sign Up here!</span></p>:<p className="loginSignup-login">Already have an account? <span onClick={()=>setSate('Login')}>Login here!</span></p>}
                    <div className="loginSignup-agree">
                        <input type="checkbox" htmlFor="checkTerm" name="" id="" />
                        <label htmlFor='checkTerm'>By continuing, i agree to the terms of use & privacy policy.</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginSignup
