import { useEffect } from 'react'
import { reducedMotion } from '../utils/motion'

// Ripple from the press point on every .btn. One delegated listener covers
// buttons anywhere on the page (see .ripple in global.css).
export function useButtonRipple() {
  useEffect(() => {
    if (reducedMotion) return
    const onDown = (e) => {
      const button = e.target.closest?.('.btn')
      if (!button) return
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2.2
      const ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`
      ripple.addEventListener('animationend', () => ripple.remove())
      button.append(ripple)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])
}
