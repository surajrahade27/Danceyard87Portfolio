import { photoSrcSet, photoUrl } from '../../utils/media'

// A photo with the site's colour grade applied (.graded in global.css).
// Put `reveal-color` on a parent to show true colours on hover.
function GradedImage({ photo, sizes = '100vw', eager = false, className = '', ...props }) {
  return (
    <div className={`graded ${className}`} {...props}>
      <img
        src={photoUrl(photo.id)}
        srcSet={photoSrcSet(photo.id)}
        sizes={sizes}
        width={Math.round(photo.w / 10)}
        height={Math.round(photo.h / 10)}
        alt={photo.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        draggable={false}
      />
    </div>
  )
}

export default GradedImage
