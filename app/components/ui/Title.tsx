export default function Title({
    children,
    color = 'text-[#131A24]',
    className = ''
  }: {
    children: React.ReactNode
    color?: string
    className?: string
  }) {
    return (
      <h1 className={`text-4xl md:text-6xl font-extrabold ${color} ${className}`}>
        {children}
      </h1>
    )
  }
  