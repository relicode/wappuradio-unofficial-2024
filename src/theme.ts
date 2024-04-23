'use client'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

export const primaryMain = '#660f11' as const
export const secondaryMain = '#e79f84' as const
export const backgroundPaper = '#f3f3d8' as const

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    },
    background: {
      default: secondaryMain,
      paper: backgroundPaper,
    },
  },

  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export default theme
