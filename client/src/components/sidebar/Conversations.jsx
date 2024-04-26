import React, { useEffect } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
const Conversations = () => {
  const { loading, conversations }= useGetConversations();

  return (
    <div className="py-2 flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={idx === conversations.length - 1}
          emoji={getRandomEmoji()}
        />
      ))}
      {loading?(<span className="loading loading-spinner mx-auto"></span>):null}
    </div>
  );
};

export default Conversations;
