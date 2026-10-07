import { youtubeEmbed } from '../../utils/media'
import Dialog from './Dialog'
import Icon from './Icon'
import InstagramEmbed from './InstagramEmbed'
import styles from './VideoModal.module.css'

// Player in a modal: a YouTube video, or an Instagram reel or photo post when
// video.platform is 'instagram'. The iframe only exists while the modal is
// open, so closing it also stops the video.
function VideoModal({ video, onClose }) {
  const instagram = video.platform === 'instagram'

  return (
    <Dialog label={video.title} onClose={onClose} className={`${styles.dialog} ${instagram ? styles.reel : ''}`}>
      {instagram ? (
        <InstagramEmbed code={video.code} title={video.title} className={styles.reelFrame} />
      ) : (
        <div className={styles.frame}>
          <iframe
            src={youtubeEmbed(video.id)}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
      <div className={styles.bar}>
        <p>
          <span className={styles.category}>{video.category}</span>
          {video.title}
        </p>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={instagram ? 'Close post' : 'Close video'}
        >
          <Icon name="close" />
        </button>
      </div>
    </Dialog>
  )
}

export default VideoModal
