import { useEffect, useState } from 'react'
import CountUp from '../components/common/CountUp'
import GradedImage from '../components/common/GradedImage'
import Icon from '../components/common/Icon'
import Magnetic from '../components/common/Magnetic'
import Sparkles from '../components/common/Sparkles'
import SplitText from '../components/common/SplitText'
import { useVideoPlayer } from '../context/VideoContext'
import site from '../data/danceyard.json'
import { photo } from '../utils/media'
import { finePointer, reducedMotion } from '../utils/motion'
import { resetPointer, trackPointer } from '../utils/pointer'
import styles from './Hero.module.css'

const SLIDE_MS = 6000
const slides = site.hero.slides.map(photo)
const showreel = site.videos.find((v) => v.id === site.hero.showreel)

function Hero() {
  const playVideo = useVideoPlayer()
  const [slide, setSlide] = useState(0)

  // Cross-fade through the hero photos
  useEffect(() => {
    if (reducedMotion) return
    const timer = setInterval(() => setSlide((s) => (s + 1) % slides.length), SLIDE_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-title"
      onPointerMove={finePointer ? trackPointer : undefined}
      onPointerLeave={finePointer ? resetPointer : undefined}
    >
      <div className={styles.slides} aria-hidden="true">
        {slides.map((p, i) => (
          <div key={p.id} className={`${styles.slide} ${i === slide ? styles.active : ''}`}>
            <GradedImage photo={p} eager={i === 0} className={styles.slideImage} />
          </div>
        ))}
      </div>
      <div className={styles.beams} aria-hidden="true">
        <span />
        <span />
      </div>
      <Sparkles className={styles.sparkles} />
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} />
          {site.hero.eyebrow}
        </p>

        <h1 id="hero-title" className={styles.title}>
          <SplitText text="Dance" className={styles.line} />{' '}
          <SplitText text="Yard" delay={260} className={`${styles.line} outline-text flicker`} />
        </h1>

        <p className={styles.lead}>{site.hero.lead}</p>

        <div className={styles.actions}>
          <Magnetic>
            <a href="#join" className="btn btn-primary">
              Enroll now
              <Icon name="arrow" />
            </a>
          </Magnetic>
          <button
            type="button"
            className={`btn btn-ghost ${styles.play}`}
            data-cursor="Play"
            onClick={() => playVideo(showreel)}
          >
            <span className={styles.playIcon}>
              <Icon name="play" size={16} />
            </span>
            Watch showreel
          </button>
        </div>

        <dl className={styles.stats}>
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.slideDots} aria-hidden="true">
        {slides.map((p, i) => (
          <span key={p.id} className={i === slide ? styles.dotActive : undefined} />
        ))}
      </div>

      <div className={styles.equalizer} aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>

      <a href="#about" className={styles.scrollCue}>
        Scroll
        <span />
      </a>
    </section>
  )
}

export default Hero
