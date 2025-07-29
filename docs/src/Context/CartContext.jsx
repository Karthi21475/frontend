import { createContext,useEffect,useState } from 'react'
import axios from 'axios';

export const CartContext=createContext();

export const CartProvider=({children})=>{
    
    const [cartItems,setarr]=useState([]);
    const [Loader,setLoader]=useState(false);
    
    const getCartItems=async()=>{
        setLoader(true)
        const res=await axios.get(`${import.meta.env.VITE_API_URL}`+'/api/cart',{withCredentials: true});
        setarr(res.data);
        console.log("fetched it brooo")
        if (res.data.message=="No token, access denied!"||res.data.message=="Invalid token!"){
            setarr([])
        }
        setLoader(false)
    }
    
    const AddcartItem=async(productDetails)=>{
        setLoader(true)
        const res=await axios.post(`${import.meta.env.VITE_API_URL}`+'/api/cart',productDetails,{headers:{'Content-Type':'application/json'},withCredentials: true});
        if (res.data.message=="No token, access denied!"||res.data.message=="Invalid token!"){
            window.location="/login"
        }
        await getCartItems();
        setLoader(false)
        
        if (res.data.message==="Item Added to Cart"){
            console.log("added it to the cart");
        }
    }
    const UpdatecartItem=async(id,quantity,productid)=>{
        setLoader(true)
        const Data={quantity,productid}
        
        const res=await axios.put(`${import.meta.env.VITE_API_URL}`+`/api/cart/${id}`,Data,{headers:{'Content-Type':'application/json'},withCredentials: true});
        if (res.data.message=="No token, access denied!"||res.data.message=="Invalid token!"){
            window.location="/login"
        }
        await getCartItems();
        setLoader(false)
        
        if (res.data.message==="Item Updated in Cart"){
            console.log("Updated item in the cart");
        }
    }
    const DeletecartItem=async(id,productid)=>{
        setLoader(true)
        const Data={productid}
        const res=await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/${id}`,Data,{withCredentials: true});
        if (res.data.message=="No token, access denied!"||res.data.message=="Invalid token!"){
            window.location="/login"
        }
        await getCartItems();
        setLoader(false)
    }

    useEffect(()=>{
        getCartItems();
    },[])

    return(
        <CartContext.Provider value={{cartItems,Loader,AddcartItem,UpdatecartItem,DeletecartItem,getCartItems}}>
            {children}
        </CartContext.Provider>
    )
}
