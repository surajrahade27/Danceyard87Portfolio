import { useEffect, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import site from '../../data/danceyard.json'
import { whatsappLink } from '../../utils/contact'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import GradeSwitcher from './GradeSwitcher'
import styles from './Header.module.css'

// Homepage sections. Links start with "/" so they also work from other pages.
const NAV = [
  { id: 'about', label: 'About' },
  { id: 'classes', label: 'Classes' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'choreography', label: 'Choreography' },
  { id: 'videos', label: 'Videos' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = NAV.map((item) => item.id)
const { instagram } = site.contact

function Header({ overHero }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  // Fixed on every page; turns solid once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu with Escape; stop the page scrolling behind it
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open || !overHero
  const current = scrolled ? active : null
  const close = () => setOpen(false)

  return (
    <>
      <header
        className={`${styles.header} ${solid ? styles.solid : ''}`}
      >
        <span className={styles.progress} aria-hidden="true" />
        <div className={`container ${styles.inner}`}>
          <a href="/#top" className={styles.logo} aria-label="Dance Yard Studio – home" onClick={close}>
            <Logo />
          </a>

          <nav className={styles.desktopNav} aria-label="Main">
            <ul>
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className={current === item.id ? styles.active : undefined}
                    aria-current={current === item.id ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <GradeSwitcher compact className={styles.grades} />
            {instagram && (
              <a
                href={instagram}
                className={styles.social}
                target="_blank"
                rel="noreferrer"
                aria-label={`Dance Yard on Instagram (${site.contact.instagramHandle})`}
              >
                <Icon name="instagram" size={20} />
              </a>
            )}
            <a href="/#join" className={`btn btn-primary ${styles.cta}`}>
              Enroll now
            </a>
            <button
              type="button"
              className={styles.menuButton}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`${styles.menu} ${open ? styles.menuOpen : ''}`} inert={!open}>
        <nav aria-label="Mobile">
          <ul>
            {[...NAV, { id: 'join', label: 'Enroll now' }].map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a href={`/#${item.id}`} onClick={close}>
                  <span className={styles.menuIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.menuFooter}>
          <GradeSwitcher />
          <div className={styles.menuLinks}>
            <a href={whatsappLink()} className="btn btn-whatsapp" target="_blank" rel="noreferrer">
              <Icon name="whatsapp" />
              WhatsApp us
            </a>
            {instagram && (
              <a href={instagram} className="btn btn-ghost" target="_blank" rel="noreferrer">
                <Icon name="instagram" />
                {site.contact.instagramHandle}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
