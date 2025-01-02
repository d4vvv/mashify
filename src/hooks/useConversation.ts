import { IMessage } from '@/types/message'
import { useConversationStore } from '@renderer/store/useConversationStore'
import { useState } from 'react'

export const useConversation = () => {
  const {
    conversation: initialConversation,
    addUserMessage: addUserMessageToStore,
    addAssistantMessage: addAssistantMessageToStore
  } = useConversationStore()
  const [conversation, setConversation] = useState<IMessage[]>(initialConversation)

  const addUserMessage = (text: string) => {
    addUserMessageToStore(text)
    setConversation((prev) => [...prev, { text, isUser: true, isLoading: false }])
  }

  const addAssistantMessage = () => {
    setConversation((prev) => [...prev, { isUser: false, isLoading: true }])
  }

  const updateAssistantMessage = ({ type, content }: { type: string; content: string }) => {
    addAssistantMessageToStore(content, type)
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
