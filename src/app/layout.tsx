import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import { AppHeader } from '@/components'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Morpho test',
    default: 'Morpho test',
  },
  description: 'Morpho test assignment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <ThemeProvider defaultTheme="light">
          <div className="app-wrapper">
            <AppHeader />
            <div className="app-content">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
