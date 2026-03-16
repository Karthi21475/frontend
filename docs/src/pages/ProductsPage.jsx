import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem';
import '../styles/productspage.css'
import Nav from '../components/Nav';
function ProductsPage({props}) {
    // const navigate=useNavigate();
    const [products,setProds]=useState([]);
    const [searchTerm,setSearchTerm]=useState('');
    const params=new URLSearchParams(location.search);
    const [page,setPage]=useState(Number(params.get("page")));
    const [prodCnt,setProdCnt]=useState(10);

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
            props.setLoader(true)
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/products`,{
                params:{
                    limit:params.get("limit") || 9,
                    page:page || 1
                }
                ,withCredentials: true
            });
            setProds(res.data.Prods);
            setProdCnt(res.data.cnt);
            props.setLoader(false)
        }
        getproducts();

    },[page]);

    
    return (
        <div className="">
            <Nav/>
            <div className='max-w-screen flex'>
                <div className='search-cont'>
                    <h3>Filter:</h3>
                    <form onSubmit={(e)=>{handleOnSubmit(e)}}>
                        <input type="text" placeholder="Search" name="search" id="search" value={searchTerm} onChange={(e)=>{handleOnChange(e)}}/>
                    </form>
                    <div className='flex gap-2 items-center'>
                        <p>Price:</p>
                        <button onClick={()=>{
                            getsearchres(searchTerm,false,true);
                        }} className='btn1'>
                            <box-icon name='down-arrow-alt'></box-icon>
                        </button>
                        <button onClick={()=>{
                            getsearchres(searchTerm,true,true);
                        }} className='btn1'>
                            <box-icon name='up-arrow-alt'></box-icon>
                        </button>
                    </div>
                    <button className='btn1' onClick={()=>{handleReset()}}>Reset Filters</button>
                </div>
                <div className='w-[80%] flex flex-col items-center'>
                    <div className="products-container">
                        {products.map(item=>
                            <ProductItem productDetails={item} key={item._id} />
                        )}
                        {
                            products.length===0 && !props.Loader && <h2>No Products Found</h2>
                        }
                    </div>
                    <div className='flex items-center'>
                        <button className='btn1'  onClick={()=>{(page>1)?setPage(prev=>prev-1):""}} disabled={page==1?true:false}><box-icon name='chevron-left'></box-icon></button>
                        {page}
                        <button className='btn1'  onClick={()=>{(page<Math.ceil(prodCnt/Number(params.get("limit"))))?setPage(prev=>prev+1):""}} disabled={page==Math.ceil(prodCnt/Number(params.get("limit")))?true:false}><box-icon name='chevron-right'></box-icon></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage