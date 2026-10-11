import site from '../data/danceyard.json'
import About from '../sections/About'
import AdmissionBanner from '../sections/AdmissionBanner'
import Choreography from '../sections/Choreography'
import Contact from '../sections/Contact'
import Events from '../sections/Events'
import Faq from '../sections/Faq'
import Hero from '../sections/Hero'
import Instagram from '../sections/Instagram'
import Join from '../sections/Join'
import Learn from '../sections/Learn'
import Marquee from '../sections/Marquee'
import Mentors from '../sections/Mentors'
import Opportunities from '../sections/Opportunities'
import Programs from '../sections/Programs'
import Testimonials from '../sections/Testimonials'
import WhyUs from '../sections/WhyUs'

// Videos (sample YouTube clips) and Gallery (sample Unsplash photos) are hidden
// until Dance Yard's own are ready; the Instagram feed is the gallery for now.
function HomePage() {
  return (
    <>
      <Hero />
      <Marquee rows={site.marquee} />
      <About />
      <WhyUs />
      <Learn />
      <Programs />
      <Opportunities />
      <Mentors />
      <Choreography />
      <Instagram />
      <Events />
      <Testimonials />
      <AdmissionBanner />
      <Join />
      <Faq />
      <Contact />
    </>
  )
}

export default HomePage
