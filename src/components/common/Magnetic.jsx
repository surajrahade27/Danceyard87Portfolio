import { finePointer, reducedMotion } from '../../utils/motion'

// Makes its child drift towards the cursor while hovered.
function Magnetic({ children, strength = 0.3 }) {
  if (!finePointer || reducedMotion) return children

  const onMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--tx', `${(e.clientX - rect.left - rect.width / 2) * strength}px`)
    el.style.setProperty('--ty', `${(e.clientY - rect.top - rect.height / 2) * strength}px`)
  }
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--tx', '0px')
    e.currentTarget.style.setProperty('--ty', '0px')
  }

  return (
    <span className="magnetic" onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </span>
  )
}

export default Magnetic
