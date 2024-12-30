import { useCallback, useEffect, useState } from 'react'
import { PostCard } from './components/PostCard'
import { IPost } from '@/types/post'

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  const testFunc = useCallback(async () => {
    const data = await window.supabaseAPI.fetchPosts()
    setPosts(data)
  }, [])

  useEffect(() => {
    testFunc()
  }, [testFunc])

  console.log({ posts })

  return (
    <div className="p-2">
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default App
