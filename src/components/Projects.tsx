import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

const projects = [
  {
    title: 'Real-Time Age Prediction',
    description: 'Computer vision model that estimates age from live camera input using deep learning and OpenCV.',
    tech: ['Python', 'OpenCV', 'Deep Learning'],
    gradient: 'from-purple-500 to-pink-500',
    delay: '0',
    repo: 'https://github.com/THANGAMURUGAN07/real-time-age-prediction',
  },
  {
    title: 'Mouse Gesture Detection',
    description: 'Detects and classifies mouse gestures in the browser for interaction and shortcuts.',
    tech: ['JavaScript', 'WebGL', 'ML'],
    gradient: 'from-blue-500 to-cyan-500',
    delay: '200',
    repo: 'https://github.com/THANGAMURUGAN07/mouse-gesture-detection',
  },
  {
    title: 'Speech_to_Speech',
    description: 'A speech-to-speech pipeline that performs speech recognition, transforms the text, and synthesizes speech output.',
    tech: ['Python', 'SpeechRecognition', 'TTS'],
    gradient: 'from-green-500 to-teal-500',
    delay: '400',
    repo: 'https://github.com/THANGAMURUGAN07/speech_to_speech',
  },
  {
    title: 'CRM_Chatbot',
    description: 'A CRM-focused chatbot built with Rasa and LangChain to automate customer interactions and support workflows.',
    tech: ['Python', 'Rasa', 'LangChain'],
    gradient: 'from-orange-500 to-red-500',
    delay: '600',
    repo: 'https://github.com/THANGAMURUGAN07/crm_chatbot',
  },
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">Innovative AI solutions I've built</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${isVisible ? project.delay : '0'}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse-slow`}></div>

              <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 group-hover:border-transparent transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"
                     style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>

                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:rotate-12 group/btn"
                      >
                        <Github className="w-5 h-5 text-gray-300 group-hover/btn:text-white" />
                      </a>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:rotate-12 group/btn"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-300 group-hover/btn:text-white" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-4 py-2 rounded-full text-sm font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:${project.gradient} group-hover:text-white transition-all duration-300 transform group-hover:scale-105`}
                        style={{
                          transitionDelay: `${hoveredIndex === index ? techIndex * 50 : 0}ms`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://github.com/THANGAMURUGAN07"
            className="inline-block group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
          >
            <span className="relative z-10">View All Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>
    </section>
  );
}
