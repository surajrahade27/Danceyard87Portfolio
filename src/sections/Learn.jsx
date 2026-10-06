import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import styles from './Learn.module.css'

function Learn() {
  return (
    <section id="learn" className="section" aria-labelledby="learn-title">
      <div className="container">
        <SectionHeading
          id="learn-title"
          kicker="What you learn"
          center
          title={
            <>
              From first step to <span className="neon">dance class routine</span>
            </>
          }
        />

        <Reveal as="ol" className={styles.steps}>
          {site.learn.map((step, i) => (
            <li key={step.title} className={styles.step} style={{ '--i': i }}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.icon}>
                <Icon name={step.icon} size={28} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default Learn
