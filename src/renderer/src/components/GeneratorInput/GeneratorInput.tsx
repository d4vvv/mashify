import { ArrowRight } from 'lucide-react'
import { Button } from '../Button/Button'
import { useState } from 'react'

interface GeneratorInputProps {
  addUserMessage: (text: string) => void
  isResponseLoading?: boolean
}

export const GeneratorInput: React.FC<GeneratorInputProps> = ({
  addUserMessage,
  isResponseLoading
}) => {
  const [currentValue, setCurrentValue] = useState<string>('')

  const handleButtonClick = () => {
    if (currentValue) {
      addUserMessage(currentValue)
      setCurrentValue('')
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick()
    }
  }

  return (
    <div className="flex gap-4 h-12">
      <input
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        placeholder="Tutaj wpisz swoje pytanie..."
        onKeyDown={(e) => {
          handleEnter(e)
        }}
        className="px-4 flex-1 bg-zinc-500/50 rounded-2xl active:border-ring-none focus:bg-zinc-500/80 transition duration-300 focus:shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)]"
      ></input>
      <Button
        variant="default"
        className="w-12 h-12 rounded-full"
        disabled={!currentValue || isResponseLoading}
        onClick={handleButtonClick}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}
