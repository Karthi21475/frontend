import React from 'react'
import Nav from '../components/Nav.jsx';
import ProductItem from '../components/ProductItem.jsx';
import '../styles/Homepage.css'
import Hero from '../components/Hero.jsx';
import { ClipLoader } from 'react-spinners';
function Homepage() {

  return (
    <>
        <Nav/>
        <Hero/>
    </>
  )
}

export default Homepage