import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Systems Engineer | Portfolio',
  description: 'Systems Engineer specializing in infrastructure, cloud architecture, and DevOps',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/w.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/w.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/w.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/w.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
