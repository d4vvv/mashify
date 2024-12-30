import { Button } from '../Button/Button'
import { Tabs, TabsList, TabsTrigger } from '../Tabs/Tabs'

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full p-4 flex flex-col gap-2">
      <Tabs>
        <TabsList className="gap-2">
          <TabsTrigger value="generator" asChild>
            <Button variant="menu">Generator</Button>
          </TabsTrigger>
          <TabsTrigger value="entries" asChild>
            <Button variant="menu">Wpisy</Button>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
