import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();
    
    const login=async(userName,password)=>{   
    const success=handleInputError({userName,password});
        if(!success)  return;   
        try{
            const res=await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({userName,password})
            });

            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            // console.log(data);
            localStorage.setItem("chat-user", JSON.stringify(data));
			      setAuthUser(data);

        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }


  return (
    {loading,login}
  )

}

export default useLogin;



function handleInputError({userName,password}){
    if(!userName || !password){
      toast.error("Please fill all the fields");
      return false
    }
    if(password.length < 6){
      toast.error("Password must be of 6 characters long");
      return false
    }
    return true;
  }