'use client'

import { lookup } from 'mime-types'
import { FormEvent, useEffect, useRef, useState } from 'react'

const baseUrl = 'https://stream1.wappuradio.fi' as const

const audioOriginSources = [
  `${baseUrl}/wappuradio.opus`,
  `${baseUrl}/wappuradio.ogg`,
  `${baseUrl}/wappuradio.mp3`,
] as const

const sources = {
  audio: [...audioOriginSources, ...audioOriginSources.map((s) => s.replace(/stream1/, 'stream2'))],
  video: 'https://youtu.be/Iwa6X6BMqKw',
}

const getSourceDescription = (url: string, capitalize = true) => {
  const desc = url.split('.').reverse()[0] || ''
  return capitalize ? desc.replace(/^./, desc[0].toUpperCase()) : desc
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
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const { alternative, source } = formValues
  const { width } = dimensions

  const sourceMimeType = lookup(source) || ''
  const usingVideo = isVideo(source)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!usingVideo && audioRef.current) audioRef.current.src = source
  }, [source, usingVideo])

  useEffect(() => {
    let shouldUpdate = true
    const RESIZE = 'resize'
    const handleResize = () => {
      if (shouldUpdate)
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
    }
    window.addEventListener(RESIZE, handleResize)
    return () => {
      shouldUpdate = false
      window.removeEventListener(RESIZE, handleResize)
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
            {audioOriginSources.map((audioSrc) => (
              <option key={audioSrc} value={audioSrc}>
                Audio: {getSourceDescription(audioSrc)}
              </option>
            ))}
            <option value={sources.video}>Video: YouTube</option>
          </select>
        </label>
        <label className={`flex flex-1 justify-center ${usingVideo ? 'invisible' : ''}`}>
          <input className="mr-4" name="alternative" type="checkbox" defaultChecked={alternative} />
          Alternative stream
        </label>
      </form>
      <div className="flex flex-col flex-auto justify-center items-center text-center">
        <p className="flex">
          Playing (
          {usingVideo ? (
            <a href={source} target="_blank">
              {source}
            </a>
          ) : (
            <a href={source} target="_blank">
              {source}
            </a>
          )}
          )
        </p>
        <div className="flex-auto">
          {usingVideo ? (
            <iframe
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              frameBorder={0}
              height={Math.round(width * 0.5621951219512196)}
              src="https://www.youtube.com/embed/Iwa6X6BMqKw?autoplay=true"
              title="Rakkauden Wappuradio 2024"
              width={width}
            />
          ) : (
            <audio
              className="mt-4"
              onCanPlay={(ev) => {
                ev.currentTarget.play().catch((_err) => {
                  // console.log(_err) // handling autoplay errors
                })
              }}
              ref={audioRef}
              controls
            >
              {sourceMimeType && <source src={source} type={sourceMimeType} />}
              {sources.audio.map((s) => {
                const type = lookup(s) || ''
                return type ? <source key={s} src={s} /> : null
              })}
              Your browser does not support the audio element.
            </audio>
          )}
          <p className={`fixed bottom-4 p-4 text-left w-1/2 ${usingVideo ? 'invisible' : ''}`}>
            By{' '}
            <a href="https://anssi.siren.codes/" target="_blank">
              Anssi Siren
            </a>
            <span className="ml-2">
              (
              <a href="https://github.com/relicode/wappuradio-unofficial-2024" target="_blank">
                Source
              </a>
              )
            </span>
            <br />
            <span>
              Not associated with the{' '}
              <a href="https://github.com/relicode/wappuradio-unofficial-2024" target="_blank">
                official site
              </a>{' '}
              in any mean or way
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}
