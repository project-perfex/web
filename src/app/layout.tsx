import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import './globals.css'
import ToasterProvider from '@/providers/toast-provider'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Perfex CRM',
  description:
    'Perfex CRM is a complete Customer Relationship Management software that is a great fit for almost any company, freelancer or many other uses. With its clean and modern design, Perfex CRM can help you look more professional to your customers and help improve business performance at the same time.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}
