import React, { useState ,useEffect,useContext} from 'react'
import '../styles/productitem.css'
import { CartContext } from '../Context/CartContext';
import {Link} from 'react-router-dom'; 
import { ClipLoader } from 'react-spinners';
function ProductItem({productDetails}) {

    const {productid,productname,price,image}=productDetails;
    const [check,setcheck]=useState(false);

    const [Loader,setLoader]=useState(false);
    const {cartItems,AddcartItem}=useContext(CartContext);

    const handleClick=async()=>{
        setLoader(true)
        await AddcartItem(productDetails);
        setLoader(false)
    }

    useEffect(()=>{
        setcheck(cartItems.find(item=>item.productid===productid));
    },[cartItems,productid]);

    return (
    <>
        <div className="proditem-cont">
            <img src={image}/>
            <div className="prod-info-wrapper">
                <h1>{productname}</h1>
                <p>₹{price}</p>
                {check?<Link className="btn1" to='/cart'>Go To Cart</Link>:<button className="btn1" onClick={()=>handleClick()}>{Loader?<ClipLoader/>:"Add"}</button>}
            </div>
        </div>
    </>
    )
}

export default ProductItem