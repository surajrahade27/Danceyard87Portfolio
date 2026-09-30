import { youtubeEmbed } from '../../utils/media'
import Dialog from './Dialog'
import Icon from './Icon'
import styles from './VideoModal.module.css'

// YouTube player in a modal. The iframe only exists while the modal is open,
// so closing it also stops the video.
function VideoModal({ video, onClose }) {
  return (
    <Dialog label={video.title} onClose={onClose} className={styles.dialog}>
      <div className={styles.frame}>
        <iframe
          src={youtubeEmbed(video.id)}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className={styles.bar}>
        <p>
          <span className={styles.category}>{video.category}</span>
          {video.title}
        </p>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close video">
          <Icon name="close" />
        </button>
      </div>
    </Dialog>
  )
}

export default VideoModal
