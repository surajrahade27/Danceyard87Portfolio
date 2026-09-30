import { useState } from 'react'
import { youtubeThumb } from '../../utils/media'

// YouTube's HD thumbnail, falling back to the smaller one for videos that
// don't have it (YouTube then returns a 120px grey placeholder).
function YouTubeThumb({ id, alt = '' }) {
  const [quality, setQuality] = useState('maxresdefault')
  const fallBack = () => quality !== 'hqdefault' && setQuality('hqdefault')

  return (
    <img
      src={youtubeThumb(id, quality)}
      alt={alt}
      width="1280"
      height="720"
      loading="lazy"
      decoding="async"
      onLoad={(e) => e.currentTarget.naturalWidth <= 120 && fallBack()}
      onError={fallBack}
    />
  )
}

export default YouTubeThumb
