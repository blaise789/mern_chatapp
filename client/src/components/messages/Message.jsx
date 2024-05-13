import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

const Message = ({ message,profilePicture}) => {
  // console.log(shouldShake)
  // console.log(message)
  const { authUser } = useAuthContext();
  const fromMe = message.senderId === authUser.id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    :profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  // console.log(message.shouldShake)
  const shakeClass = message.shouldShake? "shake" : "";
  // console.log(message.shouldShake)
console.log(shakeClass)
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="profilePic" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
