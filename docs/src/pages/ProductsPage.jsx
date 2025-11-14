import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem';
import '../styles/productspage.css'
import { ClipLoader } from 'react-spinners';
import Nav from '../components/Nav';
import { useLocation } from 'react-router-dom';
function ProductsPage() {

    const [products,setProds]=useState([]);
    const [Loader,setLoader]=useState(false);
    const [searchTerm,setSearchTerm]=useState('');
    const location=useLocation();
    const [page,setPage]=useState(1);
    const params=new URLSearchParams(location.search);

    const getsearchres=async(value,srt,filter)=>{
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/search`,{
            params:{
                searchTerm:value,
                sortAsc:srt,
                filter:filter
            }
        })
        setProds(res.data)
    }
    const handleReset=()=>{
        setSearchTerm("")
        getsearchres("",true,false);
    }
    const handleOnChange=async(e)=>{
        const value=e.target.value
        setSearchTerm(value)
        if(value===""){
            getsearchres("",true,false);
        }
    }
    const handleOnSubmit=async(e)=>{
        e.preventDefault();
        getsearchres(searchTerm,true,false);
    }
    useEffect(()=>{
        const getproducts=async()=>{
            setLoader(true)
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/products`,{
                params:{
                    limit:params.get("limit") || 9,
                    page:page || 1
                }
                ,withCredentials: true
            });
            setProds(res.data);
            setLoader(false)
        }
        getproducts();

    },[page]);

    
    return (
        <>
            <Nav/>
            <div className='main-prod-cont'>
                <div className='search-cont'>
                    <form onSubmit={(e)=>{handleOnSubmit(e)}}>
                        <input type="text" placeholder="Search" name="search" id="search" value={searchTerm} onChange={(e)=>{handleOnChange(e)}}/>
                    </form>
                    <h3>Filter:</h3>
                    <div className='d-flex'>
                        <p>Price:</p>
                        <button onClick={()=>{
                            getsearchres(searchTerm,false,true);
                        }} className='btn1'>
                            <i className='bxr bx-arrow-down'></i>
                        </button>
                        <button onClick={()=>{
                            getsearchres(searchTerm,true,true);
                        }} className='btn1'>
                            <i className='bxr bx-arrow-up'></i>
                        </button>
                    </div>
                    <button className='btn1' onClick={()=>{handleReset()}}>Reset Filters</button>
                </div>
                {Loader && 
                <div className='loader-cont'>
                    <ClipLoader/>
                </div>
                }
                <div className="products-container">
                    {products.map(item=>
                        <ProductItem productDetails={item} key={item._id} />
                    )}
                    {
                        products.length===0 && !Loader && <h2>No Products Found</h2>
                    }
                </div>
                    <button onClick={()=>{page>1?setPage(prev=>prev-1):""}}>{"<"}</button>
                    {page}
                    <button onClick={()=>{products.length>=params.get("limit")?setPage(prev=>prev+1):console.log(products.length)}}>{">"}</button>
            </div>
        </>
    )
}

export default ProductsPage