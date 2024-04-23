'use client'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#660f11',
    },
    secondary: {
      main: '#e79f84',
    },
    background: {
      default: '#e79f84',
      paper: '#f3f3d8',
    },
  },

  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export default theme
