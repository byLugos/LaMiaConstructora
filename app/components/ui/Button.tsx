import Link from 'next/link'

export default function Button({
  children,
  href = '#',
  bgColor = 'bg-[#967C6D]',
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
      className={`inline-block ${bgColor} ${textColor} px-6 py-3 rounded-md font-semibold hover:opacity-90 transition ${className}`}
    >
      {children}
    </Link>
  )
}
