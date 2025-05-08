export default function SectionTitle({
    children,
    color = 'text-[#131A24]',
    className = ''
  }: {
    children: React.ReactNode
    color?: string
    className?: string
  }) {
    return (
      <h2 className={`text-3xl md:text-4xl font-extrabold ${color} ${className}`}>
        {children}
      </h2>
    )
  }
  