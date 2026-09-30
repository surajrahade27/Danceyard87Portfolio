import { useEffect, useRef, useState } from 'react'

// True once the element has scrolled into view. Stays true afterwards so
// entrance animations only play once.
export function useInView({ rootMargin = '0px 0px -10% 0px', threshold = 0.15 } = {}) {
  const ref = useRef(null)
  // Without IntersectionObserver, just show everything
  const [inView, setInView] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, rootMargin, threshold])

  return [ref, inView]
}
