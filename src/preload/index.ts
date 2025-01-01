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
      fetchTexts: async () => {
        const response = await fetch(
          'https://utmimfwfldlhkagfncwx.supabase.co/functions/v1/manage-texts'
        )
        const data = await response.json()
        return data
      },

      fetchPosts: async () => {
        const { data, error } = await supabase.from('posts').select('content')
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
  // @ts-ignore (define in dts)
}
