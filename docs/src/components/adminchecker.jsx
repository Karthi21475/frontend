import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Adminchecker({children}) {

    const [isadmin,setisadmin]=useState(false);

    useEffect(()=>{

        const checker=async()=>{
            const ress= await axios.get(`${import.meta.env.VITE_API_URL}`+'/api/user/admincheck',{withCredentials: true});
            
            if (ress.data.message==="Is Admin"){
                setisadmin(true);
            }else{
                setisadmin(false);
            }
        }
    
        checker();
    },[]);

    return isadmin?children:<h1>Sorry you need to be admin to access this page.</h1>;
}

export default Adminchecker