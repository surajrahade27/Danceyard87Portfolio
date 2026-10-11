import CountUp from '../components/common/CountUp'
import GradedImage from '../components/common/GradedImage'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { photo } from '../utils/media'
import styles from './About.module.css'

const { about } = site
const [sidePhoto] = about.photos.slice(1).map(photo)

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media}>
          <Reveal variant="clip" className={styles.main}>
            <div className={styles.portraitFallback} aria-hidden="true">ND</div>
            <img
              src={about.owner.photo}
              alt={`Portrait of ${about.owner.name}`}
              className={styles.portrait}
              onError={(event) => { event.currentTarget.hidden = true }}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <Reveal variant="clip" delay={250} className={styles.side}>
            <GradedImage photo={sidePhoto} sizes="(min-width: 960px) 18vw, 40vw" />
          </Reveal>

          {/* Spinning badge with the years of experience in the middle */}
          <div className={styles.badge} aria-hidden="true">
            <svg viewBox="0 0 200 200" className={styles.ring}>
              <defs>
                <path id="badge-circle" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="470">
                  LIMITED ADMISSION • DANCE YARD STUDIO •
                </textPath>
              </text>
            </svg>
            <span className={styles.badgeCore}>
              <strong>
                <CountUp value="20+" />
              </strong>
              years
            </span>
          </div>
        </div>

        <div>
          <SectionHeading
            compact
            id="about-title"
            kicker="Meet the Founder and Dance Visionary"
            title={
              <>
                {about.owner.name} <span className="neon">{about.owner.role}</span>
              </>
            }
          />
          <p className={styles.experience}>{about.owner.experience} in dance</p>
          {about.owner.paragraphs.map((text, i) => (
            <Reveal as="p" key={i} delay={i * 100} className={styles.text}>
              {text}
            </Reveal>
          ))}
          <Reveal delay={250} className={styles.mission}>
            <h3>Our mission</h3>
            <p>{about.mission}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
