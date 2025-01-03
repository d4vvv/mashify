import { IPost } from '@/types/post'
import { PostCard } from '../PostCard'

interface EntriesPageProps {
  posts: IPost[]
}

export const EntriesPage: React.FC<EntriesPageProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 pr-4 gap-4 pb-4 overflow-y-auto h-[calc(100%+16px)] no-scrollbar">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
