import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    supabaseAPI: {
      fetchPosts: () => Promise<IPost[]>
      fetchTexts: () => Promise<IPost[]>
    }
  }
}
