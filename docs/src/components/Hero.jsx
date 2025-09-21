import React from 'react'
import '../styles/header.css'
import { useNavigate } from 'react-router-dom'
function Hero() {
    const navigate=useNavigate();
    return (
        <>
            <div className='header-section'>
                <div className="header-cont">
                    <button onClick={()=>{navigate('/products')}}>Shop Now</button>
                    <h1>VLN PRODUCTS</h1>
                </div>
            </div>
        </>
    )
}

export default Hero;