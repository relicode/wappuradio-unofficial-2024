import { MetadataRoute } from 'next'
import type { StaticImageData } from 'next/image'
import { lookup } from 'mime-types'

import androidIcon144 from './android/icon-144x144.png'
import androidIcon512 from './android/icon-512x512.png'

const androidIcons = [androidIcon144, androidIcon512]

type Icon = NonNullable<MetadataRoute.Manifest['icons']>[number]

const mapIcon = (staticImageData: StaticImageData): Icon => {
  const type = lookup(staticImageData.src)
  return {
    ...staticImageData,
    sizes: `${staticImageData.width}x${staticImageData.height}`,
    ...(type && { type }),
  }
}

const mappedIcons = [...androidIcons].map(mapIcon)

const icons: Icon[] = [
  ...mappedIcons,
  {
    ...mapIcon(androidIcon144),
    purpose: 'maskable',
  },
]

export default icons
