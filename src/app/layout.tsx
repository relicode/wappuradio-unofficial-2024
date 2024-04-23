import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata, Viewport } from 'next/types'

export const metadata: Metadata = {
  title: 'Wappuradio unofficial',
  description: 'Unofficial Wappuradio PWA',
}

export const viewport: Viewport = {
  themeColor: '#f3f3d8',
  width: 'device-width',
  initialScale: 1,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" style={{ height: '100%' }}>
    <body style={{ height: '100%' }}>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </body>
  </html>
)

export default RootLayout
