import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx';
import Header from '../components/Header.jsx';
import ProductItem from '../components/ProductItem.jsx';
import axios from 'axios';
import '../styles/Homepage.css'
function Homepage() {

  const [Loader,setLoader]=useState(false);
  const [prods,setProds]=useState([]);

  useEffect(()=>{
    const getproducts=async()=>{
            setLoader(true);
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/products`,{withCredentials: true});
            setProds(res.data);
            setLoader(false);
            
        }
        getproducts();
  },[])

  return (
    <>
        <Nav/>
        <Header/>
        <div className="slide-wrapper">
          {prods.map(item=><ProductItem productDetails={item} key={item._id} />)}
        </div>
    </>
  )
}

export default Homepage