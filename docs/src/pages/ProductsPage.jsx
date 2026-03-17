import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem';
import '../styles/productspage.css'
import Nav from '../components/Nav';
function ProductsPage({props}) {
    // const navigate=useNavigate();
    const {Loader,setLoader}=props;
    const [products,setProds]=useState([]);
    const [searchTerm,setSearchTerm]=useState("");
    const [srt,setSrt]=useState(false);
    const [asc,setAsc]=useState(false);
    const params=new URLSearchParams(location.search);
    const [page,setPage]=useState(Number(params.get("page")));
    const [prodCnt,setProdCnt]=useState(10);

    const getsearchres=async(value,srt,Asc)=>{
        setLoader(true)
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/search`,{
            params:{
                searchTerm:value,
                srt:srt,
                Asc:Asc,
                limit:params.get("limit") || 9,
                page:page || 1
            }
        })
        setProds(res.data.Prods)
        setProdCnt(res.data.cnt)
        setLoader(false)
    }
    const handleReset=()=>{
        setSearchTerm("")
        getsearchres("",false,false);
    }
    const handleOnChange=async(e)=>{
        const value=e.target.value
        setSearchTerm(value)
    }
    const handleOnSubmit=async(e)=>{
        e.preventDefault();
        setPage(1);
        getsearchres(searchTerm,srt,asc);
    }
    useEffect(()=>{
        getsearchres(searchTerm,srt,asc);
    },[page,srt,asc]);

    
    return (
        <>
            <Nav/>
            <div className='max-w-screen flex max-[969px]:flex-col max-[969px]:items-center'>
                <div className='search-cont'>
                    <div className='flex flex-col gap-4'>
                        <h3>Filter:</h3>
                        <form onSubmit={(e)=>{handleOnSubmit(e)}}>
                            <input type="text" placeholder="Search" name="search" id="search" value={searchTerm} onChange={(e)=>{handleOnChange(e)}}/>
                        </form>
                        <div className='flex gap-2 items-center'>
                            <p>Price:</p>
                            <button onClick={()=>{
                                if(srt){
                                    if(!asc){
                                        setSrt(false)
                                    }else{
                                        setAsc(false)
                                    }
                                }else{
                                    setAsc(false)
                                    setSrt(true)
                                }
                                setPage(1);
                            }} className='btn1'>
                                <box-icon name='down-arrow-alt'></box-icon>
                            </button>
                            <button onClick={()=>{
                                if(srt){
                                    if(asc){
                                        setSrt(false)
                                    }else{
                                        setAsc(true)
                                    }
                                }else{
                                    setAsc(true)
                                    setSrt(true)
                                }
                                setPage(1);
                            }} className='btn1'>
                                <box-icon name='up-arrow-alt'></box-icon>
                            </button>
                        </div>
                    </div>
                    <button className='btn1' onClick={()=>{handleReset()}}>Reset Filters</button>
                </div>
                <div className='w-[80%] max-[1200px]:w-[70%] max-[969px]:w-full flex flex-col items-center mb-20'>
                    <div className="products-container mb-4 sm:justify-between">
                        {products.map(item=>
                            <ProductItem productDetails={item} key={item._id} />
                        )}
                        {
                            products.length===0 && !Loader && <h2>No Products Found</h2>
                        }
                    </div>
                    {!Loader&&
                        <div className='flex items-center bg-[#1A2636] rounded-[10px]'>
                            <button className="rounded-[10px] cursor-pointer px-4 py-2 flex items-center bg-[#1A2636]" onClick={()=>{(page>1)?setPage(prev=>prev-1):""}} ><box-icon name='chevron-left' className={`${page==1?"fill-gray-700":"fill-[white]"}`}></box-icon></button>
                            <span className='px-4'>{page}</span>
                            <button className="rounded-[10px] cursor-pointer px-4 py-2 flex items-center bg-[#1A2636]" onClick={()=>{(page<Math.ceil(prodCnt/Number(params.get("limit"))))?setPage(prev=>prev+1):""}}><box-icon name='chevron-right' className={`${page==Math.ceil(prodCnt/Number(params.get("limit")))?"fill-gray-700":"fill-[white]"}`}></box-icon></button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductsPage