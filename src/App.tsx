import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Ripples from './components/Ripples';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <SmoothScroll />
      <Ripples />
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
