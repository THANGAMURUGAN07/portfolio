import { useEffect, useRef, useState } from 'react';
import { GraduationCap, BookOpen, School } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech Artificial Intelligence & Data Science (4th Year)',
    institution: 'Ramco Institute of Technology',
    period: '2023 - Present',
    description: 'Currently in 4th year, focusing on AI, ML, Deep Learning, Computer Vision, and Data Science projects.',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    degree: '12th – 82.67%',
    institution: 'PNUP Kamarajar Matric Higher Secondary School',
    period: '2021 - 2023',
    description: 'Specialized in Mathematics, Physics, and Computer Science with strong academic performance.',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-500',
  },
  {
    degree: '10th – 78%',
    institution: 'PNUP Kamarajar Matric Higher Secondary School',
    period: '2019 - 2021',
    description: 'Built an academic foundation and curiosity for analytical and logical problem-solving.',
    icon: School,
    color: 'from-green-500 to-teal-500',
  },
];

export default function Education() {
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
    <section ref={sectionRef} id="education" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Education & Learning
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">My academic journey and key performance milestones</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block">
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 animate-pulse shadow-lg shadow-blue-500/50"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-pink-500 rounded-full transform -translate-x-1/2 animate-pulse shadow-lg shadow-pink-500/50"></div>
          </div>

          <div className="space-y-12">
            {education.map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
                }`}
                style={{ transitionDelay: `${isVisible ? index * 200 : 0}ms` }}
              >
                <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 group">
                    <div className={`relative ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                      <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 group-hover:border-transparent transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>

                        <div className="relative">
                          <div className="flex items-center gap-3 mb-3 justify-start">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 text-left">
                              {item.degree}
                            </h3>
                          </div>

                          <div className="mb-2 text-left">
                            <p className="text-lg text-gray-300 font-semibold">{item.institution}</p>
                            <p className={`inline-block px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${item.color} text-white mt-2`}>
                              {item.period}
                            </p>
                          </div>

                          <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-left">
                            {item.description}
                          </p>
                        </div>

                        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br opacity-10 blur-2xl rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="relative hidden md:block">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:scale-125 hover:rotate-180 z-10 relative`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-full blur-xl opacity-50 animate-pulse`}></div>
                  </div>

                  <div className="flex-1"></div>
                </div>

                {index < education.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 bottom-0 w-0.5 h-12 bg-gradient-to-b from-gray-600 to-transparent transform -translate-x-1/2 translate-y-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
