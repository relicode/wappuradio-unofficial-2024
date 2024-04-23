'use client'
import * as React from 'react'
import { Box } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { isVideoStream } from '@/utils'
import { streams } from '@/utils/config'
import { lookup } from 'mime-types'

export type MediaPlayerProps = {
  stream: string
}

const MediaPlayer = ({ stream }: MediaPlayerProps) => {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [shouldPlay, setShouldPlay] = React.useState(false)

  const toggleShouldPlay = () => setShouldPlay((prev) => !prev)
  // const isAudio = stream && !isVideoStream(stream)

  const audioElem = audioRef.current

  React.useEffect(() => {
    if (audioElem) {
      audioElem.src = stream
      if (shouldPlay)
        audioElem.play().catch((e) => {
          console.warn(e)
        })
    }
  }, [audioElem, shouldPlay, stream])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexBasis: '50%' }}>
      {shouldPlay ? (
        <PauseIcon onClick={toggleShouldPlay} sx={{ fontSize: '96px' }} />
      ) : (
        <PlayArrowIcon onClick={toggleShouldPlay} sx={{ fontSize: '96px' }} />
      )}
      <audio ref={audioRef}>{lookup(stream) && <source src={stream} type={lookup(stream) || ''} />}</audio>
    </Box>
  )
}

export default MediaPlayer
