import { useEffect, useState } from 'react'

export const useCreateAssistant = (openai) => {
  const [assistant, setAssistant] = useState(null)
  useEffect(() => {
    const createAssistant = async () => {
      if (!assistant) {
        const createdAssistant = await openai.beta.assistants.create({
          name: 'Math Tutor',
          instructions:
            'You are a personal math tutor. Write and run code to answer math questions.',
          tools: [{ type: 'code_interpreter' }],
          model: 'gpt-4o'
        })
        setAssistant(assistant)
      }
    }
    createAssistant()
  }, [openai])
  return assistant
}
