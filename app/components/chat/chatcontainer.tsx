import { useMemo, useState } from "react";
import ChatComponent from "../chatbot/ChatComponent";
import Chatbox from "./chatbox";
import { ChatHistoryType } from "../chatbot/ChatHistory";

export default function ChatContainer() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([]);

  const history = useMemo(() => {
    return <>
      {chatHistory.map((c, i) => {
        return <Chatbox key={i} user={!c.isBot} text={c.message} instruction={c.instruction} chat={c} />
      })}
    </>
  }, [chatHistory]);

  return (<div className="flex flex-col gap-4 flex-1 w-full items-center bg-[#F8F8F8] h-full p-8 mr-4 rounded-xl">
    <div className="flex-1 flex flex-col gap-4 h-full overflow-y-auto w-full items-center pb-12">{history}</div>
    <div className="flex-1 w-full fixed bottom-0 left-0 right-0 items-center bg-white"><ChatComponent chatHistory={chatHistory} setChatHistory={setChatHistory}/></div>
  </div>)
}