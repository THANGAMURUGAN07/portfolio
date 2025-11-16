import { GraduationCap, Award } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const education = [
  {
    degree: 'Bachelor of Technology',
    field: 'Artificial Intelligence',
    status: 'Currently Pursuing',
    description: 'Specializing in Machine Learning, Deep Learning, Computer Vision, and Natural Language Processing.',
  },
  {
    degree: '12th (Higher Secondary)',
    field: 'Higher Secondary Education',
    status: 'Completed',
    school: 'PNUP kamarajar matric higher secondary school',
    marks: '82.67%'
  },
  {
    degree: '10th (Secondary School)',
    field: 'Secondary Education',
    status: 'Completed',
    school: 'PNUP kamarajar matric higher secondary school',
    marks: '78%'
  }
];

const coursework = [
  {
    title: 'Big Data 301',
    provider: 'Big Data & Analytics',
    link: 'https://www.linkedin.com/posts/thangamuruganr07_bigdata-analytics-machinelearning-activity-7260225990155489281-fzVG/'
  },
  {
    title: 'Deep Learning for Developers',
    provider: 'Infosys SpringBoard',
    link: 'https://www.linkedin.com/posts/thangamuruganr07_deeplearning-ai-machinelearning-activity-7260226540213272577-tdDl/'
  },
  {
    title: 'Microsoft Power BI Data Analyst',
    provider: 'ICT Academy',
    link: 'https://www.linkedin.com/posts/thangamuruganr07_powerbi-dataanalytics-certificationcomplete-activity-7184593721013776384-psFL/'
  },
  {
    title: 'Foundation of Cyber Security',
    provider: 'Google Education',
    link: 'https://www.linkedin.com/posts/thangamuruganr07_activity-7135982780680704000-YmvW/'
  },
  {
    title: 'Machine Learning using Python',
    provider: 'Udemy',
    link: 'https://www.linkedin.com/posts/thangamuruganr07_machinelearning-python-datascience-activity-7260227294445621249-RzmB/'
  }
];

export default function Education() {
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className={`text-4xl md:text-5xl font-bold text-white text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Education</span>
        </h2>

        <div className="max-w-4xl mx-auto relative mb-14 md:mb-20">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          {education.map((edu, index) => (
            <div
              key={index}
              className={`relative pl-20 md:pl-24 pb-10 md:pb-12 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className="absolute left-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-glow animate-pulse-slow">
                <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>

              <div className="glass-card p-5 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                <h4 className="text-lg md:text-xl text-blue-400 mb-2">{edu.field}</h4>
                <p className="text-purple-400 font-semibold mb-2">{edu.status}</p>
                {edu.school && (
                  <p className="text-gray-300 font-medium mb-2">{edu.school}</p>
                )}
                {edu.marks && (
                  <p className="text-gray-400 mb-4">Marks: <span className="font-semibold text-white">{edu.marks}</span></p>
                )}
                {edu.description && (
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">{edu.description}</p>
                )}
              </div>

              <div className="absolute left-6 md:left-8 top-12 md:top-16 w-12 md:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className={`max-w-5xl mx-auto pt-2 md:pt-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}> 
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Coursework & Certifications</span>
          </h3>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {coursework.map((c, i) => (
              <div key={i} className="glass-card p-5 md:p-6 rounded-2xl flex gap-3 md:gap-4 items-start hover:scale-[1.02] transition-transform duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-glow">
                  <Award className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base md:text-lg font-semibold text-white mb-1">{c.title}</h4>
                  <p className="text-xs md:text-sm text-blue-300 mb-2">{c.provider}</p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs md:text-sm font-medium text-purple-300 hover:text-purple-200 hover:underline"
                    >
                      View Credential ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
