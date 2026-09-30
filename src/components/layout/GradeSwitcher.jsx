import { useSyncExternalStore } from 'react'
import { GRADES, applyGrade, currentGrade, subscribeGrade } from '../../utils/grade'
import styles from './GradeSwitcher.module.css'

// Three colour grades for the whole site: Neon (brochure look), Cinematic, Noir.
function GradeSwitcher({ compact = false, className = '' }) {
  // Read from <html data-grade>, so every switcher on the page stays in sync
  const grade = useSyncExternalStore(subscribeGrade, currentGrade)

  const choose = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect()
    applyGrade(id, rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  return (
    <div
      className={`${styles.switcher} ${compact ? styles.compact : ''} ${className}`}
      role="group"
      aria-label="Colour grade"
    >
      {GRADES.map((g) => (
        <button
          key={g.id}
          type="button"
          className={styles.option}
          aria-pressed={grade === g.id}
          title={`${g.label} grade`}
          style={{ '--a': g.swatch[0], '--b': g.swatch[1] }}
          onClick={(e) => choose(e, g.id)}
        >
          <span className={styles.swatch} aria-hidden="true" />
          <span className={styles.label}>{g.label}</span>
        </button>
      ))}
    </div>
  )
}

export default GradeSwitcher
