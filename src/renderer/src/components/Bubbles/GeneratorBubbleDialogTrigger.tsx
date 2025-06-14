import { usePostsStore } from '@renderer/store/usePostsStore'
import { Button } from '../Button/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '../Dialog/Dialog'
import { useState } from 'react'
import { useToast } from '@/hooks/useToast'

interface GeneratorBubbleDialogTriggerProps {
  text: string
}

export const GeneratorBubbleDialogTrigger: React.FC<GeneratorBubbleDialogTriggerProps> = ({
  text
}) => {
  const [textAreaContent, setTextAreaContent] = useState(text.replace(/\u2028/g, '\n'))
  const { fetchPosts } = usePostsStore()
  const { toast } = useToast()

  const savePost = async () => {
    await window.supabaseAPI.savePost(textAreaContent)
    toast({ description: 'Wpis został zapisany' })
    fetchPosts()
  }

  return (
    <div className="w-full flex justify-end mt-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-xs py-1 px-2 h-auto rounded-sm translate-x-1 focus:outline-none !focus:ring-0 focus:no-ring"
            onClick={() => {
              setTextAreaContent(text?.replace(/\u2028/g, '\n'))
            }}
          >
            Dostosuj
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Dostosuj post</DialogTitle>

          <textarea
            className="bg-transparent no-scrollbar whitespace-pre-wrap border rounded-xl rounded-br-none p-4 border-zinc-500 text-sm h-96 focus:outline-none"
            value={textAreaContent}
            onChange={(e) => {
              setTextAreaContent(e.target.value)
            }}
          />
          <DialogFooter className="w-full gap-y-2">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigator.clipboard.writeText(textAreaContent as string)}
            >
              Kopiuj
            </Button>
            <DialogClose asChild>
              <Button className="w-full" onClick={savePost}>
                Zapisz
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
