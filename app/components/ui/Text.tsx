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
    <p
      className={`font-[400] text-[20px] leading-[100%] tracking-[0] ${color} ${className}`}
    >
      {children}
    </p>
  );
}
