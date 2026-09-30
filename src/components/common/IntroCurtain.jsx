import { useEffect, useState } from 'react'
import { reducedMotion } from '../../utils/motion'
import Logo from './Logo'
import styles from './IntroCurtain.module.css'

const STORAGE_KEY = 'dy-intro-seen'
const OPEN_AT = 1400
const DONE_AT = 2500

function firstVisitThisSession() {
  try {
    return !sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return false
  }
}

// Homepage only, once per browser session. While it plays, <html> has
// .is-intro so the hero holds its entrance animations until the curtains open.
const PLAY = !reducedMotion && window.location.pathname === '/' && firstVisitThisSession()
if (PLAY) document.documentElement.classList.add('is-intro')

const release = () => document.documentElement.classList.remove('is-intro')

// Neon logo flickers on, then stage curtains open onto the hero.
function IntroCurtain() {
  const [phase, setPhase] = useState(PLAY ? 'closed' : 'done')

  useEffect(() => {
    if (!PLAY) return
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // No storage: the intro plays again next visit
    }
    const open = setTimeout(() => {
      setPhase('open')
      release()
    }, OPEN_AT)
    const done = setTimeout(() => setPhase('done'), DONE_AT)
    return () => {
      clearTimeout(open)
      clearTimeout(done)
    }
  }, [])

  if (phase === 'done') return null

  const skip = () => {
    release()
    setPhase('done')
  }

  return (
    <div className={`${styles.intro} ${phase === 'open' ? styles.open : ''}`} onClick={skip} aria-hidden="true">
      <span className={`${styles.curtain} ${styles.left}`} />
      <span className={`${styles.curtain} ${styles.right}`} />
      <div className={styles.center}>
        <span className={styles.logo}>
          <Logo />
        </span>
        <span className={styles.bars}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}
        </span>
      </div>
    </div>
  )
}

export default IntroCurtain
