import { useEffect, useRef, useState } from 'react'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { whatsappLink } from '../utils/contact'
import { SELECT_PROGRAM } from '../utils/events'
import styles from './Join.module.css'

// Must match the hidden form in index.html, which Netlify reads at deploy time.
const FORM_NAME = 'enquiry'

const PROGRAM_OPTIONS = [
  ...site.programs.map((p) => p.name),
  'Choreography (wedding, sangeet or event)',
  'Photo & video shoot',
  'Not sure yet',
]

const PERKS = [
  { icon: 'star', text: 'Mentors from Mumbai' },
  { icon: 'trophy', text: 'Bollywood, fashion show and reality show exposure' },
  { icon: 'whatsapp', text: 'We reply on WhatsApp' },
]

function Join() {
  const [status, setStatus] = useState('idle')
  const [program, setProgram] = useState('')
  const [sent, setSent] = useState(null)
  const nameRef = useRef(null)

  // "Enquire" on a class card pre-selects that class here
  useEffect(() => {
    let timer
    const onSelect = (e) => {
      setProgram(e.detail)
      setStatus('idle')
      timer = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700)
    }
    window.addEventListener(SELECT_PROGRAM, onSelect)
    return () => {
      window.removeEventListener(SELECT_PROGRAM, onSelect)
      clearTimeout(timer)
    }
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (!res.ok) throw new Error(`Form submit failed: ${res.status}`)
      setSent({ name: data.get('name'), program: data.get('program') })
      setStatus('sent')
      form.reset()
      setProgram('')
    } catch {
      setStatus('error')
    }
  }

  const firstName = sent?.name?.trim().split(' ')[0]
  const followUp = whatsappLink(
    `Hi Dance Yard! I'm ${sent?.name || ''}. I just sent an enquiry about ${sent?.program || 'your classes'}.`,
  )

  return (
    <section id="join" className={`section ${styles.join}`} aria-labelledby="join-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <SectionHeading
            compact
            id="join-title"
            kicker="Join us"
            title={
              <>
                Book your <span className="neon">spot</span>
              </>
            }
            lead="Tell us a little about yourself and we'll get back to you with batch timings and fees."
          />
          <ul className={styles.perks}>
            {PERKS.map((perk, i) => (
              <Reveal as="li" key={perk.text} delay={i * 100} variant="left">
                <span>
                  <Icon name={perk.icon} size={20} />
                </span>
                {perk.text}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal variant="scale" className={styles.card}>
          {status === 'sent' ? (
            <div className={styles.success} role="status">
              <svg className={styles.check} viewBox="0 0 52 52" aria-hidden="true">
                <circle cx="26" cy="26" r="24" />
                <path d="M15 27l7 7 15-16" />
              </svg>
              <h3>Thanks{firstName ? `, ${firstName}` : ''}! We got your enquiry.</h3>
              <p>Dance Yard will get back to you on WhatsApp. Want a faster reply? Message us now.</p>
              <div className={styles.successActions}>
                <a href={followUp} className="btn btn-whatsapp" target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" />
                  Continue on WhatsApp
                </a>
                <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form name={FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit}>
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p hidden>
                <label>
                  Don't fill this in: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className={styles.fields}>
                <div className={`${styles.field} ${styles.wide}`}>
                  <input ref={nameRef} id="f-name" name="name" required autoComplete="name" placeholder=" " />
                  <label htmlFor="f-name">Student's name *</label>
                </div>
                <div className={styles.field}>
                  <input id="f-parent" name="parentName" autoComplete="off" placeholder=" " />
                  <label htmlFor="f-parent">Parent's name (under 18)</label>
                </div>
                <div className={styles.field}>
                  <input id="f-age" name="age" type="number" min="3" max="99" inputMode="numeric" placeholder=" " />
                  <label htmlFor="f-age">Age</label>
                </div>
                <div className={styles.field}>
                  <input
                    id="f-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    pattern="[0-9+ ]{10,15}"
                    placeholder=" "
                  />
                  <label htmlFor="f-phone">WhatsApp number *</label>
                </div>
                <div className={styles.field}>
                  <input id="f-email" name="email" type="email" autoComplete="email" placeholder=" " />
                  <label htmlFor="f-email">Email</label>
                </div>
                <div className={`${styles.field} ${styles.select}`}>
                  <select
                    id="f-program"
                    name="program"
                    required
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {PROGRAM_OPTIONS.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                  <label htmlFor="f-program">Class or service *</label>
                </div>
                <div className={`${styles.field} ${styles.select}`}>
                  <select id="f-batch" name="batch" defaultValue="Flexible">
                    <option>Weekday mornings</option>
                    <option>Weekday evenings</option>
                    <option>Weekends</option>
                    <option>Flexible</option>
                  </select>
                  <label htmlFor="f-batch">Preferred batch</label>
                </div>
                <fieldset className={`${styles.levels} ${styles.wide}`}>
                  <legend>Experience</legend>
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level}>
                      <input type="radio" name="level" value={level} defaultChecked={level === 'Beginner'} />
                      <span>{level}</span>
                    </label>
                  ))}
                </fieldset>
                <div className={`${styles.field} ${styles.wide}`}>
                  <textarea id="f-message" name="message" rows="3" placeholder=" " />
                  <label htmlFor="f-message">Anything else? (optional)</label>
                </div>
              </div>

              {status === 'error' && (
                <p className={styles.error} role="alert">
                  We couldn't send the form just now.{' '}
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    Please message us on WhatsApp
                  </a>{' '}
                  instead.
                </p>
              )}

              <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                <Icon name="arrow" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default Join
