import { IPost } from '@/types/post'
import { create } from 'zustand'

interface PostsStoreState {
  posts: IPost[]
  fetchPosts: () => void
  setPosts: (posts: IPost[]) => void
}

export const usePostsStore = create<PostsStoreState>()((set) => ({
  posts: [],
  fetchPosts: async () => {
    const posts = await window.supabaseAPI.fetchPosts()
    set({ posts })
  },
  setPosts: (posts: IPost[]) => set({ posts })
}))
