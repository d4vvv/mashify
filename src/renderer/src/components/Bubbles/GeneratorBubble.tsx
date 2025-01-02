import { cn } from '@/utils/cn'
import { BubbleLoader } from './BubbleLoader'

interface GeneratorBubbleProps {
  isLoading?: boolean
  text?: string
}

export const GeneratorBubble: React.FC<GeneratorBubbleProps> = ({ text, isLoading }) => {
  const renderContent = () => {
    if (isLoading) {
      return <BubbleLoader />
    }

    return (
      <>
        <p>{text}</p>
        <p>ADJUST</p>
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
