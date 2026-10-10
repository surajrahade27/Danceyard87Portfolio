// Instagram posts can come from a Google Sheet the studio edits, published to
// the web as CSV (URL in danceyard.json → instagramSheet), so adding a post
// needs no code change. See docs/instagram-sheet.md for the owner's steps.

// Post and reel links, including profile-style ones (instagram.com/<user>/reel/<code>)
const LINK = /instagram\.com\/(?:[\w.]+\/)?(p|reels?|tv)\/([\w-]+)/gi

const COLUMNS = {
  link: ['link', 'links', 'url'],
  title: ['title'],
  category: ['category'],
  type: ['type'],
  date: ['date'],
  display: ['display'],
}

// Small CSV parser: quoted cells, doubled quotes, commas and line breaks inside cells
export function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        quoted = false
      } else {
        cell += ch
      }
    } else if (ch === '"') {
      quoted = true
    } else if (ch === ',') {
      row.push(cell)
      cell = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else {
      cell += ch
    }
  }
  if (cell || row.length) {
    row.push(cell)
    rows.push(row)
  }
  return rows
}

// The type column wins; otherwise /p/ links are photos and the rest are reels
function postType(typed, kind) {
  if (typed === 'photo') return 'photo'
  if (typed === 'reel' || typed === 'video') return 'reel'
  return kind === 'p' ? 'photo' : 'reel'
}

// One post per Instagram link, in sheet order. Columns are found by their
// header (link, title, category, type, date, display), so their order doesn't
// matter. A link cell may hold several links separated by commas, spaces or
// line breaks. Without a "link" header every cell is searched for links.
export function postsFromCsv(text) {
  const rows = parseCsv(text)
  const header = (rows[0] || []).map((h) => h.trim().toLowerCase())
  const index = Object.fromEntries(
    Object.entries(COLUMNS).map(([key, names]) => [key, header.findIndex((h) => names.includes(h))]),
  )
  const structured = index.link !== -1

  const posts = []
  const seen = new Set()
  for (const row of structured ? rows.slice(1) : rows) {
    const value = (key) => (index[key] >= 0 ? (row[index[key]] || '').trim() : '')
    const links = structured ? value('link') : row.join(' ')
    for (const [, kind, code] of links.matchAll(LINK)) {
      if (seen.has(code)) continue
      seen.add(code)
      const type = postType(value('type').toLowerCase(), kind.toLowerCase())
      const display = value('display').toLowerCase()
      posts.push({
        code,
        type,
        title: value('title') || (type === 'reel' ? 'Instagram reel' : 'Instagram post'),
        category: value('category') || 'More',
        date: value('date'),
        landscape: display.includes('landscape'),
        square: display.includes('square'),
        letterboxed: display.includes('letterbox'),
      })
    }
  }
  return posts
}

// Fetches and reads the published sheet; throws if it can't be used
export async function loadSheetPosts(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sheet request failed: ${res.status}`)
  const posts = postsFromCsv(await res.text())
  if (!posts.length) throw new Error('No Instagram links in the sheet')
  return posts
}
