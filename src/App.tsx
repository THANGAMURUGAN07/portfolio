import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
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
