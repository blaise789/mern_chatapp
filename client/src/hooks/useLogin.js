import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

   
    const useLogin=()=>{
        const [loading, setLoading] = useState(false);
        const { setAuthUser } = useAuthContext();
        const navigate=useNavigate("/")
        const login=async(username,password)=>{
            try{
                const success = handleInputErrors(username, password);
	        	if (!success) return;
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });
                const data = await res.json();
                console.log(data);
               console.log(data.error)
			if (data.error) {
				throw new Error(data.error);
			}
            toast.success("logged in successfully")
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
            navigate("/")
            }
            catch(error){
                toast.error(error.message)
                console.log(error)

            }
            finally{
                setLoading(false)
            }

        }
        return {loading,login}

    }
    export  default useLogin
    function handleInputErrors(username, password){
        if (!username || !password) {
            toast.error("Please fill in all fields");
            return false;
        }
        return true
    }
