import type { Metadata } from 'next'
import './globals.css'
import { Red_Hat_Display } from 'next/font/google'

const redHat = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-redhat',
})
export const metadata = { /* ... */ }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={redHat.className}>{children}</body>
    </html>
  )
}
