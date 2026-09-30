import { useState } from 'react'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { whatsappLink } from '../utils/contact'
import styles from './Faq.module.css'

function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section section-raised" aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <SectionHeading
            compact
            id="faq-title"
            kicker="FAQ"
            title={
              <>
                Questions? <span className="neon">Answered.</span>
              </>
            }
            lead="Can't find what you're looking for? We reply fastest on WhatsApp."
          />
          <Reveal>
            <a href={whatsappLink('Hi Dance Yard! I have a question.')} className="btn btn-whatsapp" target="_blank" rel="noreferrer">
              <Icon name="whatsapp" />
              Ask on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal as="ul" className={styles.list}>
          {site.faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <li key={faq.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {faq.q}
                    <span className={styles.icon} aria-hidden="true">
                      <Icon name="plus" size={20} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={styles.panel} inert={!isOpen}>
                  <div>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default Faq
