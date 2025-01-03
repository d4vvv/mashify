import { useMemo } from 'react'

export const useSplitPostContent = (text?: string) =>
  useMemo(() => (text || '').split(/#(.*)/s), [text])
