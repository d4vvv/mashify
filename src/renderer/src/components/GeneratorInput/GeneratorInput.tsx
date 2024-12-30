import { ArrowRight } from 'lucide-react'
import { Button } from '../Button/Button'
import { useState } from 'react'

export const GeneratorInput: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<string>('')

  return (
    <div className="flex gap-4 h-12">
      <input
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        placeholder="Test"
        className="px-4 flex-1 bg-zinc-500/50 rounded-2xl active:border-ring-none focus:bg-zinc-500/80 transition duration-300 focus:shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)]"
      ></input>
      <Button variant="default" className="w-12 h-12 rounded-full">
        <ArrowRight />
      </Button>
    </div>
  )
}
