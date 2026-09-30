import Icon from '../components/common/Icon'
import Magnetic from '../components/common/Magnetic'
import Reveal from '../components/common/Reveal'
import Sparkles from '../components/common/Sparkles'
import styles from './AdmissionBanner.module.css'

function AdmissionBanner() {
  return (
    <section className={styles.banner} aria-labelledby="admission-title">
      <div className={styles.glow} aria-hidden="true" />
      <Sparkles className={styles.sparkles} density={9000} />
      <div className="grain" aria-hidden="true" />
      <Reveal variant="scale" className={`container ${styles.inner}`}>
        <p className="kicker">Admissions open</p>
        <h2 id="admission-title" className={styles.title}>
          <span className="flicker">Limited</span> Admission
        </h2>
        <p className={styles.text}>Batches fill fast. Book your spot at Hinjewadi Phase 3, Pune.</p>
        <Magnetic>
          <a href="#join" className="btn btn-primary">
            Enroll now
            <Icon name="arrow" />
          </a>
        </Magnetic>
      </Reveal>
    </section>
  )
}

export default AdmissionBanner
