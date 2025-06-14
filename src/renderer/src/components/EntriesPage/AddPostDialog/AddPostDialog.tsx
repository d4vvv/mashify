import { usePostsStore } from '@renderer/store/usePostsStore'
import { Button } from '../../Button/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '../../Dialog/Dialog'
import { useState } from 'react'
import { useToast } from '@/hooks/useToast'

interface AddPostDialogProps {
  text: string
}

export const AddPostDialog: React.FC<AddPostDialogProps> = ({ text }) => {
  const [textAreaContent, setTextAreaContent] = useState(text.replace(/\u2028/g, '\n'))
  const { fetchPosts } = usePostsStore()
  const { toast } = useToast()

  const savePost = async () => {
    await window.supabaseAPI.savePost(textAreaContent)
    toast({ description: 'Wpis został dodany' })
    setTextAreaContent('')
    fetchPosts()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="group absolute right-4 bottom-4 rounded-full w-12 h-12 hover:w-40 overflow-hidden transition-all text-align-end">
          <span className="w-0 opacity-0 group-hover:w-32 group-hover:opacity-100 transition-all overflow-hidden mr-4 text-lg!important">
            Dodaj wpis
          </span>
          <span className="absolute right-4 w-4 text-lg">+</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-2">
        <DialogTitle className="pb-4 max-h-fit">Dodaj wpis</DialogTitle>
        <div className="text-sm">Tekst</div>
        <textarea
          className="bg-transparent no-scrollbar whitespace-pre-wrap border rounded-xl rounded-br-none p-4 h-72 border-zinc-500 text-sm focus:outline-none"
          value={textAreaContent}
          onChange={(e) => {
            setTextAreaContent(e.target.value)
          }}
        />
        <DialogFooter className="w-full gap-y-2 mt-4 self-end">
          <DialogClose asChild>
            <Button disabled={!textAreaContent.length} className="w-full" onClick={savePost}>
              Zapisz
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
