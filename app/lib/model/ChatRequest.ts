import { ChatHistoryType } from "@/app/components/chatbot/ChatHistory"

export type ChatRequest = {
  prompt: string,
  chathistory: ChatHistoryType[]
}