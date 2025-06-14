import { create } from 'zustand'

interface IMessage {
  text?: string
  isUser: boolean
  isLoading: boolean
  type?: string
}

interface StoreState {
  conversation: IMessage[]
  addUserMessage: (text: string) => void
  addAssistantMessage: (text: string, type: string) => void
  clearConversation: () => void
}

export const useConversationStore = create<StoreState>()((set) => ({
  conversation: [{ text: 'Cześć! Jak mogę ci pomóc?', isUser: false, isLoading: false }],
  addUserMessage: (text: string) => {
    set((state) => ({
      conversation: [...state.conversation, { text, isUser: true, isLoading: false }]
    }))
  },
  addAssistantMessage: (text: string, type: string) => {
    set((state) => ({
      conversation: [...state.conversation, { isUser: false, isLoading: false, text, type }]
    }))
  },
  clearConversation: () => {
    set({ conversation: [{ text: 'Cześć! Jak mogę ci pomóc?', isUser: false, isLoading: false }] })
  }
}))
