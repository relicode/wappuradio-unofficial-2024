'use client'

import { lookup } from 'mime-types'
import { FormEvent, useEffect, useRef, useState } from 'react'

const sources = {
  audio: [
    'https://stream1.wappuradio.fi/wappuradio.opus',
    'https://stream1.wappuradio.fi/wappuradio.ogg',
    'https://stream1.wappuradio.fi/wappuradio.mp3',
  ] as const,
  video: 'https://youtu.be/Iwa6X6BMqKw',
}

const sourceDescriptions = {
  [sources.audio[0]]: 'Opus',
  [sources.audio[1]]: 'Ogg',
  [sources.audio[2]]: 'Mp3',
}

interface FormEventTarget extends EventTarget {
  form: HTMLFormElement
}

type FormValues = {
  source: string
  alternative: boolean
}

const isVideo = (source: string) => source === sources.video

const parseFormValues = (ev?: FormEvent<HTMLFormElement>): FormValues => {
  if (!ev)
    return {
      source: sources.audio[0],
      alternative: false,
    }

  const { form } = ev.target as FormEventTarget
  const rawValues = Object.fromEntries(new FormData(form).entries())

  const alternative = !!rawValues.alternative
  const rawSource = typeof rawValues.source === 'string' ? rawValues.source : ''
  const source = !isVideo(rawSource) && alternative ? rawSource.replace(/stream1/, 'stream2') : rawSource

  return { alternative, source }
}

export default function Home() {
  const [formValues, setFormValues] = useState(parseFormValues())
  const [_, setUpdated] = useState(Date.now())
  const { alternative, source } = formValues

  const usingVideo = isVideo(source)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!usingVideo && audioRef.current) {
      const audioElem = audioRef.current
      audioElem.src = source
      if (!audioElem.paused) audioElem.play()
    }
  }, [source, usingVideo])

  useEffect(() => {
    const handleResize = () => setUpdated(Date.now())
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main className="flex flex-col">
      <form
        className="flex gap-4 p-4"
        onChange={(ev) => {
          setFormValues(parseFormValues(ev))
        }}
        onSubmit={(ev) => ev.preventDefault()}
      >
        <label className="flex flex-1 justify-center">
          <select name="source" defaultValue={source}>
            {sources.audio.map((audioSrc) => (
              <option key={audioSrc} value={audioSrc}>
                Audio: {sourceDescriptions[audioSrc]}
              </option>
            ))}
            <option value={sources.video}>Video: YouTube</option>
          </select>
        </label>
        <label className={`flex flex-1 justify-center ${usingVideo ? 'invisible' : ''}`}>
          <input name="alternative" type="checkbox" defaultChecked={alternative} />
          &nbsp;Alternative stream
        </label>
      </form>
      <div className="flex flex-col flex-auto justify-center items-center text-center">
        <p className="flex">
          {usingVideo ? (
            <span>
              Playing{' '}
              <a href={source} target="_blank">
                {source}
              </a>
            </span>
          ) : (
            <span>
              Playing {lookup(source)} (
              <a href={source} target="_blank">
                {source}
              </a>
              )
            </span>
          )}
        </p>
        <div className={`flex flex-auto ${usingVideo ? 'items-start' : 'items-center p-4'}`}>
          {usingVideo ? (
            <iframe
              width={window.innerWidth}
              height={Math.round(window.innerWidth * 0.5621951219512196)}
              src="https://www.youtube.com/embed/Iwa6X6BMqKw?autoplay=true"
              title="Rakkauden Wappuradio 2024"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col">
              <audio
                onCanPlay={(ev) => {
                  ev.currentTarget.play().catch((_err) => {
                    // console.log(_err) // handling autoplay errors
                  })
                }}
                ref={audioRef}
                controls
              >
                <source src={source} type={lookup(source) || ''} />
                <source src="https://stream1.wappuradio.fi/wappuradio.opus" type="audio/opus" />
                <source src="https://stream2.wappuradio.fi/wappuradio.opus" type="audio/opus" />
                <source src="https://stream1.wappuradio.fi/wappuradio.ogg" type="audio/ogg" />
                <source src="https://stream2.wappuradio.fi/wappuradio.ogg" type="audio/ogg" />
                <source src="https://stream1.wappuradio.fi/wappuradio.mp3" type="audio/mpeg" />
                <source src="https://stream2.wappuradio.fi/wappuradio.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p>
                {`By `}
                <a href="https://anssi.siren.codes/" target="_blank">
                  Anssi Siren
                </a>
                <span className="ml-4">
                  (
                  <a href="https://github.com/relicode/wappuradio-unofficial-2024" target="_blank">
                    Source
                  </a>
                  )
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
