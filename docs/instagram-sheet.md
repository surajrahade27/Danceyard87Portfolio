# Adding Instagram posts to the website

The website's Instagram section reads its list of posts from a Google Sheet.
To show a new post, paste its link into the sheet. The website updates by
itself within about 5 minutes. No code changes, no deploys.

## One-time setup

1. **Create the sheet.** In Google Sheets, create a new sheet, for example
   "Dance Yard – website Instagram posts".
2. **Import the current posts.** File → Import → Upload → choose
   `docs/instagram-posts.csv` from this project → *Replace current sheet* →
   Import data.
3. **Publish it.** File → Share → Publish to web. On the *Link* tab pick the
   sheet's tab (for example *Sheet1*) and *Comma-separated values (.csv)*, then
   click Publish and copy the link.
4. **Connect it to the website.** The developer pastes that link into
   `src/data/danceyard.json` → `"instagramSheet"` and deploys once. This is the
   only code change.
5. **Limit who can edit.** Use the Share button to add studio staff as
   Editors. Anyone with the published link can *read* the sheet, so only put
   post links and titles in it, nothing private.

## Adding a post

1. In the Instagram app, open the post → Share → **Copy link**.
2. In the sheet, insert a row under the header row and paste the link into
   the `link` column. The website shows posts in the same order as the sheet,
   so keep the newest at the top.
3. Fill in the other columns if you like (see below). Then wait about 5
   minutes and refresh the website.

Several links in one `link` cell, separated by commas or line breaks, also
work. The other columns in that row then apply to all of them.

## Columns

| Column | Needed? | What to put |
|---|---|---|
| `link` | Yes | The Instagram post or reel link |
| `title` | No | Text on the card. Empty: "Instagram reel" or "Instagram post" |
| `category` | No | Groups posts under the filter buttons, for example *Classes*, *Events*. A new name makes a new button. Empty: *More* |
| `type` | No | `reel` or `photo`. Only needed if a video's link has `/p/` instead of `/reel/` |
| `date` | No | `2026-10-07` shows as "7 Oct 2026". Anything else shows exactly as typed |
| `display` | No | `letterboxed` or `landscape`, see below |

## Making the cards look right

After adding a post, check its card on the website:

- **Black bars at the left and right of the card:** put `letterboxed` in
  `display`. This happens with reels that Instagram lets play on the website.
- **A landscape (wide) video looks squashed or cropped oddly:** put
  `landscape` in `display`.

## If something looks wrong

- **The website shows the old list of 12 posts.** The sheet couldn't be read:
  it was unpublished, the published link changed, or it has no links. The
  website then falls back to the list built into the code. Check File → Share
  → Publish to web.
- **A post is missing.** The link isn't an Instagram post link (it must
  contain `/p/`, `/reel/` or `/tv/`), or the post is private or deleted.
- **A reel shows "Watch on Instagram" instead of playing.** Instagram decides
  this per reel, usually because of the music. Reels using the studio's own
  audio play on the website; reels set to film songs usually don't.
