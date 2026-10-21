import site from '../data/danceyard.json'

const { contact, location } = site

export function whatsappLink(message = contact.whatsappMessage) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
}

export const phoneLink = `tel:${contact.phone}`

// Embeds the Google Business listing (name, rating, "Open in Maps") by its ID.
// mapCid is a string: it is too large for a JSON number.
export const mapEmbedUrl = `https://www.google.com/maps?cid=${location.mapCid}&z=16&output=embed`

export const directionsUrl = location.mapUrl

// Shown as two lines, as on the Google listing: the studio's name, then the address
export const addressName = location.venue

export const addressLine = `${location.street}, ${location.locality}, ${location.city}, ${location.region} ${location.postalCode}, ${location.country}`
