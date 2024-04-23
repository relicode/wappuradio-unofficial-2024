export * as config from './config'

const videoRE = /^https:\/\/youtu\.be/
const altAudioRE = /^https:\/\/stream2\./

export const isVideoStream = (stream: string) => videoRE.test(stream)
export const isAltAudioStream = (stream: string) => altAudioRE.test(stream)

export const getStreamDescription = (url: string, capitalize = true) => {
  const desc = url.split('.').reverse()[0] || ''
  return capitalize ? desc.replace(/^./, desc[0].toUpperCase()) : desc
}
