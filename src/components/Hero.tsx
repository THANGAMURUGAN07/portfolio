import { ArrowRight, Linkedin, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const skills = ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Neural Networks'];
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const resumeUrl = import.meta.env.VITE_RESUME_URL || '/resume.pdf';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="grid-background"></div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-white animate-fade-in-up">
            <div className="mb-4 overflow-hidden">
              <h2 className="text-blue-400 text-lg md:text-xl font-light tracking-wider animate-slide-right">
                Hi, I'm
              </h2>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-right animation-delay-200">
                Thangamurugan R
              </h1>
            </div>
            <div className="h-20 mb-8 overflow-hidden">
              <h3 className="text-2xl md:text-3xl text-gray-300 animate-slide-right animation-delay-400">
                Exploring{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold">
                  {typedText}
                  <span className="animate-blink">|</span>
                </span>
              </h3>
            </div>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl animate-fade-in animation-delay-600">
              Artificial Intelligence student passionate about building intelligent systems
              that solve real-world problems through Machine Learning, Deep Learning, and Computer Vision.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-800">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow"
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
                className="group px-8 py-4 border-2 border-blue-500 rounded-full font-semibold transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-glow flex items-center gap-2"
              >
                LinkedIn
                <Linkedin className="w-5 h-5 transition-transform group-hover:rotate-12" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center animate-fade-in animation-delay-400">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 animate-gradient-shift"></div>
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
              <div className="absolute inset-0 hologram-outline rounded-full"></div>
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
