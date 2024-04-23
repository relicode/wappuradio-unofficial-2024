import { MetadataRoute } from 'next'
import icons from './icons'

const Manifest = (): MetadataRoute.Manifest => ({
  id: '/',
  name: 'Wappuradio unofficial',
  short_name: 'Unofficial Wappuradio PWA',
  description: 'Unofficial Wappuradio PWA',
  start_url: '/',
  display: 'standalone',
  background_color: '#660f11',
  theme_color: '#e79f84',
  display_override: ['window-controls-overlay'],
  serviceworker: {
    src: '/service-worker.js',
    type: 'module',
  },
  ...{ permissions: ['storage'] },
  screenshots: [],
  icons,
})

export default Manifest
