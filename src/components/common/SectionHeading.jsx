import Reveal from './Reveal'

function SectionHeading({ id, kicker, title, lead, center = false, compact = false }) {
  return (
    <Reveal className={`heading ${center ? 'heading-center' : ''} ${compact ? 'heading-compact' : ''}`}>
      <p className="kicker">{kicker}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  )
}

export default SectionHeading
