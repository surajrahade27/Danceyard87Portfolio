import styles from './Page.module.css'

function NotFoundPage() {
  return (
    <section className={`container ${styles.page} ${styles.notFound}`}>
      <title>Page not found | Dance Yard Studio</title>
      <meta name="robots" content="noindex" />
      <p className={`${styles.code} neon flicker`}>404</p>
      <h1 className={styles.title}>This page missed a beat</h1>
      <p>The link may be old or mistyped. Let's get you back on the floor.</p>
      <a href="/" className="btn btn-primary">
        Back to the homepage
      </a>
    </section>
  )
}

export default NotFoundPage
