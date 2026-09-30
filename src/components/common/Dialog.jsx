import { useEffect, useRef } from 'react'

// Modal built on <dialog>: the browser handles Escape, focus trapping and
// hiding the rest of the page. Clicking the dark backdrop also closes it.
function Dialog({ label, onClose, className = '', children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement
    if (!dialog.open) dialog.showModal()
    // Give focus back to whatever opened the dialog
    return () => opener?.focus?.({ preventScroll: true })
  }, [])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`dialog ${className}`}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      {...props}
    >
      {children}
    </dialog>
  )
}

export default Dialog
