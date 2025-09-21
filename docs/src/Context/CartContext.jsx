import { createContext,useEffect,useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const CartContext=createContext();

export const CartProvider=({children})=>{

    const navigate=useNavigate();

    
    const [cartItems,setarr]=useState([]);
    const [Loader,setLoader]=useState(false);
    
    const getCartItems=async()=>{
        setLoader(true)
        const res=await axios.get(`${import.meta.env.VITE_API_URL}`+'/api/cart',{withCredentials: true});
        if (res.data.message!=="No token, access denied!"&&res.data.message!=="Invalid token!"){
            setarr(res.data.item.items);
        }
        setLoader(false)
    }
    
    const AddcartItem=async(productDetails)=>{
        setLoader(true)
        const res=await axios.post(`${import.meta.env.VITE_API_URL}`+'/api/cart',productDetails,{headers:{'Content-Type':'application/json'},withCredentials: true});
        if (res.data.message=="No token, access denied!"||res.data.message=="Invalid token!"){
            toast.error("Login before adding a product to cart")
            navigate("/login");
        }
        if (res.data.message==="Item Added to Cart"){
            toast.success("Added Item To Cart")
        }
        await getCartItems();
        setLoader(false)
    }
    const UpdatecartItem=async(id,quantity)=>{
        setLoader(true)
        const Data={quantity}
        
        const res=await axios.put(`${import.meta.env.VITE_API_URL}`+`/api/cart/${id}`,Data,{headers:{'Content-Type':'application/json'},withCredentials: true});
        if (res.data.message=="No token, access denied!"||res.data.message=="Invalid token!"){
            toast.warn("session expired, please login again!!")
            navigate("/login");
        }
        await getCartItems();
        setLoader(false)
        
    }
    const DeletecartItem=async(id)=>{
        setLoader(true)
        const res=await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/${id}`,{withCredentials: true});
        if (res.data.message=="No token, access denied!"||res.data.message=="Invalid token!"){
            toast.warn("session expired, please login again!!")
            navigate("/login");
        }
        if(res.data.message=="Deleted it broo"){
            toast.success("Removed Item From The Cart");
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
