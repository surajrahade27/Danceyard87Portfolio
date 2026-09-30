import { useEffect, useRef } from 'react'
import GradedImage from '../components/common/GradedImage'
import Icon from '../components/common/Icon'
import Magnetic from '../components/common/Magnetic'
import SplitText from '../components/common/SplitText'
import Reveal from '../components/common/Reveal'
import site from '../data/danceyard.json'
import { photo } from '../utils/media'
import styles from './Opportunities.module.css'

// Pinned on wide screens: scrolling down slides the panels sideways.
const PINNED = '(min-width: 960px) and (prefers-reduced-motion: no-preference)'

function Opportunities() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const query = window.matchMedia(PINNED)
    let distance = 0
    let frame = 0
    let lastShift = 0
    let skew = 0

    const measure = () => {
      if (!query.matches) {
        section.style.height = ''
        track.style.transform = ''
        return
      }
      distance = Math.max(track.scrollWidth - window.innerWidth, 0)
      // One pixel of scrolling moves the panels one pixel sideways
      section.style.height = `${window.innerHeight + distance}px`
      update()
    }

    const update = () => {
      frame = 0
      if (!query.matches) return
      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / distance, 0), 1) || 0
      const shift = progress * distance
      // Panels lean into the movement, then ease back upright
      const lean = Math.max(-7, Math.min(7, (shift - lastShift) * 0.15))
      lastShift = shift
      skew += (lean - skew) * 0.2
      track.style.transform = `translate3d(${-shift}px, 0, 0)`
      track.style.setProperty('--skew', `${skew.toFixed(2)}deg`)
      section.style.setProperty('--progress', progress.toFixed(4))
      if (Math.abs(skew) > 0.05) frame = requestAnimationFrame(update)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    query.addEventListener('change', measure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      query.removeEventListener('change', measure)
    }
  }, [])

  return (
    <section id="opportunities" ref={sectionRef} className={styles.section} aria-labelledby="opportunities-title">
      <div className={styles.sticky}>
        <Reveal className={`container ${styles.heading}`}>
          <p className="kicker">Opportunities & exposure</p>
          <h2 id="opportunities-title" className={styles.title}>
            <SplitText text="Your stage" className="neon" /> <SplitText text="is waiting" delay={300} />
          </h2>
        </Reveal>

        <ol ref={trackRef} className={styles.track}>
          {site.opportunities.map((item, i) => (
            <li key={item.title} className={`${styles.panel} reveal-color`}>
              <GradedImage photo={photo(item.photo)} sizes="(min-width: 960px) 44vw, 85vw" className={styles.image} />
              <div className={styles.panelBody}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.icon}>
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
          <li className={`${styles.panel} ${styles.ctaPanel}`}>
            <p className={styles.ctaWord}>Limited admission</p>
            <p>Batches fill fast. Book your spot at Hinjewadi Phase 3.</p>
            <Magnetic>
              <a href="#join" className="btn btn-primary">
                Enroll now
                <Icon name="arrow" />
              </a>
            </Magnetic>
          </li>
        </ol>

        <div className={styles.progress} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}

export default Opportunities
