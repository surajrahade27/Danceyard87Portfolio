import GradedImage from '../components/common/GradedImage'
import Icon from '../components/common/Icon'
import Magnetic from '../components/common/Magnetic'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { whatsappLink } from '../utils/contact'
import { photo } from '../utils/media'
import { resetPointer, trackPointer } from '../utils/pointer'
import styles from './Choreography.module.css'

const { choreography } = site

function Choreography() {
  return (
    <section id="choreography" className="section" aria-labelledby="choreography-title">
      <div className="container">
        <SectionHeading
          id="choreography-title"
          kicker="Choreography & shoots"
          title={
            <>
              Your big day, <span className="neon">choreographed</span>
            </>
          }
          lead="Weddings, sangeets, corporate shows and school events – we plan the routine around your songs, your people and your date."
        />
      </div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <Reveal variant="clip" className={`${styles.photo} reveal-color`}>
            <GradedImage photo={photo(choreography.photo)} sizes="(min-width: 960px) 36vw, 90vw" />
          </Reveal>
          <Reveal className={styles.cta}>
            <Magnetic>
              <a
                href={whatsappLink("Hi Dance Yard! I'd like to book choreography for an event.")}
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" />
                Book choreography
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <ul className={styles.services}>
          {choreography.services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={(i % 2) * 120} variant={i % 2 ? 'right' : 'up'}>
              <div
                className={`${styles.service} spotlight`}
                onPointerMove={trackPointer}
                onPointerLeave={resetPointer}
              >
                <span className={styles.icon}>
                  <Icon name={service.icon} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Choreography
