import { useEffect, useRef, useState } from 'react'
import { finePointer, reducedMotion } from '../../utils/motion'
import styles from './CursorFollower.module.css'

const ENABLED = finePointer && !reducedMotion
const INTERACTIVE = '[data-cursor], a, button, label, summary, select'

// Neon ring that trails the pointer. It grows over links and buttons and shows
// a label over elements with data-cursor (e.g. "Play"). The system cursor stays.
function CursorFollower() {
  const ref = useRef(null)
  const [state, setState] = useState('idle')
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!ENABLED) return
    const cursor = ref.current
    let x = 0
    let y = 0
    let rx = 0
    let ry = 0
    let frame = 0

    const tick = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      cursor.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      frame = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (cursor.dataset.visible !== 'true') {
        rx = x
        ry = y
        cursor.dataset.visible = 'true'
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onOver = (e) => {
      // Pointer events stop inside iframes (videos, map), so hide the ring there
      if (e.target.tagName === 'IFRAME') {
        cursor.dataset.visible = 'false'
        return
      }
      const target = e.target.closest?.(INTERACTIVE)
      const text = target?.dataset.cursor ?? ''
      setLabel(text)
      setState(text ? 'label' : target ? 'hover' : 'idle')
    }

    const hide = () => {
      cursor.dataset.visible = 'false'
    }
    const press = () => {
      cursor.dataset.pressed = 'true'
    }
    const release = () => {
      cursor.dataset.pressed = 'false'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('mouseleave', hide)
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('mouseleave', hide)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
    }
  }, [])

  if (!ENABLED) return null

  return (
    <div ref={ref} className={styles.cursor} data-state={state} aria-hidden="true">
      <span className={styles.ring}>
        <span className={styles.label}>{label}</span>
      </span>
    </div>
  )
}

export default CursorFollower
