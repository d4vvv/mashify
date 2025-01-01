import { useCallback, useState } from 'react'
import { GeneratorBubble } from '../Bubbles/GeneratorBubble'
import { UserBubble } from '../Bubbles/UserBubble'
import { GeneratorInput } from '../GeneratorInput/GeneratorInput'
import { IPost } from '@/types/post'

interface GeneratorPageProps {
  posts: IPost[]
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ posts }) => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchOpenAIResponse = useCallback(async (prompt) => {
    try {
      const response = await window.electron.ipcRenderer.invoke('assistantQuestion', {
        relevantPosts: posts.join('|'),
        prompt
      })
      console.log(response)
    } catch (error) {
      console.error('Error fetching OpenAI response:', error)
    }
  }, [])

  return (
    <div className="flex-col flex h-full gap-4 w-full pr-4">
      <div className="flex-1 flex flex-col w-full overflow-y-auto no-scrollbar gap-4">
        <GeneratorBubble text="Cześć! Jak mogę ci pomóc?" />
        <UserBubble />
        <GeneratorBubble />
        <UserBubble />
        <GeneratorBubble />
        <UserBubble />
        <GeneratorBubble />
        <UserBubble />
        <GeneratorBubble />
        <UserBubble />
        <GeneratorBubble />
        <UserBubble />
        <GeneratorBubble isLoading />
        <UserBubble />
        <GeneratorBubble isLoading={isLoading} />
        {isLoading && <UserBubble />}
      </div>
      <button onClick={() => setIsLoading((state) => !state)}>test</button>
      <GeneratorInput />
    </div>
  )
}
