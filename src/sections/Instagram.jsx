import { useEffect, useState } from 'react'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import { useVideoPlayer } from '../context/VideoContext'
import site from '../data/danceyard.json'
import { loadSheetPosts } from '../utils/instagram'
import { instagramEmbed } from '../utils/media'
import styles from './Instagram.module.css'
import videoStyles from './Videos.module.css'

// Each card loads a small Instagram embed, so cards are shown a batch at a time
const PAGE = 12
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
// Display flags that change how the embed is cropped (see Instagram.module.css)
const SHAPES = ['landscape', 'square', 'letterboxed']
const DATE = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

// Dates typed in the sheet are shown as typed unless they're YYYY-MM-DD
function formatDate(date) {
  return ISO_DATE.test(date) ? DATE.format(new Date(date)) : date
}

// Dance Yard's Instagram posts, from the studio's Google Sheet when one is set
// (danceyard.json → instagramSheet), otherwise from danceyard.json → instagram.
// Clicking a card opens the post in Instagram's own embed player inside the
// shared modal, so nothing is stored on the site.
function Instagram() {
  const [posts, setPosts] = useState(site.instagramSheet ? null : site.instagram)
  const [filter, setFilter] = useState('All')
  const [limit, setLimit] = useState(PAGE)

  useEffect(() => {
    if (!site.instagramSheet) return
    let current = true
    // Sheet missing, unpublished or empty: fall back to the list in the JSON
    loadSheetPosts(site.instagramSheet)
      .catch(() => site.instagram)
      .then((list) => current && setPosts(list))
    return () => {
      current = false
    }
  }, [])

  const categories = posts ? ['All', ...new Set(posts.map((post) => post.category))] : []
  const matching = posts?.filter((post) => filter === 'All' || post.category === filter) ?? []
  const more = Math.min(PAGE, matching.length - limit)

  const choose = (category) => {
    setFilter(category)
    setLimit(PAGE)
  }

  return (
    <section id="instagram" className="section section-raised" aria-labelledby="instagram-title">
      <div className="container">
        <SectionHeading
          id="instagram-title"
          kicker="Instagram"
          title={
            <>
              Fresh from the <span className="neon">feed</span>
            </>
          }
          lead={site.instagramNote}
        />

        {categories.length > 2 && (
          <div className="chips" role="group" aria-label="Filter Instagram posts">
            {categories.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => choose(c)}>
                {c}
              </button>
            ))}
          </div>
        )}

        <Reveal>
          <ul key={filter} className={styles.grid} aria-busy={!posts}>
            {posts
              ? matching.slice(0, limit).map((post, i) => <PostCard key={post.code} post={post} index={i % PAGE} />)
              : Array.from({ length: 4 }, (_, i) => <li key={i} className={styles.item} aria-hidden="true" />)}
          </ul>
        </Reveal>

        <div className={styles.actions}>
          {more > 0 && (
            <button type="button" className="btn btn-primary" onClick={() => setLimit(limit + PAGE)}>
              Show {more} more
            </button>
          )}
          <a href={site.contact.instagram} className="btn btn-ghost" target="_blank" rel="noreferrer">
            <Icon name="instagram" />
            Follow {site.contact.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}

// Instagram blocks its images on other sites, so the card's picture is the
// post's own embed, cropped to the photo and loaded only when the card is near.
function PostCard({ post, index }) {
  const playVideo = useVideoPlayer()
  const reel = post.type === 'reel'
  const date = post.date && formatDate(post.date)

  return (
    <li className={`stagger-item reveal-color ${styles.item}`} style={{ '--i': index }}>
      {/* Beside the button, not in it: an iframe can't sit inside a button */}
      <span
        className={`graded ${styles.thumb} ${SHAPES.map((shape) => (post[shape] ? styles[shape] : '')).join(' ')}`}
        inert
      >
        <iframe src={instagramEmbed(post.code)} title={post.title} loading="lazy" scrolling="no" />
      </span>
      <button
        type="button"
        className={`${videoStyles.card} ${styles.card}`}
        data-cursor={reel ? 'Play' : 'View'}
        onClick={() => playVideo({ ...post, platform: 'instagram' })}
        aria-label={`Open ${post.type}: ${post.title}${date ? `, ${date}` : ''}`}
      >
        <span className={styles.type}>{reel ? 'Reel' : 'Photo'}</span>
        <span className={styles.badge} aria-hidden="true">
          <Icon name="instagram" size={18} />
        </span>
        {reel && (
          <span className={`${videoStyles.play} ${styles.play}`} aria-hidden="true">
            <Icon name="play" size={26} />
          </span>
        )}
        <span className={`${videoStyles.meta} ${styles.meta}`}>
          <span className={videoStyles.category}>{post.category}</span>
          <span className={`${videoStyles.title} ${styles.title}`}>{post.title}</span>
          {date && (
            <time className={styles.date} dateTime={ISO_DATE.test(post.date) ? post.date : undefined}>
              {date}
            </time>
          )}
        </span>
      </button>
    </li>
  )
}

export default Instagram
