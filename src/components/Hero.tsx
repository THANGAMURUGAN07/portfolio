import { ArrowRight, Linkedin, FileText } from 'lucide-react';
// Import resume asset as fallback if env URL isn't set
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bundledResume from '../../resume.pdf';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const skills = ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Neural Networks'];
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const external = (import.meta.env.VITE_RESUME_URL as string) || '';
  const resumeUrl: string = /^https?:\/\//i.test(external) ? external : bundledResume;

  useEffect(() => {
    const currentSkill = skills[skillIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentSkill.length) {
          setTypedText(currentSkill.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentSkill.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setSkillIndex((prev: number) => (prev + 1) % skills.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, skillIndex]);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="grid-background"></div>
        {/* Soft animated gradient blobs */}
        <div className="aurora-blobs">
          <div className="blob blob-1 animate-blob-1 -top-24 -left-24"></div>
          <div className="blob blob-2 animate-blob-2 top-1/3 -right-24"></div>
          <div className="blob blob-3 animate-blob-3 bottom-0 left-1/4"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-white animate-fade-in-up">
            <div className="mb-4 overflow-hidden">
              <h2 className="text-blue-400 text-base md:text-xl font-light tracking-wider animate-slide-right">
                Hi, I'm
              </h2>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-4xl md:text-7xl font-bold mb-3 md:mb-4 animate-slide-right animation-delay-200 relative inline-block">
                Thangamurugan R
              </h1>
            </div>
            {/* Animated shimmer underline */}
            <div className="h-1 w-32 md:w-48 rounded-full bg-gradient-to-r from-blue-500/50 via-blue-300/60 to-purple-600/50 overflow-hidden mb-4 md:mb-6">
              <div className="h-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
            </div>
            <div className="h-16 md:h-20 mb-6 md:mb-8 overflow-hidden">
              <h3 className="text-xl md:text-3xl text-gray-300 animate-slide-right animation-delay-400">
                Exploring{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold">
                  {typedText}
                  <span className="animate-blink">|</span>
                </span>
              </h3>
            </div>
            <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 max-w-2xl animate-fade-in animation-delay-600">
              Artificial Intelligence student passionate about building intelligent systems
              that solve real-world problems through Machine Learning, Deep Learning, and Computer Vision.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 animate-fade-in animation-delay-800">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Resume
                  <FileText className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://www.linkedin.com/in/thangamuruganr07"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 md:px-8 md:py-4 border-2 border-blue-500 rounded-full font-semibold transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-glow flex items-center gap-2"
              >
                LinkedIn
                <Linkedin className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center animate-fade-in animation-delay-400">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
              <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 animate-gradient-shift"></div>
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
              <div className="absolute inset-0 hologram-outline rounded-full"></div>
              {/* Orbiting decorative dots */}
              <div className="orbit" style={{ ['--r' as any]: '120px' }}>
                <span className="orbit-dot" />
              </div>
              <div className="orbit slow" style={{ ['--r' as any]: '86px' }}>
                <span className="orbit-dot purple" />
              </div>
              <div className="orbit fast" style={{ ['--r' as any]: '146px' }}>
                <span className="orbit-dot" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
      </div>
    </section>
  );
}
