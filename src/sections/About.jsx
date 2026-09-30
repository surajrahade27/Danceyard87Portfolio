import CountUp from '../components/common/CountUp'
import GradedImage from '../components/common/GradedImage'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { photo } from '../utils/media'
import styles from './About.module.css'

const { about } = site
const [mainPhoto, sidePhoto] = about.photos.map(photo)

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media}>
          <Reveal variant="clip" className={styles.main}>
            <GradedImage photo={mainPhoto} sizes="(min-width: 960px) 40vw, 90vw" className="parallax" />
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
            kicker="About us"
            title={
              <>
                Where passion <span className="neon">turns pro</span>
              </>
            }
          />
          {about.paragraphs.map((text, i) => (
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
