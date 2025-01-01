interface UserBubbleProps {
  text: string
}

export const UserBubble: React.FC<UserBubbleProps> = ({ text }) => {
  return (
    <div className="w-full flex justify-end animate-fade-left animate-duration-200">
      <div className="bg-primary rounded-lg py-3 px-4 text-sm max-w-[60%]">{text}</div>
    </div>
  )
}
