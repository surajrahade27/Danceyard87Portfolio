import { useState } from 'react'
import GradedImage from '../components/common/GradedImage'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { whatsappLink } from '../utils/contact'
import { selectProgram } from '../utils/events'
import { photo } from '../utils/media'
import { resetPointer, trackPointer } from '../utils/pointer'
import styles from './Programs.module.css'

const FILTERS = [
  { id: 'all', label: 'All classes' },
  { id: 'kids', label: 'Kids' },
  { id: 'adults', label: 'Teens & adults' },
  { id: 'batches', label: 'Batches' },

  
]

function Programs() {
  const [filter, setFilter] = useState('all')
  const shown = site.programs.filter((p) => filter === 'all' || p.audience === filter || p.audience === 'all')

  return (
    <section id="classes" className="section section-raised" aria-labelledby="classes-title">
      <div className="container">
        <SectionHeading
          id="classes-title"
          kicker="Classes"
          title={
            <>
              Find your <span className="neon">style</span>
            </>
          }
          lead="Training in 35+ dance forms. Here are some of the most popular. Every class builds from a basic dance workout to advanced practice."
        />

        <div className="chips" role="group" aria-label="Filter classes">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Reveal>
          {/* key restarts the entrance animation whenever the filter changes */}
          {filter === 'batches' ? (
            <ul key={filter} className={styles.grid}>
              {site.batches.map((batch, i) => (
                <li key={batch.time} className="stagger-item" style={{ '--i': i }}>
                  <article className={styles.batch}>
                    <p className={styles.audience}>{batch.label}</p>
                    <h3 className={styles.time}>{batch.time}</h3>
                    <a
                      className={styles.enquire}
                      href={whatsappLink(`Hi Dance Yard! Is there a spot in the ${batch.time} batch?`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ask about this batch
                      <Icon name="arrow" size={18} />
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <ul key={filter} className={styles.grid}>
              {shown.map((program, i) => (
                <li key={program.name} className="stagger-item" style={{ '--i': i }}>
                  <article
                    className={`${styles.card} tilt reveal-color`}
                    onPointerMove={trackPointer}
                    onPointerLeave={resetPointer}
                  >
                    <GradedImage
                      photo={photo(program.photo)}
                      sizes="(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className={styles.image}
                    />
                    <div className={styles.body}>
                      <p className={styles.audience}>{program.audienceLabel}</p>
                      <h3>{program.name}</h3>
                      <p className={styles.blurb}>{program.blurb}</p>
                      <ul className={styles.tags}>
                        {program.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <button type="button" className={styles.enquire} onClick={() => selectProgram(program.name)}>
                        Enquire about {program.name}
                        <Icon name="arrow" size={18} />
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <p className={styles.note}>
          Batch timings change through the year.{' '}
          <a href={whatsappLink('Hi Dance Yard! Which batches are open right now?')} target="_blank" rel="noreferrer">
            Ask on WhatsApp for current batches
          </a>
          .
        </p>
      </div>
    </section>
  )
}

export default Programs
