import { Brain, Code, Database, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const skills = [
  { icon: Brain, name: 'Deep Learning', color: 'from-blue-500 to-cyan-500', level: 85 },
  { icon: Brain, name: 'Neural Networks', color: 'from-purple-500 to-pink-500', level: 82 },
  { icon: MessageSquare, name: 'NLP', color: 'from-green-500 to-emerald-500', level: 75 },
  { icon: Eye, name: 'Computer Vision', color: 'from-orange-500 to-red-500', level: 78 },
  { icon: Code, name: 'Python', color: 'from-yellow-500 to-orange-500', level: 88 },
  { icon: Code, name: 'JavaScript', color: 'from-blue-400 to-blue-600', level: 72 },
  { icon: Database, name: 'TensorFlow', color: 'from-orange-600 to-red-600', level: 80 },
  { icon: Database, name: 'PyTorch', color: 'from-red-500 to-pink-500', level: 78 },
  { icon: Eye, name: 'OpenCV', color: 'from-teal-500 to-cyan-500', level: 74 },
  { icon: TrendingUp, name: 'Research & Analysis', color: 'from-indigo-500 to-purple-500', level: 83 },
  { icon: Database, name: 'MongoDB', color: 'from-green-600 to-green-400', level: 70 },
  { icon: Database, name: 'DBMS', color: 'from-indigo-600 to-indigo-400', level: 75 },
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className={`text-4xl md:text-5xl font-bold text-white text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skills</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className={`group glass-card p-6 rounded-2xl text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative inline-block mb-4">
                  <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-shift`} />
                  <div className={`relative w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-3 transition-colors duration-300">
                  {skill.name}
                </h3>

                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000"
                    style={{ width: isVisible ? `${skill.level}%` : '0%' , transitionDelay: `${index * 80}ms`}}
                  />
                </div>
                <div className="text-sm text-gray-400 mt-2">{skill.level}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
