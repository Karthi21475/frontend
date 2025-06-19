import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Adminchecker({children}) {

    const [isadmin,setisadmin]=useState(false);

    useEffect(()=>{

        const checker=async()=>{
            const ress= await axios.post(`${import.meta.env.REACT_APP_API_URL}`+'/api/user/admincheck');
            
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