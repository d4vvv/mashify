import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    supabaseAPI: {
      fetchPosts: () => Promise<IPost[]>
      deletePost: (id: number) => void
      savePost: (post: IPost) => unknown
    }
  }
}
