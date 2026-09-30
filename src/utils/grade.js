import { reducedMotion } from './motion'

// Colour grades re-tint every photo and accent on the site. The values live
// in styles/variables.css under :root[data-grade='…'].
export const GRADES = [
  { id: 'neon', label: 'Neon', swatch: ['#9dff3c', '#ff3ea5'] },
  { id: 'cinematic', label: 'Cinematic', swatch: ['#22d3c5', '#ff8a3d'] },
  { id: 'noir', label: 'Noir', swatch: ['#f0f0ec', '#ff3b3b'] },
  { id: 'disco', label: 'Disco', swatch: ['#ff2fb4', '#8b5cf6'] },
]

const STORAGE_KEY = 'dy-grade'

export function loadGrade() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (GRADES.some((g) => g.id === saved)) document.documentElement.dataset.grade = saved
  } catch {
    // Storage blocked (private mode etc.) – keep the default grade
  }
}

// Calls back whenever <html data-grade> changes (for useSyncExternalStore)
export function subscribeGrade(callback) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-grade'] })
  return () => observer.disconnect()
}

export function currentGrade() {
  return document.documentElement.dataset.grade || GRADES[0].id
}

// Switches grade with a circular wipe that grows from the clicked button.
export function applyGrade(id, x, y) {
  const set = () => {
    document.documentElement.dataset.grade = id
  }
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // Not saved, but the grade still changes for this visit
  }

  if (!document.startViewTransition || reducedMotion) {
    set()
    return
  }
  const transition = document.startViewTransition(set)
  transition.ready.then(() => {
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  })
}
