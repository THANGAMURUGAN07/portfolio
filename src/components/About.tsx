import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const [avatarTransform, setAvatarTransform] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function handleAvatarMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const rotateX = (-y / rect.height) * 8; // tilt amount
    const rotateY = (x / rect.width) * 8;
    const translateX = (x / rect.width) * 6;
    const translateY = (y / rect.height) * 6;
    setAvatarTransform(`perspective(800px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }

  function resetAvatar() {
    setAvatarTransform('');
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className={`text-4xl md:text-5xl font-bold text-white text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Me</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className={`flex-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div
              className="relative group"
              onMouseMove={handleAvatarMove}
              onMouseLeave={resetAvatar}
              ref={avatarRef}
              aria-hidden
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-500"></div>
              <div
                className="relative aspect-square rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-2xl transform transition-transform duration-500"
                style={{ transform: avatarTransform }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10"></div>
                {!imageError ? (
                  <img
                    src="/profile.jpeg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-9xl">
                    🤖
                  </div>
                )}
              </div>
              <div className="absolute inset-0 hologram-outline rounded-2xl pointer-events-none"></div>

              {/* floating decorative blobs for subtle motion */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500/40 rounded-full animate-float" style={{ animationDuration: '18s' }}></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-purple-500/30 rounded-full animate-pulse-slow"></div>
            </div>
          </div>

          <div className={`flex-1 space-y-6 text-gray-300 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
              <p className="text-lg leading-relaxed">
                I'm an <span className="text-blue-400 font-semibold">Artificial Intelligence student</span> with
                a deep passion for exploring the frontiers of machine learning, deep learning, and computer vision.
                My journey in AI began with a fascination for how machines can learn and adapt,
                leading me to dive deep into neural networks and intelligent systems.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animation-delay-200">
              <p className="text-lg leading-relaxed">
                Through hands-on projects and continuous learning, I've developed expertise in
                <span className="text-purple-400 font-semibold"> Python, TensorFlow, PyTorch, and OpenCV</span>.
                I'm particularly interested in applying AI to solve real-world problems in healthcare,
                accessibility, and human-computer interaction.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animation-delay-400">
              <p className="text-lg leading-relaxed">
                My goal is to contribute to the advancement of AI technology while ensuring it remains
                ethical, accessible, and beneficial to society. I'm always eager to collaborate on
                innovative projects and learn from the vibrant AI research community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
