export const BubbleLoader: React.FC = () => {
  return (
    <div className="flex gap-2 animate-out">
      <div className="bg-white w-2 h-2 aspect-square rounded-full animate-pulse"></div>
      <div className="bg-white w-2 h-2 aspect-square rounded-full animate-pulse [animation-delay:0.3s]"></div>
      <div className="bg-white w-2 h-2 aspect-square rounded-full animate-pulse [animation-delay:0.6s]"></div>
    </div>
  )
}
