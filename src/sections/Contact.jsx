import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { addressLine, directionsUrl, mapEmbedUrl, phoneLink, whatsappLink } from '../utils/contact'
import styles from './Contact.module.css'

const { contact } = site

function Contact() {
  const cards = [
    {
      icon: 'whatsapp',
      label: 'WhatsApp (messages only)',
      value: contact.whatsappDisplay,
      href: whatsappLink(),
      action: 'Chat now',
      external: true,
    },
    { icon: 'phone', label: 'Call', value: contact.phoneDisplay, href: phoneLink, action: 'Call now' },
    { icon: 'pin', label: 'Visit', value: addressLine, href: directionsUrl, action: 'Get directions', external: true },
    contact.instagram && {
      icon: 'instagram',
      label: 'Instagram',
      value: contact.instagramHandle,
      href: contact.instagram,
      action: 'Follow',
      external: true,
    },
  ].filter(Boolean)

  return (
    <section id="contact" className="section section-raised" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          kicker="Visit us"
          title={
            <>
              Find the <span className="neon">yard</span>
            </>
          }
          lead={`${site.positioning}, located in ${site.location.area}, ${site.location.city}.`}
        />

        <div className={styles.grid}>
          <ul className={styles.cards}>
            {cards.map((card, i) => (
              <Reveal as="li" key={card.label} delay={i * 90} variant="left">
                <a
                  href={card.href}
                  className={`${styles.card} spotlight`}
                  {...(card.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <span className={styles.icon}>
                    <Icon name={card.icon} />
                  </span>
                  <span className={styles.text}>
                    <span className={styles.label}>{card.label}</span>
                    <span className={styles.value}>{card.value}</span>
                  </span>
                  <span className={styles.action}>
                    {card.action}
                    <Icon name="arrow" size={16} />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal variant="clip" className={styles.map}>
            <iframe
              title={`Map showing ${addressLine}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
