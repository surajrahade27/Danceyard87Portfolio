import { useEffect, useState } from 'react'
import Icon from '../components/common/Icon'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { reducedMotion } from '../utils/motion'
import styles from './Testimonials.module.css'

const AUTOPLAY_MS = 7000
const items = site.testimonials

// One quote at a time. Advances on its own unless hovered, focused or the
// visitor prefers reduced motion.
function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const autoplay = !reducedMotion && !paused

  useEffect(() => {
    if (!autoplay) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % items.length), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [index, autoplay])

  const go = (step) => setIndex((i) => (i + step + items.length) % items.length)
  const item = items[index]

  return (
    <section
      id="testimonials"
      className="section"
      aria-labelledby="testimonials-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <SectionHeading
          id="testimonials-title"
          kicker="Reviews"
          center
          title={
            <>
              Loved by <span className="neon">students & parents</span>
            </>
          }
          lead={site.testimonialsNote}
        />

        <div className={styles.carousel} aria-roledescription="carousel" aria-label="Reviews">
          <figure key={index} className={styles.quote} aria-live={autoplay ? 'off' : 'polite'}>
            <Icon name="quote" size={44} className={styles.mark} />
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <strong>{item.who}</strong> · {item.detail}
            </figcaption>
          </figure>

          <div className={styles.controls}>
            <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Previous review">
              <Icon name="chevronLeft" />
            </button>
            <div className={styles.dots}>
              {items.map((t, i) => (
                <button
                  key={t.quote}
                  type="button"
                  className={`${styles.dot} ${autoplay ? styles.running : ''}`}
                  aria-label={`Show review ${i + 1} of ${items.length}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                >
                  <span />
                </button>
              ))}
            </div>
            <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Next review">
              <Icon name="chevronRight" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
