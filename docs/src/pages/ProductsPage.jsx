import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem';
import '../styles/productspage.css'
function ProductsPage() {

    const [products,setProds]=useState([]);
    const [sortfilter,setSortFilter]=useState(false);
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
            <div className="nav-cont flex-col">
                <div className="d-flex">
                    <h1 className="logo">VLN</h1>
                    <ul className="nav-links">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/products'>Products</Link></li>
                    </ul>
                </div>
                <input type="text" placeholder="Search" name="search" id="search" onChange={handleOnChange}/>
            </div>
            <div>
                {sortfilter?
                    <button className="btn1" onClick={()=>{
                        arr.sort((a,b)=>a.price-b.price)
                        const res=products.sort((a,b)=>a.price-b.price)
                        setProds([...res])
                        setSortFilter(!sortfilter)
                    }}>Filter low to high</button>:
                    <button className="btn1" onClick={()=>{
                        arr.sort((a,b)=>b.price-a.price)
                        const res=products.sort((a,b)=>b.price-a.price)
                        setProds([...res])
                        setSortFilter(!sortfilter)
                    }}>Filter high to low</button>
                }
            </div>
            {Loader && <h1>Loading...</h1>}
            <div className="products-container">
                {products.map(item=>
                    <ProductItem productDetails={item} key={item._id} />
                )}
            </div>
        </>
    )
}

export default ProductsPage