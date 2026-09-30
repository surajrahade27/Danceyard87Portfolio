import { useState } from 'react'
import Icon from '../components/common/Icon'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import YouTubeThumb from '../components/common/YouTubeThumb'
import { useVideoPlayer } from '../context/VideoContext'
import site from '../data/danceyard.json'
import styles from './Videos.module.css'

const CATEGORIES = ['All', ...new Set(site.videos.map((v) => v.category))]

// Thumbnail cards; clicking one plays the video in the shared modal player.
function Videos() {
  const playVideo = useVideoPlayer()
  const [filter, setFilter] = useState('All')
  const shown = site.videos.filter((v) => filter === 'All' || v.category === filter)

  return (
    <section id="videos" className="section section-raised" aria-labelledby="videos-title">
      <div className="container">
        <SectionHeading
          id="videos-title"
          kicker="Watch"
          title={
            <>
              See the <span className="neon">moves</span>
            </>
          }
          lead={site.videosNote}
        />

        <div className="chips" role="group" aria-label="Filter videos">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <Reveal>
          <ul key={filter} className={styles.grid}>
            {shown.map((video, i) => (
              <li
                key={video.id}
                className={`stagger-item ${i === 0 ? styles.featured : ''}`}
                style={{ '--i': i }}
              >
                <button
                  type="button"
                  className={`${styles.card} reveal-color`}
                  data-cursor="Play"
                  onClick={() => playVideo(video)}
                  aria-label={`Play video: ${video.title}`}
                >
                  <span className={`graded ${styles.thumb}`}>
                    <YouTubeThumb id={video.id} />
                  </span>
                  <span className={styles.play} aria-hidden="true">
                    <Icon name="play" size={i === 0 ? 34 : 26} />
                  </span>
                  <span className={styles.meta}>
                    <span className={styles.category}>{video.category}</span>
                    <span className={styles.title}>{video.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default Videos
