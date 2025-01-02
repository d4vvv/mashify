import { cn } from '@/utils/cn'
import { BubbleLoader } from './BubbleLoader'
import { Button } from '../Button/Button'

interface GeneratorBubbleProps {
  isLoading?: boolean
  text?: string
  type?: string
}

export const GeneratorBubble: React.FC<GeneratorBubbleProps> = ({ type, text, isLoading }) => {
  const renderContent = () => {
    if (isLoading) {
      return <BubbleLoader />
    }

    const [textContent, tags] = (text as string).split(/#(.*)/s)

    return (
      <>
        <p>{textContent}</p>
        {tags && <p className="mt-2 text-orange-100">{`#${tags}`}</p>}
        {type === 'post' && (
          <div className="w-full flex justify-end mt-3">
            <Button variant="ghost" className="text-xs py-1 px-2 h-auto rounded-sm translate-x-1">
              Dostosuj
            </Button>
          </div>
        )}
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
