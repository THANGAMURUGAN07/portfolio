import { useEffect, useRef, useState } from 'react';
import { Brain, Eye, MessageSquare, Code, Database, TrendingUp } from 'lucide-react';

const skills = [
  { name: 'Deep Learning', icon: Brain, color: 'from-blue-400 to-blue-600', delay: '0' },
  { name: 'Neural Networks', icon: Brain, color: 'from-purple-400 to-purple-600', delay: '100' },
  { name: 'Computer Vision', icon: Eye, color: 'from-pink-400 to-pink-600', delay: '200' },
  { name: 'NLP', icon: MessageSquare, color: 'from-cyan-400 to-cyan-600', delay: '300' },
  { name: 'Python', icon: Code, color: 'from-green-400 to-green-600', delay: '400' },
  { name: 'JavaScript', icon: Code, color: 'from-yellow-400 to-yellow-600', delay: '500' },
  { name: 'TensorFlow', icon: Database, color: 'from-orange-400 to-orange-600', delay: '600' },
  { name: 'PyTorch', icon: Database, color: 'from-red-400 to-red-600', delay: '700' },
  { name: 'OpenCV', icon: Eye, color: 'from-indigo-400 to-indigo-600', delay: '800' },
  { name: 'Research', icon: TrendingUp, color: 'from-teal-400 to-teal-600', delay: '900' },
  { name: 'Data Analysis', icon: TrendingUp, color: 'from-violet-400 to-violet-600', delay: '1000' },
  { name: 'Web Design', icon: Code, color: 'from-fuchsia-400 to-pink-600', delay: '1100' },
];

export default function Skills() {
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
    <section ref={sectionRef} id="skills" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">Technologies and tools I work with</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${isVisible ? skill.delay : '0'}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl group-hover:blur-2xl animate-pulse-slow"
                   style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>

              <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-transparent transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 animate-bounce-subtle group-hover:animate-spin-slow shadow-lg`}>
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-white font-semibold text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {skill.name}
                  </h3>
                </div>

                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-150"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <p className="text-xl text-gray-300 mb-4">
              Constantly learning and exploring new technologies
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse animation-delay-150"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse animation-delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
