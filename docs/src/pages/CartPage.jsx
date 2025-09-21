import React,{useContext} from 'react'
import { CartContext } from '../Context/CartContext'
import CartItem from '../components/CartItem';
import '../styles/cartpage.css'
import Nav from '../components/Nav';
import {ClipLoader} from 'react-spinners';
function CartPage() {

    const {cartItems,Loader}=useContext(CartContext);

    return (
        <>
            <Nav/>
            {Loader ?
                <div className='loader-cont'>
                    <ClipLoader/>
                </div>
                    :
                    <>
            <div className="cart-item-wrapper">
                <h2>Order Details</h2>
                {cartItems.map(item=><CartItem cartDetails={item} key={item.productid}/>)}
            </div>
                    </>
            }
            <div className="checkout-section">
                <div>
                    <h2>Total:₹{cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}</h2>
                    <button className="btn1">Checkout</button>
                </div>
            </div>
        </>
    )
}

export default CartPage