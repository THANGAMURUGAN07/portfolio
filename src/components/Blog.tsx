import { BookOpen, Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const posts = [
  {
    title: 'Introduction to Deep Learning',
    excerpt: 'Exploring the fundamentals of neural networks and how deep learning is revolutionizing AI applications across industries.',
    date: 'Coming Soon',
    category: 'Deep Learning',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Natural Language Processing Experiments',
    excerpt: 'Hands-on experiments with NLP models, including sentiment analysis, text generation, and language understanding.',
    date: 'Coming Soon',
    category: 'NLP',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Computer Vision Projects',
    excerpt: 'Building real-world computer vision applications using OpenCV and deep learning for image recognition and object detection.',
    date: 'Coming Soon',
    category: 'Computer Vision',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'AI Research Notes',
    excerpt: 'Insights and learnings from recent AI research papers, exploring cutting-edge techniques and breakthrough discoveries.',
    date: 'Coming Soon',
    category: 'Research',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
          Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Insights</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className={`group glass-card p-5 md:p-8 rounded-2xl transition-all duration-700 hover:scale-105 cursor-pointer relative overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${post.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r ${post.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>

              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-gradient-to-r ${post.gradient} rounded-lg group-hover:rotate-12 transition-transform duration-300`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className={`px-4 py-1 bg-gradient-to-r ${post.gradient} bg-opacity-20 rounded-full text-sm font-medium text-white border border-white/20`}>
                  {post.category}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2.5 md:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                {post.title}
              </h3>

              <p className="text-gray-400 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${post.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
