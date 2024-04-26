import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
  const getConversations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      console.log(res)
      const data = await res.json();
      console.log("conversations data ---> ",data);
      if (data.error) {
        throw new Error(data.error);
      }
      setConversations(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message)
    } finally {
      setLoading(false);
    }

  };
  getConversations()
  },[])
  return { loading, conversations};
};
export default useGetConversations;
