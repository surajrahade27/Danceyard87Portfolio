import CursorFollower from './components/common/CursorFollower'
import IntroCurtain from './components/common/IntroCurtain'
import FloatingActions from './components/layout/FloatingActions'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import VideoProvider from './components/common/VideoProvider'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PrivacyPage from './pages/PrivacyPage'
import { useButtonRipple } from './hooks/useButtonRipple'

// Tiny path-based router; Netlify's _redirects sends every path to index.html.
// Swap for React Router if the site grows more pages.
const PAGES = { '/': HomePage, '/privacy': PrivacyPage }
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Page = PAGES[path] ?? NotFoundPage

function App() {
  useButtonRipple()

  return (
    <VideoProvider>
      <IntroCurtain />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header overHero={Page === HomePage} />
      <main id="main">
        <Page />
      </main>
      <Footer />
      <FloatingActions />
      <CursorFollower />
    </VideoProvider>
  )
}

export default App
