import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/Nav.css';
import { useNavigate } from 'react-router-dom';
function Nav() {
    const [token,setToken]=useState(false);
    const [admin,setAdmin]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        const authchecker=async()=>{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}`+'/api/user/auth',{headers:{'Content-Type':'application/json'},withCredentials: true})
            
            
            if(res.data.message==="User Authenticated"){
                setToken(true);
            }
            if(res.data.isAdmin){
                setAdmin(true);
            }
        }
        authchecker();
    },[token]);
    const handleClick=async()=>{
        const res=await axios.post(`${import.meta.env.VITE_API_URL}`+'/api/user/logout',{},{withCredentials: true});
        if (res.data.message==="User Logged Out"){
            setToken(false);
            navigate('/login');
        }
    }

    return (
    <>
        <nav className="nav-container">
            <h1 className="logo">VLN</h1>
            <ul className="nav-links">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/products/?limit=9&page=1'>Products</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
                {admin && <li><Link to='/add-product'>Add Product</Link></li>}
            </ul>
            {token?
            <button className="btn1" onClick={()=>handleClick()}>Logout</button>
            :
            <Link to='/login' className="btn1">Login</Link>
            }
        </nav>
    </>
    )
}

export default Nav