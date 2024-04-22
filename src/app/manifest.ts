import { MetadataRoute } from 'next'
import icons from './icons'

// import screenshotWide from './screenshots/screenshot-1880x940-01.png'
// import screenshotNarrow from './screenshots/screenshot-996x1430-01.png'

const Manifest = (): MetadataRoute.Manifest => ({
  id: '/',
  name: 'Wappuradio unofficial',
  short_name: 'Unofficial Wappuradio PWA',
  description: 'Unofficial Wappuradio PWA',
  start_url: '/',
  display: 'standalone',
  background_color: '#e79f84',
  theme_color: '#660f11',
  display_override: ['window-controls-overlay'],
  serviceworker: {
    src: '/service-worker.js',
    type: 'module',
  },
  ...{ permissions: ['storage'] },
  screenshots: [
    /*
    {
      ...screenshotWide,
      sizes: '1880x940',
      form_factor: 'wide', // not supported by typing
      type: 'image/png',
    } as any,
    {
      ...screenshotNarrow,
      sizes: '996x1430',
      type: 'image/png',
    },
    */
  ],
  icons,
})

export default Manifest
