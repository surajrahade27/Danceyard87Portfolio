import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'

const DURATION = 1600
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Animates a stat like "50,000+" or "99%" from 0 when it scrolls into view.
function CountUp({ value }) {
  const [, prefix, digits, suffix] = value.match(/^(\D*)([\d,]+)(.*)$/) ?? []
  const target = digits ? Number(digits.replace(/,/g, '')) : null
  const [ref, inView] = useInView({ threshold: 0.5 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView || target === null || reducedMotion) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCurrent(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  if (target === null) return value
  const shown = reducedMotion ? target : current

  return (
    <span ref={ref}>
      {/* Screen readers get the final value, not every frame */}
      <span aria-hidden="true">
        {prefix}
        {shown.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="visually-hidden">{value}</span>
    </span>
  )
}

export default CountUp
