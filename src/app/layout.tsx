'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { BottomNavigation, BottomNavigationAction, Dialog, Fade, Popper, Slide } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import Paper from '@mui/material/Paper'

import theme from '@/theme'
import { useState } from 'react'
import CelebrationIcon from '@mui/icons-material/Celebration'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

enum Actions {
  DEFAULT = '',
  WHO_AM_I = 'WHO_AM_I',
  ABOUT_WAPPURADIO = 'ABOUT_WAPPURADIO',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState(Actions.DEFAULT)
  const modalContent =
    value === Actions.WHO_AM_I ? (
      <>
        <p>
          Brough to you by <a href="https://anssi.siren.codes/">Anssi Siren</a>
        </p>
        <p>
          Source code <a href="https://github.com/relicode/wappuradio-unofficial-2024">here</a>
        </p>
      </>
    ) : (
      ''
    )

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ pb: 7 }}>
              <Dialog
                onClose={(ev) => {
                  setValue(Actions.DEFAULT)
                }}
                open={!!modalContent}
                TransitionComponent={Slide}
              >
                <Paper elevation={3} sx={{ p: 2 }}>
                  {modalContent}
                </Paper>
              </Dialog>
              <Box component="main">
                {children}
                {value}
                {children}
                {value}
                {children}
                {value}
                {children}
                {value}
                {children}
                {value}
                {children}
                {value}
                {children}
                {value}
              </Box>
              <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                  sx={{ justifyContent: 'space-evenly' }}
                  showLabels
                  value={value}
                  onChange={(_, newValue) => {
                    if (newValue === Actions.WHO_AM_I) setValue(newValue)
                  }}
                >
                  <BottomNavigationAction
                    value={Actions.WHO_AM_I}
                    label="By Anssi Siren"
                    icon={<SentimentVerySatisfiedIcon />}
                  />
                  <BottomNavigationAction
                    value={Actions.ABOUT_WAPPURADIO}
                    label="About Wappuradio"
                    icon={<CelebrationIcon />}
                  />
                </BottomNavigation>
              </Paper>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
