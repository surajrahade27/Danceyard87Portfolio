import GradedImage from '../components/common/GradedImage'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { whatsappLink } from '../utils/contact'
import { photo } from '../utils/media'
import styles from './Events.module.css'

function Events() {
  return (
    <section id="events" className="section section-raised" aria-labelledby="events-title">
      <div className="container">
        <SectionHeading
          id="events-title"
          kicker="Events & workshops"
          title={
            <>
              On stage <span className="neon">next</span>
            </>
          }
          lead="Annual Day, masterclasses and shoot days. Dates are announced on WhatsApp first."
        />

        <ul className={styles.list}>
          {site.events.map((event, i) => (
            <Reveal as="li" key={event.title} delay={i * 120}>
              <article className={`${styles.card} reveal-color`}>
                <GradedImage
                  photo={photo(event.photo)}
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className={styles.image}
                />
                <div className={styles.body}>
                  <p className={styles.meta}>
                    <span className={styles.type}>{event.type}</span>
                    <span className={styles.when}>
                      <Icon name="calendar" size={16} />
                      {event.when}
                    </span>
                  </p>
                  <h3>{event.title}</h3>
                  <p className={styles.text}>{event.text}</p>
                  <a
                    href={whatsappLink(`Hi Dance Yard! Please share details about: ${event.title}`)}
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get details
                    <Icon name="arrow" size={18} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Events
