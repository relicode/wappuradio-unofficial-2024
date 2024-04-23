'use client'
import * as React from 'react'
import { Box } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { isVideoStream } from '@/utils'

export type MediaPlayerProps = {
  stream: string
}

type AudioPlayerProps = {
  audioRef: React.RefObject<HTMLAudioElement>
  onClick: () => void
  shouldPlay: boolean
  stream: string
}

const sx = { cursor: 'pointer', borderRadius: '50%', border: 'solid 1px black', fontSize: '96px' } as const
const opusRE = /\.opus$/
const vorbisRE = /\.ogg$/
const mp3RE = /\.mp3$/

const getAudioType = (url: string) => {
  if (opusRE.test(url)) return 'audio/ogg; codecs=opus'
  if (vorbisRE.test(url)) return 'audio/ogg; codecs=vorbis'
  if (mp3RE.test(url)) return 'audio/mpeg'
  console.warn('Audio type not recognized, falling back to mp3') // eslint-disable-line no-console
  return undefined
}

const AudioPlayer = ({ audioRef, onClick, shouldPlay, stream }: AudioPlayerProps) => (
  <>
    {shouldPlay ? <PauseIcon {...{ onClick, sx }} /> : <PlayArrowIcon {...{ onClick, sx }} />}
    <audio ref={audioRef}>{getAudioType(stream) && <source src={stream} type={getAudioType(stream) || ''} />}</audio>
  </>
)

const VideoPlayer = ({ src = 'https://www.youtube.com/embed/Iwa6X6BMqKw' }: { src?: string }) => (
  <iframe
    allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share"
    allowFullScreen
    src={src}
    title="Rakkauden Wappuradio 2024"
    width="100%"
  />
)

const MediaPlayer = ({ stream }: MediaPlayerProps) => {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [shouldPlay, setShouldPlay] = React.useState(false)

  const toggleShouldPlay = () => setShouldPlay((prev) => !prev)
  const audioElem = audioRef.current

  React.useEffect(() => {
    if (audioElem) {
      audioElem.src = stream
      if (shouldPlay)
        audioElem.play().catch((e) => {
          console.warn(e) // eslint-disable-line no-console
        })
    }
  }, [audioElem, shouldPlay, stream])

  const isVideo = isVideoStream(stream)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexBasis: isVideo ? '100%' : '50%' }}>
      {isVideo ? (
        <VideoPlayer />
      ) : (
        <AudioPlayer audioRef={audioRef} onClick={toggleShouldPlay} shouldPlay={shouldPlay} stream={stream} />
      )}
    </Box>
  )
}

export default MediaPlayer
