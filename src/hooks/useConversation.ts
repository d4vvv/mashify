import { useState } from 'react'

interface IMessage {
  text?: string
  isUser: boolean
  isLoading: boolean
  type?: string
}

export const useConversation = () => {
  const [conversation, setConversation] = useState<IMessage[]>([
    { text: 'Cześć! Jak mogę ci pomóc?', isUser: false, isLoading: false }
  ])

  const addUserMessage = (text: string) => {
    setConversation((prev) => [...prev, { text, isUser: true, isLoading: false }])
  }

  const addAssistantMessage = () => {
    setConversation((prev) => [...prev, { isUser: false, isLoading: true }])
  }

  const updateAssistantMessage = ({ type, content }: { type: string; content: string }) => {
    setConversation((prev) => {
      const lastMessage = prev[prev.length - 1]
      return [
        ...prev.slice(0, prev.length - 1),
        { ...lastMessage, text: content, isLoading: false, type }
      ]
    })
  }

  return { conversation, addUserMessage, addAssistantMessage, updateAssistantMessage }
}
