import site from '../data/danceyard.json'

const { contact, location } = site

export function whatsappLink(message = contact.whatsappMessage) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
}

export const phoneLink = `tel:${contact.phone}`

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&z=15&output=embed`

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`

export const addressLine = `${location.venue}, ${location.area}, ${location.city}`
