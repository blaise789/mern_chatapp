import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation"
import notification from "../assets/sounds/notification.mp3"

const useListenMessage = () => {
    const {socket}=useSocketContext()
    const {messages,setMessages}=useConversation()
    useEffect(()=>{
        console.log(messages)
        console.log(notification)
        socket?.on("newMessage",(newMessage)=>{
            newMessage.shouldShake=true
            console.log(newMessage)
            const sound=new Audio(notification)
            console.log(sound)
            sound.play()
            console.log(newMessage)
            setMessages([...messages,newMessage])
        })
        return ()=>socket?.off("newMessage")
    },[socket,messages,setMessages])
}


export default useListenMessage