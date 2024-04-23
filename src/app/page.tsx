'use client'
import * as React from 'react'
import MediaSelector from '@/components/MediaSelector'

import { streams } from '@/utils/config'
import MediaPlayer from '@/components/MediaPlayer'

const defaultStream = streams.audio[0]

const Home = () => {
  const [currentStream, setCurrentStream] = React.useState<string>(defaultStream)

  return (
    <>
      <MediaSelector
        currentStream={currentStream}
        streams={streams}
        onChange={(ev) => {
          setCurrentStream(ev.target.value)
        }}
      />

      <MediaPlayer stream={currentStream} />
    </>
  )
}

export default Home
