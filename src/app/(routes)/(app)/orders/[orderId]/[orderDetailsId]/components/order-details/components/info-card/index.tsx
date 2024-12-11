interface InfoCardProps {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

export const InfoCard = ({ icon, title, content }: InfoCardProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-xs">{title}</h3>
        {content}
      </div>
    </div>
  )
}
