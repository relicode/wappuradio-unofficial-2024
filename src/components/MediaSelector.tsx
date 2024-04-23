'use client'
import * as React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectProps } from '@mui/material'
import { getStreamDescription, isAltAudioStream, isVideoStream } from '@/utils'
import type { Streams } from '@/utils/config'

export type MediaSelectorProps = {
  currentStream?: string
  onChange?: SelectProps<string>['onChange']
  streams: Streams
}

const MediaSelector = ({ onChange, streams, currentStream }: MediaSelectorProps) => (
  <Box sx={{ flexGrow: 1 }}>
    <Paper sx={{ padding: 2, textAlign: 'center' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Playing now</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentStream || streams.audio[0]}
          label="Playing now"
          onChange={onChange}
        >
          {[...streams.audio, ...streams.video].map((s) => (
            <MenuItem key={s} value={s}>
              {isVideoStream(s) ? 'Video' : `Audio: ${getStreamDescription(s)}`}
              {isAltAudioStream(s) && ' (alternative stream)'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  </Box>
)

export default MediaSelector
