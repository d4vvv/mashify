import { useSplitPostContent } from '@/hooks/useSplitPostContent'
import { cn } from '@/utils/cn'
import { BubbleLoader } from './BubbleLoader'
import { GeneratorBubbleDialogTrigger } from './GeneratorBubbleDialogTrigger'

interface GeneratorBubbleProps {
  isLoading?: boolean
  text?: string
  type?: string
}

export const GeneratorBubble: React.FC<GeneratorBubbleProps> = ({ type, text, isLoading }) => {
  const [textContent, tags] = useSplitPostContent(text)

  const renderContent = () => {
    if (isLoading) {
      return <BubbleLoader />
    }

    return (
      <>
        <p className="whitespace-pre-wrap">{textContent.replace(/\u2028/g, '\n')}</p>
        {tags && <p className="text-orange-100 whitespace-pre-wrap">{`#${tags}`}</p>}
        {type === 'post' && <GeneratorBubbleDialogTrigger text={text as string} />}
      </>
    )
  }

  return (
    <div
      className={cn(
        'bg-zinc-500/50 rounded-lg py-3 px-4 text-sm flex-shrink max-w-[70%] w-fit transition-all duration-200 animate-in'
      )}
    >
      {renderContent()}
    </div>
  )
}
