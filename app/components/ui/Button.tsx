import Link from 'next/link'

export default function Button({
  children,
  href = '#',
  bgColor = 'bg-[#454181]',
  textColor = 'text-white',
  className = ''
}: {
  children: React.ReactNode
  href?: string
  bgColor?: string
  textColor?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-block ${bgColor} ${textColor} px-14 py-2 rounded-[10px] font-semibold hover:opacity-90 transition ${className}`}
    >
      {children}
    </Link>
  )
}
