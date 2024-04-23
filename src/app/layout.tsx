'use client'
import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { BottomNavigation, BottomNavigationAction, Dialog, Link, Slide } from '@mui/material'
// import { styled } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import Paper from '@mui/material/Paper'

import theme from '@/theme'
import { useState } from 'react'
import CelebrationIcon from '@mui/icons-material/Celebration'

const dialogKeys = ['DEFAULT', 'ABOUT_ME', 'ABOUT_WAPPURADIO'] as const
type DialogKey = (typeof dialogKeys)[number]
const isDialogKey = (value: unknown): value is DialogKey =>
  typeof value === 'string' && dialogKeys.includes(value as DialogKey)

const dialogContents: { [K in DialogKey]: React.ReactNode } = {
  DEFAULT: null,
  ABOUT_ME: (
    <p>
      I{"'"}m{' '}
      <Link href="https://anssi.siren.codes/" underline="always">
        Anssi Siren
      </Link>
      . I{"'"}m in no way affiliated with the{' '}
      <Link href="https://wappuradio.fi/" underline="always">
        Wappuradio
      </Link>{' '}
      organization and created this application for fun.
    </p>
  ),
  ABOUT_WAPPURADIO: (
    <p>
      Official Wappuradio can be found{' '}
      <Link href="https://wappuradio.fi/" underline="always">
        here
      </Link>
      . This application is not related to the official team in any mean or way. Any similarity to actual persons,
      living or dead, is more or less coincidental.
    </p>
  ),
} as const

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dialogContent, setDialogContent] = useState(dialogContents.DEFAULT)

  return (
    <html lang="en" style={{ height: '100%' }}>
      <body style={{ height: '100%' }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ height: '100%', pb: 7 }}>
              <Dialog
                onClose={() => setDialogContent(dialogContents.DEFAULT)}
                open={!!dialogContent}
                TransitionComponent={Slide}
              >
                <Paper elevation={3} sx={{ p: 2 }}>
                  {dialogContent}
                </Paper>
              </Dialog>
              <Box component="main" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {children}
              </Box>
            </Box>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation
                sx={{ justifyContent: 'space-evenly' }}
                showLabels
                value={dialogContents.ABOUT_ME}
                onChange={(_, val) => {
                  if (isDialogKey(val)) setDialogContent(dialogContents[val])
                }}
              >
                <BottomNavigationAction
                  value={'ABOUT_WAPPURADIO'}
                  label="About Wappuradio"
                  icon={<CelebrationIcon />}
                />
                <BottomNavigationAction value={'ABOUT_ME'} label="About me" icon={<SentimentVerySatisfiedIcon />} />
              </BottomNavigation>
            </Paper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
