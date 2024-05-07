import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
          navigate('/');
        }
      },[navigate])
    const handleLogin = async()=>{
        // console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
              },
        });
        result = await result.json();
        // console.log(result);
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');
        }else{
            alert('Please Enter correct email and password');
        }
    }
  return (
    <div className='login'>
      <h1>Login page....</h1>
      <input type="text" className='inputBox' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Email' />
      <input type="password" className='inputBox' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Enter Password' />
      <button className='appButton' onClick={handleLogin} type='button'>Login</button>
    </div>
  )
}

export default Login
