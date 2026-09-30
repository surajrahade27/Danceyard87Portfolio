import styles from './Logo.module.css'

// Text version of the brochure logo: boxed "DANCE YARD" over "STUDIO".
// Swap for the real SVG once the client sends it.
function Logo({ className = '' }) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <span className={styles.word}>Dance Yard</span>
      <span className={styles.sub}>Studio</span>
    </span>
  )
}

export default Logo
