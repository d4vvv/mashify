import { IMessage } from '@/types/message'
import { useConversationStore } from '@renderer/store/useConversationStore'
import { useCallback, useState } from 'react'

export const useConversation = ({ posts }) => {
  const {
    conversation: initialConversation,
    addUserMessage: addUserMessageToStore,
    addAssistantMessage: addAssistantMessageToStore
  } = useConversationStore()
  const [conversation, setConversation] = useState<IMessage[]>(initialConversation)
  const [isResponseLoading, setIsResponseLoading] = useState(false)

  const addUserMessage = (text: string) => {
    addUserMessageToStore(text)
    setConversation((prev) => [...prev, { text, isUser: true, isLoading: false }])
  }

  const addAssistantMessage = () => {
    setConversation((prev) => [...prev, { isUser: false, isLoading: true }])
    setIsResponseLoading(true)
  }

  const fetchOpenAIResponse = useCallback(
    async (prompt) => {
      try {
        const response = await window.electron.ipcRenderer.invoke('assistantQuestion', {
          relevantPosts: posts.join('|'),
          prompt
        })

        updateAssistantMessage(response)
      } catch (error) {
        console.error('Error fetching OpenAI response:', error)
      }
    },
    [posts]
  )

  const updateAssistantMessage = ({ type, content }: { type: string; content: string }) => {
    addAssistantMessageToStore(content, type)
    setConversation((prev) => {
      const lastMessage = prev[prev.length - 1]
      return [
        ...prev.slice(0, prev.length - 1),
        { ...lastMessage, text: content, isLoading: false, type }
      ]
    })
    setIsResponseLoading(false)
  }

  const handleNewMessage = (message: string) => {
    addUserMessage(message)
    addAssistantMessage()
    fetchOpenAIResponse(message)
  }

  return {
    conversation,
    isResponseLoading,
    handleNewMessage
  }
}
