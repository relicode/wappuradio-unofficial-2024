export * as config from './config'

const videoRE = /^https:\/\/youtu\.be/
const altAudioRE = /^https:\/\/stream2\./
const opusRE = /\.opus$/
const vorbisRE = /\.ogg$/
const mp3RE = /\.mp3$/

export const isVideoStream = (stream: string) => videoRE.test(stream)
export const isAltAudioStream = (stream: string) => altAudioRE.test(stream)

export const getStreamDescription = (url: string, capitalize = true) => {
  const desc = url.split('.').reverse()[0] || ''
  return capitalize ? desc.replace(/^./, desc[0].toUpperCase()) : desc
}

export const getAudioType = (url: string) => {
  if (opusRE.test(url)) return 'audio/ogg; codecs=opus'
  if (vorbisRE.test(url)) return 'audio/ogg; codecs=vorbis'
  if (mp3RE.test(url)) return 'audio/mpeg'
  console.warn('Audio type not recognized, falling back to mp3') // eslint-disable-line no-console
  return undefined
}
