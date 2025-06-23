import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react'
import ProductItem from '../components/ProductItem';
import '../styles/productspage.css'
import { CartContext } from '../Context/CartContext';
function ProductsPage() {

    const [products,setProds]=useState([]);
    const [loader,setLoading]=useState(false);
    const [arr,setArr]=useState([]);
    const {Loader}=useContext(CartContext);
    useEffect(()=>{
        const getproducts=async()=>{
            setLoading(true)
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/products`,{withCredentials: true});
            setArr(res.data);
            setProds(res.data);
            setLoading(false)
        }
        getproducts();
    },[]);

    const handleOnChange=(e)=>{
        const value=e.target.value;
        const result=arr.filter(item=> item.productname.toLowerCase().includes(value.toLowerCase()))
        setProds(result);
    }

    return (
        <>{(Loader||loader)?<h1>Loading...</h1>:(<><div>
                <input type="text" placeholder="Search" name="search" id="search" onChange={handleOnChange}/>
            </div>
            <div className="products-container">
                {products.map(item=>
                    <ProductItem productDetails={item} key={item._id} />
                )
            }
            </div></>)}
        </>
    )
}

export default ProductsPage