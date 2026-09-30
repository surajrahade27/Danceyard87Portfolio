import site from '../data/danceyard.json'
import { whatsappLink } from '../utils/contact'
import styles from './Page.module.css'

// Draft wording – to be reviewed and approved by Dance Yard before launch.
function PrivacyPage() {
  return (
    <article className={`container ${styles.page}`}>
      <title>Privacy policy | Dance Yard Studio</title>
      <p className="kicker">Draft for review</p>
      <h1 className={styles.title}>Privacy policy</h1>

      <h2>What we collect</h2>
      <p>
        When you send the enquiry form we receive the details you type in: the student's name, parent's name, age,
        WhatsApp number, email, the class you're interested in, preferred batch, experience level and your message.
      </p>

      <h2>How we use it</h2>
      <p>
        Only to reply to your enquiry about classes, choreography or shoots. We don't sell your details or share them
        for marketing.
      </p>

      <h2>Where it's stored</h2>
      <p>
        Form entries are stored by our website host, Netlify, and deleted once they're no longer needed to answer your
        enquiry. Messages you send on WhatsApp are handled by WhatsApp.
      </p>

      <h2>Photos and videos</h2>
      <p>
        We only publish photos and videos of students with their permission, and of children only with a parent's or
        guardian's consent. To have a photo removed, message us and we'll take it down.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about your data? Message {site.name} on{' '}
        <a href={whatsappLink('Hi Dance Yard! I have a question about my data.')} target="_blank" rel="noreferrer">
          WhatsApp ({site.contact.whatsappDisplay})
        </a>
        .
      </p>
    </article>
  )
}

export default PrivacyPage
