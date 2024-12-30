import { cn } from '@/utils/cn'
import { Button } from '../Button/Button'
import { GeneratorPage } from '../GeneratorPage/GeneratorPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs/Tabs'
import styles from './Layout.module.css'

const Layout: React.FC = () => {
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
            <GeneratorPage />
          </TabsContent>
          <TabsContent value="entries">Entries</TabsContent>
        </Tabs>
      </div>
    </>
  )
}

Layout.displayName = 'Layout'

export default Layout
