import React,{useContext} from 'react'
import { CartContext } from '../Context/CartContext'
import CartItem from '../components/CartItem';
import '../styles/cartpage.css'
import Nav from '../components/Nav';
function CartPage() {

    const {cartItems,Loader}=useContext(CartContext);

    return (
        <>
            <Nav/>
            {Loader && <h1>Loading..</h1>}
            <div className="cart-item-wrapper">
                {cartItems.map(item=><CartItem cartDetails={item} key={item.productid}/>)}
            </div>
            <div className="checkout-section">
                <h1>Total:{cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}</h1>
                <button className="btn1">Checkout</button>
            </div>
        </>
    )
}

export default CartPage