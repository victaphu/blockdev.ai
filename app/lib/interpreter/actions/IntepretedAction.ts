import { ChatHistoryType } from "@/app/components/chatbot/ChatHistory";
import { ReactElement } from "react";

export default interface InterpretedAction {
  render(request: ChatHistoryType): ReactElement,
}