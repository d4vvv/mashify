import { useConversation } from '@/hooks/useConversation'
import { useEffect, useRef } from 'react'
import { GeneratorBubble } from '../Bubbles/GeneratorBubble'
import { UserBubble } from '../Bubbles/UserBubble'
import { GeneratorInput } from '../GeneratorInput/GeneratorInput'

interface GeneratorPageProps {
  posts: string[]
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ posts }) => {
  const ref = useRef<HTMLDivElement>(null)

  const { conversation, isResponseLoading, handleNewMessage } = useConversation({ posts })

  const renderConversation = () =>
    conversation.map((message, index) => {
      return (
        <>
          {message.isUser ? (
            <UserBubble key={index} text={message.text as string} />
          ) : (
            <GeneratorBubble
              key={index}
              text={message.text}
              isLoading={message.isLoading}
              type={message.type}
            />
          )}
        </>
      )
    })

  useEffect(() => {
    ref.current?.scrollTo({ left: 0, top: ref.current.scrollHeight, behavior: 'smooth' })
  }, [conversation])

  return (
    <div className="flex-col flex h-full gap-6 w-full pr-4">
      <div ref={ref} className="flex-1 flex flex-col w-full overflow-y-auto no-scrollbar gap-4">
        {renderConversation()}
      </div>
      <GeneratorInput addUserMessage={handleNewMessage} isResponseLoading={isResponseLoading} />
    </div>
  )
}
