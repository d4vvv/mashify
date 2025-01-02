import { cn } from '@/utils/cn'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { GeneratorPage } from '../GeneratorPage/GeneratorPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'
import styles from './Layout.module.css'
import { IPost } from '@/types/post'
import { EntriesPage } from '../EntriesPage/EntriesPage'

const Layout: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  const testFunc = useCallback(async () => {
    const data = await window.supabaseAPI.fetchPosts()
    setPosts(data)
  }, [])

  useEffect(() => {
    testFunc()
  }, [testFunc])

  return (
    <>
      <div className={cn(styles.dragArea, 'w-full min-h-8')}></div>
      <div className="flex h-full">
        <Tabs className="flex gap-2 w-full" defaultValue="generator">
          <TabsList className="gap-2 justify-start min-w-[240px] p-4" tabIndex={-1}>
            <TabsTrigger value="generator" asChild>
              <Button variant="menu" tabIndex={0}>
                Generator
              </Button>
            </TabsTrigger>
            <TabsTrigger value="entries" asChild>
              <Button variant="menu" tabIndex={1}>
                Wpisy
              </Button>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="generator">
            <GeneratorPage posts={posts.map((post) => post.content)} />
          </TabsContent>
          <TabsContent value="entries">
            <EntriesPage posts={posts} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

Layout.displayName = 'Layout'

export default Layout
