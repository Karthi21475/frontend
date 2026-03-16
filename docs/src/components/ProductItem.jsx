import React, { useState ,useEffect,useContext} from 'react'
import '../styles/productitem.css'
import { CartContext } from '../Context/CartContext';
import {Link} from 'react-router-dom'; 
import { ClipLoader } from 'react-spinners';
function ProductItem({productDetails}) {

    const {_id,productname,price,image}=productDetails;
    const [check,setCheck]=useState(false);
    const [item,setItem]=useState([]);

    // const [Loader,setLoader]=useState(false);
    const {Loader,cartItems,AddcartItem,UpdatecartItem,DeletecartItem}=useContext(CartContext);

    const handleClick=async()=>{
        await AddcartItem(productDetails);
    }
    const handleDec=async()=>{
        if (item.quantity===1){
            await DeletecartItem(_id);
        }else{
            await UpdatecartItem(_id,item.quantity-1);
        }
    }
    const handleInc=async()=>{
        await UpdatecartItem(_id,item.quantity+1)
    }

    useEffect(()=>{
        setCheck(cartItems.find(item=>item._id===_id));
        setItem(cartItems.find(item=>item._id===_id));
    },[cartItems,_id]);

    return (
    <>
        <div className="proditem-cont">
            <img src={image}/>
            <div className="prod-info-wrapper">
                <h1>{productname}</h1>
                <p>₹{price}</p>
                {check?
                <div className='flex items-center ms-auto bg-[#1a1a1a] text-white rounded-[10px]'>
                    <button className="btn1 flex items-center" onClick={()=>handleDec()}>-</button>
                        <span>{item.quantity}</span>
                    <button className="btn1 flex items-center" onClick={()=>handleInc()}>+</button>
                </div>:
                <button className="btn1" onClick={()=>handleClick()}>{Loader?<div className='clip'><ClipLoader/></div>:"Add"}</button>}
            </div>
        </div>
    </>
    )
}

export default ProductItem