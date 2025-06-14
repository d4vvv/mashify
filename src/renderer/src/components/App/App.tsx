import { cn } from '@/utils/cn'
import { usePostsStore } from '@renderer/store/usePostsStore'
import { useEffect } from 'react'
import { Button } from '../Button/Button'
import { EntriesPage } from '../EntriesPage/EntriesPage'
import { GeneratorPage } from '../GeneratorPage/GeneratorPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'
import styles from './App.module.css'
import { useConversationStore } from '@renderer/store/useConversationStore'

const App: React.FC = () => {
  const { posts, fetchPosts } = usePostsStore()
  const { clearConversation } = useConversationStore()

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <div className={cn(styles.dragArea, 'w-full min-h-8')}></div>
      <div className="flex h-[calc(100%-32px)]">
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
            <div className="flex-1" />
            <Button
              variant="menu"
              className="self-start justify-self-end text-sm px-3"
              onClick={clearConversation}
            >
              Resetuj czat
            </Button>
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

App.displayName = 'App'

export default App
