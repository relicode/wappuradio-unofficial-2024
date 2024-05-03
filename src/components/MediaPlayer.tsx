'use client'
import * as React from 'react'
import { Box } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { getAudioType, isVideoStream } from '@/utils'
import { YOUTUBE_VIDEO_ID, YOUTUBE_IFRAME_API_URL, streams } from '@/utils/config'
import Script from 'next/script'

export type MediaPlayerProps = {
  stream: string
}

type AudioPlayerProps = {
  audioRef: React.RefObject<HTMLAudioElement>
  onClick?: () => void
  hidden?: boolean
  shouldPlay: boolean
  stream: string
}

const YOUTUBE_IFRAME_ID = 'jKnLrjcZ4z5odSxqSBzXB7' as const
const sx = { cursor: 'pointer', borderRadius: '50%', border: 'solid 1px black', fontSize: '96px' } as const
const w = window as unknown as { onYouTubeIframeAPIReady?: () => void }

const AudioPlayer = ({ audioRef, onClick, hidden = false, shouldPlay, stream }: AudioPlayerProps) => {
  const ControlComponent = shouldPlay ? PauseIcon : PlayArrowIcon
  const props = { onClick, sx }

  return (
    <>
      {hidden ? null : <ControlComponent {...props} />}
      <audio ref={audioRef}>{getAudioType(stream) && <source src={stream} type={getAudioType(stream) || ''} />}</audio>
    </>
  )
}

const YoutubePlayer = ({ videoId = YOUTUBE_VIDEO_ID }: { videoId?: string }) => {
  const ytPlayerRef = React.useRef<YT.Player>()
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    if (ytPlayerRef.current?.getPlayerState() === 1) audioRef.current?.play()
  })

  React.useEffect(() => {
    if (!audioRef.current) return

    w.onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new YT.Player(YOUTUBE_IFRAME_ID, {
        height: 'auto',
        width: '100%',
        videoId,
        playerVars: {
          playsinline: 1,
          autoplay: 1,
        },
        events: {
          onReady: () => {
            ytPlayerRef.current!.playVideo()
            audioRef.current!.play()
            setIsReady(true)
          },
          onStateChange: () => {
            console.log(ytPlayerRef.current!.getPlayerState())
          },
        },
      })
      delete w.onYouTubeIframeAPIReady
    }

    return () => {
      ytPlayerRef.current?.destroy()
    }
  }, [videoId])

  const urlSearchParams = new URLSearchParams({
    enablejsapi: '1',
    playsinline: '1',
    autoplay: '1',
    origin: location.origin || location.href,
  }).toString()

  const src = `https://www.youtube.com/embed/${videoId}?${urlSearchParams}`

  return (
    <>
      {/* Hidden audio element for providing sound for muted autoplayed youtube video */}
      <AudioPlayer audioRef={audioRef} stream={streams.audio[0]} shouldPlay={isReady} hidden />
      <iframe
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share"
        height="auto"
        id={YOUTUBE_IFRAME_ID}
        src={src}
        title="Rakkauden Wappuradio 2024"
        width="100%"
      />
      <Script src={YOUTUBE_IFRAME_API_URL} />
    </>
  )
}

export const MediaPlayer = ({ stream }: MediaPlayerProps) => {
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
  const flexBasis = `${isVideo ? 100 : 50}%`

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexBasis }}>
      {isVideo ? (
        <YoutubePlayer />
      ) : (
        <AudioPlayer audioRef={audioRef} onClick={toggleShouldPlay} shouldPlay={shouldPlay} stream={stream} />
      )}
    </Box>
  )
}

export default MediaPlayer
