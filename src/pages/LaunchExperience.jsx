import { useEffect, useState } from 'react'
import Icon from '../components/common/Icon'
import Logo from '../components/common/Logo'
import { photo, photoSrcSet, photoUrl } from '../utils/media'
import { reducedMotion } from '../utils/motion'
import styles from './LaunchExperience.module.css'

const LAUNCH_AT = Date.parse('2026-10-11T13:00:00+05:30')

const stage = photo('crewStage')
const units = [
  ['days', 86400000],
  ['hours', 3600000, 24],
  ['minutes', 60000, 60],
  ['seconds', 1000, 60],
]
const colors = ['#a9ff57', '#ff58a9', '#ffe26c', '#61e7f0', '#ffffff']
const confetti = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 73 + 17) % 100}%`,
  delay: `${(index * 19 % 16) / 10}s`,
  duration: `${2.6 + (index % 6) * 0.35}s`,
  drift: `${(index % 2 ? 1 : -1) * (30 + index % 5 * 18)}px`,
  color: colors[index % colors.length],
}))

function LaunchExperience({ onEnter }) {
  const [now, setNow] = useState(Date.now)
  const launched = now >= LAUNCH_AT

  useEffect(() => {
    if (launched) return undefined
    const tick = () => setNow(Date.now())
    const timer = window.setInterval(tick, 1000)
    document.addEventListener('visibilitychange', tick)
    window.addEventListener('focus', tick)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', tick)
      window.removeEventListener('focus', tick)
    }
  }, [launched])

  const remaining = Math.max(0, LAUNCH_AT - now)
  const countdown = units.map(([label, milliseconds, modulo]) => {
    const value = Math.floor(remaining / milliseconds)
    return { label, value: String(modulo ? value % modulo : value).padStart(2, '0') }
  })

  return (
    <main className={`${styles.page} ${launched ? styles.live : ''}`}>
      <div className={styles.photo} aria-hidden="true">
        <img
          src={photoUrl(stage.id, 1600)}
          srcSet={photoSrcSet(stage.id)}
          sizes="100vw"
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className={styles.wash} aria-hidden="true" />
      {launched && !reducedMotion && (
        <>
          <div className={styles.confetti} aria-hidden="true">
            {confetti.map((piece, index) => (
              <span key={index} style={{
                '--left': piece.left,
                '--delay': piece.delay,
                '--duration': piece.duration,
                '--drift': piece.drift,
                '--piece-color': piece.color,
              }} />
            ))}
          </div>
          <div className={styles.partyPop} aria-hidden="true">It's official! <strong>Let's dance.</strong></div>
        </>
      )}

      <div className={styles.shell}>
        <header className={styles.header}>
          <Logo />
          <span className={styles.headerNote}><span className={styles.pulse} /> {launched ? 'Now live' : 'A new stage is coming'}</span>
        </header>

        <div className={styles.content} key={launched ? 'live' : 'waiting'}>
          <p className={styles.eyebrow}>{launched ? 'The doors are open  /  11.10.26' : 'The countdown is on  /  11.10.26'}</p>
          {launched ? (
            <>
              <h1>Welcome to<br /><span>your stage.</span></h1>
              <p className={styles.lead}>The music is on. The floor is yours. Welcome to Dance Yard Studio.</p>
              <blockquote className={styles.quote}>"Every great move starts with showing up."</blockquote>
              <div className={styles.steps} aria-label="Your next steps">
                <span><b>01</b> Explore the classes</span>
                <span><b>02</b> Meet your crew</span>
                <span><b>03</b> Find your place on the floor</span>
              </div>
              <button className={styles.enter} type="button" onClick={onEnter}>
                Enter Dance Yard <Icon name="arrow" size={20} />
              </button>
            </>
          ) : (
            <>
              <h1>Something<br /><span>is moving.</span></h1>
              <p className={styles.lead}>A new home for rhythm, expression and everything that moves you. We open 11 October.</p>
              <div className={styles.countdown} role="timer" aria-label="Time until Dance Yard Studio launches">
                {countdown.map(({ label, value }) => (
                  <div className={styles.unit} key={label}>
                    <span className={styles.digits}>{value}</span>
                    <span className={styles.unitLabel}>{label}</span>
                  </div>
                ))}
              </div>
              <p className={styles.date}>Sunday, 11 October 2026 <span aria-hidden="true">/</span> 1:00 PM IST</p>
            </>
          )}
        </div>

        <footer className={styles.footer}>
          <span>Hinjewadi Phase 3, Pune</span>
          <span className={styles.footerRight}>Move with us <span aria-hidden="true">✳</span> <a href="/privacy">Privacy</a></span>
        </footer>
      </div>
    </main>
  )
}

export default LaunchExperience