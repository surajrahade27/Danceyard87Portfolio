import GradedImage from '../components/common/GradedImage'
import Reveal from '../components/common/Reveal'
import site from '../data/danceyard.json'
import { photo } from '../utils/media'
import styles from './Mentors.module.css'

const { mentors } = site
const NAME_COLOURS = ['var(--accent-2)', 'var(--accent-4)', 'var(--accent-3)']

// Wraps each choreographer's name in a coloured span, like the brochure.
function highlightNames(text) {
  const pattern = new RegExp(`(${mentors.names.join('|')})`)
  return text.split(pattern).map((part, i) => {
    const index = mentors.names.indexOf(part)
    if (index === -1) return part
    return (
      <span key={i} className={styles.name} style={{ '--c': NAME_COLOURS[index % NAME_COLOURS.length] }}>
        {part}
      </span>
    )
  })
}

function Mentors() {
  return (
    <section id="mentors" className="section section-raised" aria-labelledby="mentors-title">
      <div className={`container ${styles.grid}`}>
        <Reveal variant="clip" className={styles.media}>
          <GradedImage photo={photo(mentors.photo)} sizes="(min-width: 960px) 40vw, 90vw" className="parallax" />
          <p className={styles.route} aria-hidden="true">
            Mumbai <span>→</span> Pune
          </p>
        </Reveal>

        <div>
          <Reveal className="heading-compact">
            <p className="kicker">Mentors</p>
            <h2 id="mentors-title" className="section-title">
              Get trained & mentored by <span className="neon">professional choreographers</span>
            </h2>
          </Reveal>
          <p className={styles.statement}>
            <span className="fill-on-scroll">{highlightNames(mentors.statement)}</span>
          </p>
          <Reveal as="p" className={styles.detail}>
            {mentors.detail}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Mentors
