import { useInView } from '../../hooks/useInView'

// Starts once the top edge is 12% above the bottom of the screen, however tall
// the element is (a ratio threshold would leave long lists blank on phones).
const OPTIONS = { rootMargin: '0px 0px -12% 0px', threshold: 0 }

// Animates its content in when it scrolls into view.
// variant: 'up' | 'left' | 'right' | 'scale' | 'clip' (see .reveal-* in global.css)
function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...props }) {
  const [ref, inView] = useInView(OPTIONS)

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Reveal
