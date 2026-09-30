import { useEffect, useState } from 'react'
import { whatsappLink } from '../../utils/contact'
import Icon from '../common/Icon'
import styles from './FloatingActions.module.css'

// Sticky WhatsApp button (desktop) and Enroll / WhatsApp bar (phones).
// Both appear once the visitor scrolls past the hero.
function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const show = visible ? styles.show : ''

  return (
    <>
      <a
        href={whatsappLink()}
        className={`${styles.fab} ${show}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Dance Yard on WhatsApp"
      >
        <Icon name="whatsapp" size={28} />
        <span className={styles.fabLabel}>Chat with us</span>
      </a>

      <div className={`${styles.bar} ${show}`}>
        <a href="/#join" className="btn btn-primary">
          Enroll now
        </a>
        <a href={whatsappLink()} className="btn btn-whatsapp" target="_blank" rel="noreferrer">
          <Icon name="whatsapp" />
          WhatsApp
        </a>
      </div>
    </>
  )
}

export default FloatingActions
