import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem';
import '../styles/productspage.css'
import Nav from '../components/Nav';
function ProductsPage() {

    const [products,setProds]=useState([]);
    // const [sortfilter,setSortFilter]=useState(false);
    const [Loader,setLoader]=useState(false);
    const [arr,setArr]=useState([]);
    useEffect(()=>{
        const getproducts=async()=>{
            setLoader(true)
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/products`,{withCredentials: true});
            setArr(res.data);
            setProds(res.data);
            setLoader(false)
        }
        getproducts();
    },[]);


    const handleOnChange=(e)=>{
        const value=e.target.value;
        const result=arr.filter(item=> item.productname.toLowerCase().includes(value.toLowerCase()))
        setProds(result);
    }

    return (
        <>
            <div className="nav-container">
                <h1 className="logo">VLN</h1>
                <ul className="nav-links">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/products'>Products</Link></li>
                </ul>
                <input type="text" placeholder="Search" name="search" id="search" onChange={handleOnChange}/>
            </div>
            {Loader && <h1>Loading...</h1>}
            <div>
                <button className="btn1" onClick={()=>{
                    console.log("filtering")
                    const res=products.sort((a,b)=>a-b);
                    setProds(res)
                    console.log("filtered")
                }}>Filter</button>
            </div>
            <div className="products-container">
                {products.map(item=>
                    <ProductItem productDetails={item} key={item._id} />
                )
            }
            </div>
        </>
    )
}

export default ProductsPage