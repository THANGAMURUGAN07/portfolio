import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, FileText, ChevronDown, X, Download } from 'lucide-react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skills = ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Computer Vision'];
  const [currentSkillIndex, setCurrentSkillIndex] = useState<number>(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  function downloadResume() {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    const currentSkill = skills[currentSkillIndex];
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= currentSkill.length) {
        setTypedText(currentSkill.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          const deletingInterval = setInterval(() => {
            if (index > 0) {
              setTypedText(currentSkill.slice(0, index));
              index--;
            } else {
              clearInterval(deletingInterval);
              setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentSkillIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 160; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      // Clear fully each frame for consistent brightness across width
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Different subtle colors left vs right to improve contrast in gradient background
        ctx.fillStyle = p.x < canvas.width / 2 ? 'rgba(96, 165, 250, 0.85)' : 'rgba(167, 139, 250, 0.85)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = p1.x < canvas.width / 2 ? `rgba(96, 165, 250, ${1 - distance / 100})` : `rgba(167, 139, 250, ${1 - distance / 100})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowProfileModal(false);
        setShowResumeModal(false);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 px-4 pt-24 sm:pt-28" id="home">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-gray-900/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#home" className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">TR Portfolio</a>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
            <li><a href="#skills" className="text-gray-300 hover:text-white transition-colors duration-200">Skills</a></li>
            <li><a href="#projects" className="text-gray-300 hover:text-white transition-colors duration-200">Projects</a></li>
            <li><a href="#education" className="text-gray-300 hover:text-white transition-colors duration-200">Education</a></li>
            <li><a href="#blog" className="text-gray-300 hover:text-white transition-colors duration-200">Blog</a></li>
            <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
          </ul>
          <div className="md:hidden flex">
            <details className="relative">
              <summary className="list-none cursor-pointer px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold select-none">Menu</summary>
              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-gray-900/95 backdrop-blur-xl border border-white/10 py-2 flex flex-col z-50">
                <a href="#about" className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white">About</a>
                <a href="#skills" className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white">Skills</a>
                <a href="#projects" className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white">Projects</a>
                <a href="#education" className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white">Education</a>
                <a href="#blog" className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white">Blog</a>
                <a href="#contact" className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white">Contact</a>
              </div>
            </details>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="mb-10 inline-block">
            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              aria-label="View full profile image"
              className="relative w-40 h-40 sm:w-56 sm:h-56 mx-auto group focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-1 transform group-hover:scale-110 transition-all duration-500 animate-float">
                <img
                  src="/images/profile.jpeg"
                  alt="Thangamurugan R profile photo"
                  className="w-full h-full rounded-full object-cover ring-2 ring-white/30"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </button>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white animate-slide-up leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">Thangamurugan R</span>
          </h1>

          <div className="text-xl sm:text-2xl md:text-4xl mb-6 text-gray-300 min-h-[3rem] flex items-center justify-center px-2">
            <span className="mr-2">Exploring</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold w-full max-w-xs sm:max-w-sm md:max-w-md text-center break-words">
              {typedText}
              <span className="animate-blink">|</span>
            </span>
          </div>

          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl mx-auto animate-fade-in px-2" style={{ animationDelay: '0.3s' }}>
            Artificial Intelligence Student passionate about building intelligent systems
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <button
              type="button"
              onClick={() => setShowResumeModal(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/40"
              aria-label="View resume"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FileText size={20} />
                View Resume
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <a
              href="https://www.linkedin.com/in/thangamuruganr07"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Linkedin size={20} />
                LinkedIn
              </span>
            </a>

            <a
              href="https://github.com/THANGAMURUGAN07"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Github size={20} />
                GitHub
              </span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={40} className="text-white/50" />
        </div>
      </div>

      {showProfileModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowProfileModal(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowProfileModal(false)}
              aria-label="Close full profile image"
              className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-100 transition z-10"
            >
              <X size={20} />
            </button>
            <img
              src="/images/profile.jpeg"
              alt="Thangamurugan R full profile photo"
              className="w-full h-auto rounded-2xl shadow-2xl object-contain"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      )}
      {showResumeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowResumeModal(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-full max-w-4xl h-[70vh] bg-gray-900/90 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={downloadResume}
              aria-label="Download resume"
              className="absolute top-3 right-16 bg-white/90 text-gray-900 rounded-full p-2 shadow-lg hover:bg-white transition z-10"
            >
              <Download size={20} />
            </button>
            <button
              type="button"
              onClick={() => setShowResumeModal(false)}
              aria-label="Close resume viewer"
              className="absolute top-3 right-3 bg-white text-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-100 transition z-10"
            >
              <X size={20} />
            </button>
            <div className="absolute inset-0 flex flex-col">
              <iframe
                title="Resume"
                src="/resume.pdf#toolbar=0"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
