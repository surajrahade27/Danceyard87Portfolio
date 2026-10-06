import site from '../../data/danceyard.json'
import { addressLine, phoneLink, whatsappLink } from '../../utils/contact'
import { allPhotos, unsplashPage } from '../../utils/media'
import Icon from '../common/Icon'
import Logo from '../common/Logo'
import styles from './Footer.module.css'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'classes', label: 'Classes' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'choreography', label: 'Choreography' },
  { id: 'videos', label: 'Videos' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'events', label: 'Events' },
  { id: 'faq', label: 'FAQ' },
]

const YEAR = new Date().getFullYear()

// Set at build time in vite.config.js: package.json version + git commit
const VERSION = `v${__APP_VERSION__} (${__COMMIT__})`

// One credit per photographer, for the sample photos from Unsplash
const credits = [...new Map(allPhotos.map((p) => [p.credit, p])).values()]

function Footer() {
  const { contact } = site

  return (
    <footer className={styles.footer}>
      <p className={styles.bigWord} aria-hidden="true">
        Dance Yard
      </p>

      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo />
          <p>{site.footer.blurb}</p>
          <div className={styles.socials}>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <Icon name="whatsapp" />
            </a>
            {contact.instagram && (
              <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram ${contact.instagramHandle}`}>
                <Icon name="instagram" />
              </a>
            )}
          </div>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore">Explore</h2>
          <ul>
            {LINKS.map((link) => (
              <li key={link.id}>
                <a href={`/#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Classes</h2>
          <ul>
            {site.programs.map((p) => (
              <li key={p.name}>
                <a href="/#classes">{p.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul className={styles.contact}>
            <li>
              <Icon name="pin" size={18} />
              <span>{addressLine}</span>
            </li>
            <li>
              <Icon name="whatsapp" size={18} />
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                {contact.whatsappDisplay} (WhatsApp only)
              </a>
            </li>
            <li>
              <Icon name="phone" size={18} />
              <a href={phoneLink}>{contact.phoneDisplay}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {YEAR} {site.name}. All rights reserved.
        </p>
        <p className={styles.legal}>
          <a href="/privacy">Privacy policy</a>
          <span>Sample videos from YouTube</span>
          <span>{VERSION}</span>
        </p>
      </div>

      <details className={`container ${styles.credits}`}>
        <summary>Sample photos from Unsplash – credits</summary>
        <p>
          {credits.map((p, i) => (
            <span key={p.credit}>
              <a href={unsplashPage(p.slug)} target="_blank" rel="noreferrer">
                {p.credit}
              </a>
              {i < credits.length - 1 && ', '}
            </span>
          ))}
        </p>
      </details>
    </footer>
  )
}

export default Footer
