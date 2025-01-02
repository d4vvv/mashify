import { IPost } from '@/types/post'
import { Card, CardContent } from './Card/Card'
import { Dialog, DialogContent, DialogTrigger } from './Dialog/Dialog'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Button } from './Button/Button'
import { DialogClose } from '@radix-ui/react-dialog'

interface PostCardProps {
  post: IPost
  fetchPosts: () => void
}

export const PostCard: React.FC<PostCardProps> = ({ post, fetchPosts }) => {
  const [text, tags] = post.content.split(/#(.*)/s)

  const deletePost = async () => {
    await window.supabaseAPI.deletePost(post.id)
    fetchPosts()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="transition duration-300 hover:cursor-pointer hover:bg-orange-200/10 hover:shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)]">
          <CardContent className="text-xs">
            <p>{text}</p>
            <p className="mt-2 text-orange-100">{`#${tags}`}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="select-text">
        <p className="text-sm">{format(post.created_at, 'dd LLLL y', { locale: pl })}</p>
        <p className="text-sm">{text}</p>
        <p className="text-sm mt-2 text-orange-100">{`#${tags}`}</p>
        <DialogClose asChild>
          <Button className="mt-4" onClick={deletePost}>
            Usuń
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
