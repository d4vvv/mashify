import { IPost } from '@/types/post'
import { Card, CardContent } from './Card/Card'

interface PostCardProps {
  post: IPost
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [text, tags] = post.content.split(/#(.*)/s)

  return (
    <Card className="transition duration-300 hover:cursor-pointer hover:bg-orange-200/10 hover:shadow-[0px_0px_6px_4px_rgba(0,_0,_0,_0.1)]">
      <CardContent className="text-xs">
        <p>{text}</p>
        <p className="mt-2 text-orange-100">{`#${tags}`}</p>
      </CardContent>
    </Card>
  )
}
