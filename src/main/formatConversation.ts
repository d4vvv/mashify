export interface IMessage {
  text?: string
  isUser: boolean
  isLoading: boolean
  type?: string
}

export const formatConversation = (conversation: IMessage[]) => {
  return conversation.map((message) => ({
    role: message.isUser ? 'user' : 'assistant',
    content: message.text
  }))
}
