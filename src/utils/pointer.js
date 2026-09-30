// Stores the pointer position (px, relative to the element) in CSS variables
// so styles can draw a spotlight or tilt that follows the cursor.
export function trackPointer(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  el.style.setProperty('--px', (x / rect.width - 0.5).toFixed(3))
  el.style.setProperty('--py', (y / rect.height - 0.5).toFixed(3))
}

export function resetPointer(e) {
  e.currentTarget.style.setProperty('--px', 0)
  e.currentTarget.style.setProperty('--py', 0)
}
