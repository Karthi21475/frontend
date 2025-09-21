import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Signin() {
  const [show,setshow]=useState(false);
  const navigate=useNavigate();
  return (
    <>
      <div className="form-container">
      <form onSubmit={
        async(e)=>{
        e.preventDefault();
        const username = e.target.username.value;
        const password =e.target.password.value;
        const confirm_password =e.target.confirm_password.value;
        const email =e.target.email.value;
        if (password!==confirm_password){
          return toast.error("Password Does Not Match");
        }
        if (password.length>15 || password.length<6){
          return toast.warn("password must consist of 6 to 15 characters only");
        }
        const formData = {username,password,email};
        const res=await axios.post(`${import.meta.env.VITE_API_URL}`+'/api/user/signup',formData,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials: true
        });
        if(res.data.message==="User Created"){
          navigate('/login');
        }else{
          toast.error(res.data.message);
        }
      }}>
        <h1>Sign Up</h1>
        <div className="input-cont">
                  <input type="text" id="username" name="username" placeholder=" " required/>
                  <label htmlFor="username" >Username</label>
                </div>
        <div className="input-cont">
                  <input type="text" id="email" name="email" placeholder=" " required/>
                  <label htmlFor="email" >Email</label>
                </div>
        <div className="input-cont">
                  <input type={show ? "text":"password"} name="password" id="password" placeholder=" " required/>
                  <label htmlFor='password'>Password</label>
                  <p onClick={()=>{setshow(!show)}} htmlFor='password' >{!show?'Show':"Hide"}</p>
                </div>
        <div className="input-cont">
                  <input type={show ? "text":"password"} name="confirm_password" id="confirm_password" placeholder=" " required/>
                  <label htmlFor='confirm_password'>Password</label>
                </div>
        <button type='submit' className="btn1">Sign Up</button>
      </form>
        </div>
    </>
  )
}

export default Signin