export default function Text({
    children,
    color = 'text-[#131A24]',
    className = ''
  }: {
    children: React.ReactNode
    color?: string
    className?: string
  }) {
    return (
      <p className={`text-base md:text-lg leading-relaxed ${color} ${className}`}>
        {children}
      </p>
    )
  }
  