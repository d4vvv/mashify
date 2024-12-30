import { Card, CardContent, CardHeader, CardTitle } from './Card/Card'
import { IPost } from '@/types/post'

interface PostCardProps {
  post: IPost
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.content}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-xs">{post.created_at}</span>
      </CardContent>
    </Card>
  )
}
