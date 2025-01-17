interface HeadingProps {
  title: string
  description?: string
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <h2 className="text-sm text-muted-foreground">
        {description && description}
      </h2>
    </div>
  )
}
