import {useState} from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext();
  
  const signup=async({name,userName,password,confirmPassword})=>{
    const success=handleInputError({name,userName,password,confirmPassword});
    if(!success) return;

    setLoading(true);
    try{
      const res=await fetch("http://localhost:4200/api/auth/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,userName,password,confirmPassword})
      }  );

      const data=await res.json();
      if(data.error){throw new Error(data.error)}

      //localStorage
      localStorage.setItem("chat-user",JSON.stringify(data));
      //context
      setAuthUser(data);


    }catch(error){
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
    
  };

  return (
    {loading,signup}
  )
}

export default useSignUp;




function handleInputError({name,userName,password,confirmPassword}){
  if(!name || !userName || !password || !confirmPassword){
    toast.error("Please fill all the fields");
    return false
  }
  if(password.length < 6){
    toast.error("Password must be of 6 characters long");
    return false
  }

  if(password !== confirmPassword){
    toast.error("Passwords do not match");
    return false
  }
  return true;
}