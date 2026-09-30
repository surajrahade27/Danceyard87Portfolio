import photos from '../data/photos.json'

const UNSPLASH = 'https://images.unsplash.com'
const WIDTHS = [480, 800, 1200, 1600, 2000]

// Looks up a photo from photos.json by its key, e.g. photo('stageSpin').
export function photo(key) {
  return photos[key]
}

export const allPhotos = Object.values(photos)

export function photoUrl(id, width = 1200) {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&q=70&w=${width}`
}

export function photoSrcSet(id) {
  return WIDTHS.map((w) => `${photoUrl(id, w)} ${w}w`).join(', ')
}

export function unsplashPage(slug) {
  return `https://unsplash.com/photos/${slug}`
}

export function youtubeThumb(id, quality) {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

// Privacy-enhanced embed. Autoplays because it only loads after a click.
export function youtubeEmbed(id) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
}
