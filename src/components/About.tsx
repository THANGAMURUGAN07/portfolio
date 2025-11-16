import { useEffect, useRef, useState } from 'react';
import { Sparkles, Target, Rocket, Brain } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="absolute -top-3 -right-3 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl animate-float"></div>
                <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl animate-float-delayed"></div>

                <div className="relative text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400 mb-4 flex items-center justify-center h-48">
                  AI
                </div>

                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-3xl animate-spin-slow"></div>
                <div className="absolute inset-4 border-4 border-purple-500/30 rounded-3xl animate-spin-reverse"></div>
              </div>
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="group">
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">Thangamurugan R</span>,
                an Artificial Intelligence student born on <span className="text-blue-400">07 June 2005</span>.
                I'm passionate about exploring the frontiers of AI, Machine Learning, Deep Learning, and Computer Vision.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                My journey in AI has been driven by curiosity and a desire to build intelligent systems that can solve real-world problems.
                From developing disease prediction models to creating real-time computer vision applications, I thrive on turning complex algorithms into practical solutions.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                I believe in continuous learning and staying at the cutting edge of AI technology.
                My goal is to contribute to the advancement of artificial intelligence and create systems that make a meaningful impact on society.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                <Brain className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-1">AI Research</h3>
                <p className="text-gray-400 text-sm">Deep Learning & Neural Networks</p>
              </div>

              <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                <Sparkles className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-1">Innovation</h3>
                <p className="text-gray-400 text-sm">Building Intelligent Systems</p>
              </div>

              <div className="group bg-gradient-to-br from-pink-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20">
                <Target className="w-8 h-8 text-pink-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-1">Problem Solving</h3>
                <p className="text-gray-400 text-sm">Real-world Applications</p>
              </div>

              <div className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
                <Rocket className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-1">Ambition</h3>
                <p className="text-gray-400 text-sm">Pushing Boundaries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
