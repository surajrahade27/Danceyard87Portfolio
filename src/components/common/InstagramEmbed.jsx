import { useEffect, useRef, useState } from 'react'
import { INSTAGRAM_ORIGIN, instagramEmbed } from '../../utils/media'

// Instagram post or reel in an iframe. The embed reports its content height
// with a MEASURE message, so the iframe grows to fit instead of scrolling.
// Instagram decides per post whether it plays here; the rest show "Watch on Instagram".
function InstagramEmbed({ code, title, className = '' }) {
  const ref = useRef(null)
  const [height, setHeight] = useState(720)

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== INSTAGRAM_ORIGIN || e.source !== ref.current?.contentWindow) return
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        if (data?.type === 'MEASURE' && data.details?.height > 0) setHeight(Math.ceil(data.details.height))
      } catch {
        // Not one of the embed's messages
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className={className}>
      <iframe
        ref={ref}
        src={instagramEmbed(code)}
        title={title}
        height={height}
        scrolling="no"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}

export default InstagramEmbed
