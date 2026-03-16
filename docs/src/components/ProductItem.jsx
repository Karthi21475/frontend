import React, { useState ,useEffect,useContext} from 'react'
import '../styles/productitem.css'
import { CartContext } from '../Context/CartContext';
import {Link} from 'react-router-dom'; 
import { ClipLoader } from 'react-spinners';
function ProductItem({productDetails}) {

    const {_id,productname,price,image}=productDetails;
    const [check,setCheck]=useState(false);
    const [item,setItem]=useState([]);

    const [Loader,setLoader]=useState(false);
    const {cartItems,AddcartItem,UpdatecartItem,DeletecartItem}=useContext(CartContext);

    const handleClick=async()=>{
        setLoader(true)
        await AddcartItem(productDetails);
        setLoader(false)
    }
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
                <div className='flex items-center justify-around bg-[#1a1a1a] text-white rounded-[10px] min-w-full'>
                {Loader?
                    <div className="loader">
                        <ClipLoader/>
                    </div>:
                    check?
                        <>
                            <button className="btn1 flex items-center w-full" onClick={()=>handleDec()}>-</button>
                            <span className='w-full flex justify-center'>{item.quantity}</span>
                            <button className="btn1 flex items-center w-full" onClick={()=>handleInc()}>+</button>
                        </>
                        :
                        <button className="btn1 w-full" onClick={()=>handleClick()}>Add</button>
                }
                </div>
            </div>
        </div>
    </>
    )
}

export default ProductItem