import { useEffect, useRef } from 'react'
import { subscribeGrade } from '../../utils/grade'
import { reducedMotion } from '../../utils/motion'

const MAX_DPR = 2
const REPEL_RADIUS = 130
const SPRITE_SIZE = 64

// Current grade's accents as "r, g, b" strings, plus white
function readColours() {
  const style = getComputedStyle(document.documentElement)
  return ['--accent-rgb', '--accent-2-rgb', '--accent-3-rgb']
    .map((name) => style.getPropertyValue(name).trim().split(/\s+/).join(', '))
    .concat('255, 255, 255')
}

// Pre-rendered soft glow per colour; drawing images is much cheaper than blur
function makeSprites(colours) {
  return colours.map((rgb) => {
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = SPRITE_SIZE
    const ctx = sprite.getContext('2d')
    const half = SPRITE_SIZE / 2
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
    gradient.addColorStop(0, `rgba(${rgb}, 1)`)
    gradient.addColorStop(0.22, `rgba(${rgb}, 0.55)`)
    gradient.addColorStop(1, `rgba(${rgb}, 0)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)
    return sprite
  })
}

function makeParticle(width, height, anywhere) {
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : height + 12,
    r: 0.6 + Math.random() ** 2 * 2.4,
    vy: -(0.12 + Math.random() * 0.4),
    drift: Math.random() * Math.PI * 2,
    twinkle: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random(),
    colour: Math.floor(Math.random() * 4),
    glint: Math.random() < 0.14,
    pushX: 0,
    pushY: 0,
  }
}

// Disco-ball light specks that drift upwards, twinkle and scatter away from
// the cursor. Pauses off-screen and in background tabs.
function Sparkles({ className = '', density = 16000 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let colours = readColours()
    let sprites = makeSprites(colours)
    let particles = []
    let width = 0
    let height = 0
    let frame = 0
    let last = 0
    let visible = false
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.round((width * height) / density))
      particles = Array.from({ length: count }, () => makeParticle(width, height, true))
      if (reducedMotion) draw(0)
    }

    const draw = (k) => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        if (k) {
          p.twinkle += 0.04 * p.speed * k
          p.drift += 0.012 * k
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < REPEL_RADIUS * REPEL_RADIUS) {
            const d = Math.sqrt(d2) || 1
            const force = (1 - d / REPEL_RADIUS) * 0.6
            p.pushX += (dx / d) * force
            p.pushY += (dy / d) * force
          }
          p.pushX *= 0.93
          p.pushY *= 0.93
          p.x += Math.sin(p.drift) * 0.3 * k + p.pushX * k
          p.y += p.vy * k * 1.5 + p.pushY * k
          if (p.y < -20 || p.x < -20 || p.x > width + 20) Object.assign(p, makeParticle(width, height, false))
        }
        const alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(p.twinkle))
        const size = p.r * 7
        ctx.globalAlpha = alpha
        ctx.drawImage(sprites[p.colour], p.x - size / 2, p.y - size / 2, size, size)
        // Brightest specks flash a four-point star, like light off a mirror ball
        if (p.glint && alpha > 0.8) {
          const arm = p.r * 6 * alpha
          ctx.strokeStyle = `rgba(${colours[p.colour]}, ${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x - arm, p.y)
          ctx.lineTo(p.x + arm, p.y)
          ctx.moveTo(p.x, p.y - arm)
          ctx.lineTo(p.x, p.y + arm)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }

    const tick = (now) => {
      frame = 0
      if (!visible || document.hidden) return
      const k = last ? Math.min((now - last) / 16.7, 3) : 1
      last = now
      draw(k)
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (reducedMotion || frame || !visible || document.hidden) return
      last = 0
      frame = requestAnimationFrame(tick)
    }

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    viewObserver.observe(canvas)
    const unsubscribe = subscribeGrade(() => {
      colours = readColours()
      sprites = makeSprites(colours)
      if (reducedMotion) draw(0)
    })
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', start)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      viewObserver.disconnect()
      unsubscribe()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', start)
    }
  }, [density])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}

export default Sparkles
