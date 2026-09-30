import { useEffect, useRef } from 'react'
import { photoUrl, unsplashPage } from '../../utils/media'
import Dialog from './Dialog'
import Icon from './Icon'
import styles from './Lightbox.module.css'

const SIZE = 1800

// Full-screen photo viewer: arrow keys, on-screen buttons or a swipe move
// between photos; Escape or the close button exits.
function Lightbox({ photos, index, onChange, onClose }) {
  const startX = useRef(null)
  const count = photos.length
  const photo = photos[index]
  const go = (step) => onChange((index + step + count) % count)

  // Preload the neighbours so next/previous feel instant
  useEffect(() => {
    for (const step of [1, -1]) {
      const img = new Image()
      img.src = photoUrl(photos[(index + step + count) % count].id, SIZE)
    }
  }, [index, count, photos])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const onPointerDown = (e) => {
    startX.current = e.clientX
  }

  const onPointerUp = (e) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  return (
    <Dialog label="Photo viewer" onClose={onClose} className={styles.dialog} onKeyDown={onKeyDown}>
      <div
        className={styles.stage}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <img key={photo.id} className={styles.image} src={photoUrl(photo.id, SIZE)} alt={photo.alt} draggable={false} />
      </div>

      <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous photo">
        <Icon name="chevronLeft" />
      </button>
      <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label="Next photo">
        <Icon name="chevronRight" />
      </button>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close photo viewer">
        <Icon name="close" />
      </button>

      <div className={styles.caption}>
        <p>
          <strong>{photo.caption}</strong>
          <span className={styles.counter}>
            {index + 1} / {count}
          </span>
        </p>
        <p className={styles.credit}>
          Photo:{' '}
          <a href={unsplashPage(photo.slug)} target="_blank" rel="noreferrer">
            {photo.credit} on Unsplash
          </a>
        </p>
      </div>
    </Dialog>
  )
}

export default Lightbox
