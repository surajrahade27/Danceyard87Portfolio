import CountUp from '../components/common/CountUp'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { resetPointer, trackPointer } from '../utils/pointer'
import styles from './WhyUs.module.css'

function WhyUs() {
  return (
    <section id="why" className="section section-raised" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading
          id="why-title"
          kicker="Why Dance Yard"
          title={
            <>
              Built for the <span className="neon">spotlight</span>
            </>
          }
          lead="Everything at Dance Yard points one way: getting you ready for real stages, real cameras and real auditions."
        />

        <ul className={styles.bento}>
          {site.why.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90} className={item.big ? styles.big : undefined}>
              <div
                className={`${styles.card} tilt spotlight`}
                onPointerMove={trackPointer}
                onPointerLeave={resetPointer}
              >
                {item.stat ? (
                  <p className={styles.stat}>
                    <CountUp value={item.stat} />
                  </p>
                ) : (
                  <span className={styles.icon}>
                    <Icon name={item.icon} />
                  </span>
                )}
                <h3>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WhyUs
