import type { Metadata } from 'next'
import './globals.css'
import { Readex_Pro } from 'next/font/google'

const readex = Readex_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})
export const metadata = { /* ... */ }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={readex.className}>{children}</body>
    </html>
  )
}
