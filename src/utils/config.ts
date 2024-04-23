export const HEIGHT_FACTOR = 0.5621951219512196 as const

const BASE_URL_PRIMARY = 'https://stream1.wappuradio.fi/' as const
const BASE_URL_SECONDARY = 'https://stream2.wappuradio.fi/' as const

export const streams = {
  audio: [
    `${BASE_URL_PRIMARY}wappuradio.opus`,
    `${BASE_URL_PRIMARY}wappuradio.ogg`,
    `${BASE_URL_PRIMARY}wappuradio.mp3`,
    `${BASE_URL_SECONDARY}wappuradio.opus`,
    `${BASE_URL_SECONDARY}wappuradio.ogg`,
    `${BASE_URL_SECONDARY}wappuradio.mp3`,
  ] as const,
  video: ['https://youtu.be/Iwa6X6BMqKw'] as const,
} as const

export type Streams = typeof streams
