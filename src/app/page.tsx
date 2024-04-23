'use client'
import { useState, type ReactNode } from 'react'
import MediaSelector from '@/components/MediaSelector'
import { streams } from '@/utils/config'
import MediaPlayer from '@/components/MediaPlayer'
import {
  Box,
  Dialog,
  Slide,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Link,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import theme from '@/theme'
import { Viewport } from 'next'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import CelebrationIcon from '@mui/icons-material/Celebration'

const dialogKeys = ['DEFAULT', 'ABOUT_ME', 'ABOUT_WAPPURADIO'] as const
type DialogKey = (typeof dialogKeys)[number]
const isDialogKey = (value: unknown): value is DialogKey =>
  typeof value === 'string' && dialogKeys.includes(value as DialogKey)

export const viewport: Viewport = {
  themeColor: '#660f11',
  width: 'device-width',
  initialScale: 1,
}

const dialogContents: { [K in DialogKey]: ReactNode } = {
  DEFAULT: null,
  ABOUT_ME: (
    <p>
      I{"'"}m{' '}
      <Link href="https://anssi.siren.codes/" target="_blank" underline="always">
        Anssi Siren
      </Link>
      . I{"'"}m in no way affiliated with the{' '}
      <Link href="https://wappuradio.fi/" target="_blank" underline="always">
        Wappuradio
      </Link>{' '}
      organization and created this application for fun.
      <br />
      <br />
      The source code for this application can be found{' '}
      <Link href="https://github.com/relicode/wappuradio-unofficial-2024" target="_blank" underline="always">
        here
      </Link>
      .
    </p>
  ),
  ABOUT_WAPPURADIO: (
    <p>
      Official Wappuradio can be found{' '}
      <Link href="https://wappuradio.fi/" target="_blank" underline="always">
        here
      </Link>
      . This application is not related to the official team in any mean or way. Any similarity to actual persons,
      living or dead, is more or less coincidental.
      <br />
      <br />
      The source code for this application can be found{' '}
      <Link href="https://github.com/relicode/wappuradio-unofficial-2024" target="_blank" underline="always">
        here
      </Link>
      .
    </p>
  ),
} as const

const defaultStream = streams.audio[0]

const Home = () => {
  const [currentStream, setCurrentStream] = useState<string>(defaultStream)
  const [dialogContent, setDialogContent] = useState(dialogContents.DEFAULT)

  return (
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
          <MediaSelector
            currentStream={currentStream}
            streams={streams}
            onChange={(ev) => {
              setCurrentStream(ev.target.value)
            }}
          />
          <MediaPlayer stream={currentStream} />
        </Box>
      </Box>
      <BottomNavigation
        sx={{ justifyContent: 'space-evenly', position: 'fixed', bottom: 0, left: 0, right: 0 }}
        showLabels
        value={dialogContents.ABOUT_ME}
        onChange={(_, val) => {
          if (isDialogKey(val)) setDialogContent(dialogContents[val])
        }}
      >
        <BottomNavigationAction value={'ABOUT_WAPPURADIO'} label="About Wappuradio" icon={<CelebrationIcon />} />
        <BottomNavigationAction value={'ABOUT_ME'} label="About me" icon={<SentimentVerySatisfiedIcon />} />
      </BottomNavigation>
    </ThemeProvider>
  )
}

export default Home
