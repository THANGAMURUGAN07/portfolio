import { useEffect, useRef, useState } from 'react';

// Only include these six projects (user-provided list)
const projects = [
  {
    title: 'Photo AI',
    description: 'Photo matching / face recognition pipeline for finding similar photos by facial embeddings.',
    tech: ['Computer Vision', 'Face Recognition', 'Python', 'OpenCV', 'Deep Learning'],
    gradient: 'from-pink-500 to-purple-500',
    repo: 'https://github.com/THANGAMURUGAN07/photo_ai',
    details: 'Extracts facial embeddings and performs nearest-neighbor search across a photo index; includes preprocessing and optional demo.'
  },
  {
    title: 'CRM Chatbot',
    description: 'Customer relationship chatbot tailored for CRM workflows and ticket routing.',
    tech: ['Rasa', 'APIs', 'Integrations'],
    gradient: 'from-indigo-500 to-blue-500',
    repo: 'https://github.com/THANGAMURUGAN07/crm_chatbot',
    details: 'Automates common customer queries, integrates with CRM backends and supports webhook-based actions.'
  },
  {
    title: 'CRM Bot',
    description: 'Lightweight CRM automation bot for routine tasks and message handling.',
    tech: ['Node.js', 'APIs', 'Integrations'],
    gradient: 'from-yellow-500 to-orange-500',
    repo: 'https://github.com/THANGAMURUGAN07/crm_bot',
    details: 'Bot helpers and automations designed to work with CRM backends and messaging platforms.'
  },
  {
    title: 'Speech to Speech',
    description: 'Speech-to-speech pipeline for translation and voice-preserving transformations.',
    tech: ['ASR', 'TTS', 'Transformer', 'Python'],
    gradient: 'from-teal-500 to-cyan-500',
    repo: 'https://github.com/THANGAMURUGAN07/speech_to_speech',
    details: 'Streaming ASR-to-TTS pipeline with translation capabilities and demo scripts.'
  },
  {
    title: 'Real-Time Age Prediction',
    description: 'Computer vision app that detects faces and estimates age in real-time streams.',
    tech: ['OpenCV', 'Deep Learning', 'Python', 'CNN'],
    gradient: 'from-purple-500 to-pink-500',
    repo: 'https://github.com/THANGAMURUGAN07/real-time-age-prediction',
    details: 'Lightweight age estimator optimized for webcam streams with preprocessing and training scripts.'
  },
  {
    title: 'Mouse Gesture Detection',
    description: 'Gesture detection and recognition using keypoint tracking and classification models.',
    tech: ['MediaPipe', 'TensorFlow', 'Python'],
    gradient: 'from-green-500 to-emerald-500',
    repo: 'https://github.com/THANGAMURUGAN07/mouse-gesture-detection',
    details: 'Detects hand/keypoint gestures and maps them to actions; includes demo and mapping to accessible outputs.'
  },
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className={`text-3xl md:text-5xl font-bold text-white text-center mb-10 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(project)}
              className={`group glass-card p-5 md:p-8 rounded-2xl transition-all duration-700 hover:scale-105 cursor-pointer relative overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r ${project.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r ${project.gradient} bg-opacity-10 rounded-full text-xs md:text-sm font-medium text-white border border-white/20 hover:scale-110 transition-transform duration-300`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>
      </div>

        

      {/* Modal for project details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="bg-gray-900 rounded-2xl max-w-3xl w-full p-5 md:p-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
            <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">{selectedProject.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(selectedProject.tech || []).map((t: string, i: number) => (
                <span key={i} className="px-2.5 py-1 bg-white/5 rounded-full text-xs md:text-sm text-white">{t}</span>
              ))}
            </div>

            {selectedProject.details && (
              <div className="text-gray-300 leading-relaxed mb-4">{selectedProject.details}</div>
            )}

            <div className="flex gap-2 md:gap-3">
              <a
                href={selectedProject.repo || 'https://github.com/THANGAMURUGAN07'}
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); window.open(selectedProject.repo || 'https://github.com/THANGAMURUGAN07', '_blank', 'noopener,noreferrer'); }}
                className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-sm md:text-base"
              >
                View on GitHub
              </a>
              <button onClick={() => setSelectedProject(null)} className="px-3 py-2 md:px-4 md:py-2 border rounded-full text-white text-sm md:text-base">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
