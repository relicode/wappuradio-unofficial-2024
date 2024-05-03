export const YOUTUBE_VIDEO_ID = 'Iwa6X6BMqKw' as const
export const YOUTUBE_IFRAME_API_URL = 'https://www.youtube.com/iframe_api' as const

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
  youtube: [YOUTUBE_VIDEO_ID],
  video: [`https://youtu.be/${YOUTUBE_VIDEO_ID}`] as const,
} as const

export type Streams = typeof streams
