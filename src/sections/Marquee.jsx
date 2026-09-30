import { useEffect, useRef } from 'react'
import { reducedMotion } from '../utils/motion'
import styles from './Marquee.module.css'

const BASE_SPEED = 55 // px per second when the page is still
const BOOST = 14 // extra px/s per unit of scroll velocity
const MAX_SKEW = 9 // degrees

// Two taped-on ribbons scrolling in opposite directions. Scrolling the page
// speeds them up and leans them; scrolling up reverses both.
function Marquee({ rows }) {
  const sectionRef = useRef(null)
  const trackRefs = useRef([])

  useEffect(() => {
    if (reducedMotion) return
    const tracks = trackRefs.current
    const offsets = tracks.map(() => 0)
    let visible = false
    let frame = 0
    let last = 0
    let lastY = window.scrollY
    let velocity = 0
    let direction = 1

    const tick = (now) => {
      frame = 0
      if (!visible) return
      const dt = last ? Math.min(now - last, 50) / 1000 : 0
      last = now
      velocity *= 0.9
      const speed = BASE_SPEED + velocity * BOOST
      const skew = Math.min(velocity * 0.35, MAX_SKEW)
      tracks.forEach((track, i) => {
        const half = track.scrollWidth / 2
        const dir = (i % 2 ? -1 : 1) * direction
        let x = offsets[i] - dir * speed * dt
        if (x <= -half) x += half
        if (x > 0) x -= half
        offsets[i] = x
        track.style.transform = `translate3d(${x}px, 0, 0) skewX(${(-dir * skew).toFixed(2)}deg)`
      })
      frame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      if (dy) direction = dy > 0 ? 1 : -1
      velocity = Math.min(velocity + Math.abs(dy) * 0.4, 60)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) {
        last = 0
        frame = requestAnimationFrame(tick)
      }
    })
    observer.observe(sectionRef.current)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.marquee} aria-label="Dance styles and opportunities">
      {rows.map((items, r) => (
        <div key={r} className={styles.row}>
          <ul ref={(el) => (trackRefs.current[r] = el)} className={styles.track}>
            {/* The list is repeated once so the loop is seamless */}
            {[...items, ...items].map((item, i) => (
              <li
                key={i}
                className={i % 2 ? styles.outline : undefined}
                aria-hidden={i >= items.length || undefined}
              >
                {item}
                <span className={styles.star} aria-hidden="true">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default Marquee
