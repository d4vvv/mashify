import { IPost } from '@/types/post'
import { Card, CardContent } from './Card/Card'
import { Dialog, DialogContent, DialogTrigger } from './Dialog/Dialog'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Button } from './Button/Button'
import { DialogClose } from '@radix-ui/react-dialog'
import { usePostsStore } from '@renderer/store/usePostsStore'
import { useToast } from '@/hooks/useToast'

interface PostCardProps {
  post: IPost
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { fetchPosts } = usePostsStore()
  const { toast } = useToast()
  const [text, tags] = post.content.split(/#(.*)/s)

  const deletePost = async () => {
    await window.supabaseAPI.deletePost(post.id)
    toast({ description: 'Post został usunięty' })
    fetchPosts()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="transition duration-300 hover:cursor-pointer hover:bg-orange-200/10 hover:shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)] max-h-fit">
          <CardContent className="text-xs whitespace-pre-wrap">
            <p>{text.replace(/\u2028/g, '\n')}</p>
            {tags && <p className="mt-2 text-orange-100">{`#${tags}`}</p>}
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="select-text">
        <p className="text-sm">{format(post.created_at, 'dd LLLL y', { locale: pl })}</p>
        <p className="text-sm whitespace-pre-wrap">{text.replace(/\u2028/g, '\n')}</p>
        {tags && <p className="text-sm mt-2 text-orange-100">{`#${tags}`}</p>}
        <DialogClose asChild>
          <Button className="mt-4" onClick={deletePost}>
            Usuń
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
