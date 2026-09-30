import { useState } from 'react'
import GradedImage from '../components/common/GradedImage'
import Icon from '../components/common/Icon'
import Lightbox from '../components/common/Lightbox'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import site from '../data/danceyard.json'
import { photo } from '../utils/media'
import styles from './Gallery.module.css'

const items = site.gallery.map((g) => ({ ...photo(g.photo), category: g.category, caption: g.caption }))
const CATEGORIES = ['All', ...new Set(items.map((item) => item.category))]

// Masonry grid with category filters and a full-screen viewer.
function Gallery() {
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)
  const shown = items.filter((item) => filter === 'All' || item.category === filter)

  return (
    <section id="gallery" className="section" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          id="gallery-title"
          kicker="Gallery"
          title={
            <>
              Moments in <span className="neon">motion</span>
            </>
          }
          lead="Tap a photo to open it. Use the arrows or swipe to see more."
        />

        <div className="chips" role="group" aria-label="Filter photos">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <Reveal>
          <ul key={filter} className={styles.masonry}>
            {shown.map((item, i) => (
              <li key={item.id} className={`stagger-item ${styles.item}`} style={{ '--i': i }}>
                <button
                  type="button"
                  className={`${styles.tile} reveal-color`}
                  data-cursor="View"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Open photo: ${item.caption}`}
                >
                  <GradedImage photo={item} sizes="(min-width: 1100px) 25vw, (min-width: 640px) 45vw, 90vw" />
                  <span className={styles.caption}>
                    <span>{item.category}</span>
                    {item.caption}
                  </span>
                  <span className={styles.zoom} aria-hidden="true">
                    <Icon name="plus" size={20} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {openIndex !== null && (
        <Lightbox photos={shown} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  )
}

export default Gallery
