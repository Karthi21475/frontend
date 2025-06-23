import React, { useState } from 'react'
import '../styles/cartitem.css'
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useEffect } from 'react';
function CartItem({cartDetails}) {
    const [item,setitem]=useState([]);
    const {_id,productid,productname,price,image}=cartDetails;
    const {cartItems,DeletecartItem,UpdatecartItem}=useContext(CartContext);
    const [Loader,setLoader]=useState(false);

    const handleDec=async()=>{
        setLoader(true)
        if (item.quantity===1){
            await DeletecartItem(_id);
        }else{
            await UpdatecartItem(_id,item.quantity-1);
        }
        setLoader(false)
    }
    const handleInc=async()=>{
        setLoader(true)
        await UpdatecartItem(_id,item.quantity+1)
        setLoader(false)
    }

    useEffect(()=>{
        setitem(cartItems.find(item=>item.productid===productid));
    },[cartItems]);
    return (
        <>
            <div className='cartitem-cont'>
                <div className='cartitem-details'>
                    <img src={image} />
                    <div>
                        <h1>{productname}</h1>
                        <p>₹{price}</p>
                    </div>
                </div>
                {Loader?<h1>Loading...</h1>:
                <div className="quant-wrapper">
                    <button className="btn1" onClick={()=>handleDec()}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn1" onClick={()=>handleInc()}>+</button>
                </div>}
            </div>
        </>
    )
}

export default CartItem