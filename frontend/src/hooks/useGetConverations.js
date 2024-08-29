import { toast } from 'react-hot-toast';
import React, { useEffect, useState } from 'react'

const useGetConverations = () => {
    const [loading,setLoading]=useState(false);
    const [conversations,setConversations]=useState([]);

    useEffect(()=>{
        const getConversations=async()=>{
            setLoading(true);
            try{
                const res=await fetch("http://localhost:4200/api/user",{
                    method: "GET",
                    credentials: "include" // include cookies in the request
                });
                const data=await res.json();

                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);

            }catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false)
            }
        };

        getConversations();
    },[])


  return (
    {loading,conversations}
    )
}

export default useGetConverations