import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import supabase from './supabase/supabaseClient'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('supabaseAPI', {
      fetchPosts: async () => {
        const { data, error } = await supabase.from('posts').select('*')
        if (error) throw error
        return data
      },
      deletePost: async (id: string) => {
        const { error } = await supabase.from('posts').delete().eq('id', id)
        if (error) {
          throw error
        }
      },
      savePost: async (contentValue: string) => {
        const { data, error } = await supabase.from('posts').insert({ content: contentValue })
        if (error) throw error
        return data
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
