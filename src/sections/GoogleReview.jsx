import Icon from '../components/common/Icon'
import Magnetic from '../components/common/Magnetic'
import Reveal from '../components/common/Reveal'
import Sparkles from '../components/common/Sparkles'
import site from '../data/danceyard.json'
import { directionsUrl } from '../utils/contact'
import { resetPointer, trackPointer } from '../utils/pointer'
import styles from './GoogleReview.module.css'

const { googleReview } = site
const STEPS = ['Open our Google page', 'Tap 5 stars', 'Share your dance story']

// "Rate us on Google" panel under the review carousel. On a laptop the QR is
// scanned with a phone; on a phone it can be tapped, or shown to a friend to scan.
function GoogleReview() {
  return (
    <Reveal id="review" variant="scale" className={styles.panel}>
      <Sparkles className={styles.sparkles} density={14000} />

      <div className={styles.copy}>
        <div className={styles.stars} role="img" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" size={30} fill="currentColor" style={{ '--i': i }} />
          ))}
        </div>
        <h3 className={styles.title}>
          Loved the <span>vibe?</span>
        </h3>
        <p className={styles.text}>
          Tell Pune about it. A quick Google review helps more dancers find the yard, and it takes 30 seconds.
        </p>
        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li key={step}>
              <span>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <div className={styles.actions}>
          <Magnetic>
            <a href={googleReview.url} className="btn btn-primary" target="_blank" rel="noreferrer">
              Write a review
              <Icon name="external" />
            </a>
          </Magnetic>
          <a href={directionsUrl} className="btn btn-ghost" target="_blank" rel="noreferrer">
            Read our reviews
          </a>
        </div>
      </div>

      <div className={styles.qr}>
        <div className={`${styles.qrCard} tilt`} onPointerMove={trackPointer} onPointerLeave={resetPointer}>
          <span className={styles.scan}>Scan me</span>
          <a href={googleReview.url} className={styles.qrLink} target="_blank" rel="noreferrer">
            <img
              src={googleReview.qr}
              alt="QR code: scan or tap to review Dance Yard Studio on Google"
              width="280"
              height="280"
              loading="lazy"
            />
          </a>
          <span className={styles.sticker} aria-hidden="true">
            Takes
            <br />
            30 sec
          </span>
        </div>
      </div>
    </Reveal>
  )
}

export default GoogleReview
