import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Tag, X } from 'lucide-react';

const blogPosts = [
  {
    title: 'Understanding Deep Learning Architectures',
    excerpt: 'Exploring the fundamentals of neural networks and how they power modern AI applications.',
    date: 'March 15, 2024',
    readTime: '8 min read',
    tags: ['Deep Learning', 'Neural Networks'],
    gradient: 'from-blue-500 to-cyan-500',
    content: [
      'Deep learning architectures are built from layers of differentiable functions that gradually transform raw inputs into higher‑level representations. At the core is the feed‑forward network, where each layer applies an affine transform followed by a non‑linearity.',
      'Modern networks introduce architectural patterns like residual connections (ResNets) to ease optimization, attention mechanisms to dynamically weight features, and normalization layers that stabilize training. These building blocks enable very deep models to converge.',
      'Choosing the right architecture depends on the modality and constraints: CNNs for images, transformers for sequences, and hybrids for multi‑modal tasks. Practical work balances capacity with regularization, data quality, and compute budgets.'
    ],
  },
  {
    title: 'Computer Vision: From Theory to Practice',
    excerpt: 'A comprehensive guide to implementing computer vision systems using OpenCV and TensorFlow.',
    date: 'March 10, 2024',
    readTime: '12 min read',
    tags: ['Computer Vision', 'OpenCV'],
    gradient: 'from-purple-500 to-pink-500',
    content: [
      'A production‑ready vision system starts with data: acquisition, labeling, and augmentation. Classical pipelines apply geometric transforms, color normalization, and background suppression before learning.',
      'With deep learning, transfer learning from pretrained models drastically reduces data needs. Fine‑tune a backbone (e.g., MobileNet, ResNet) for classification or plug it into detection/segmentation heads such as YOLO or U‑Net.',
      'Deployment considerations include runtime (OpenCV, ONNX Runtime), quantization for edge devices, and robust monitoring for drift and false positives.'
    ],
  },
  {
    title: 'Natural Language Processing Techniques',
    excerpt: 'Diving into NLP methods for text analysis, sentiment detection, and language understanding.',
    date: 'March 5, 2024',
    readTime: '10 min read',
    tags: ['NLP', 'Text Analysis'],
    gradient: 'from-green-500 to-teal-500',
    content: [
      'Tokenization and embeddings transform raw text into vectors. Subword methods (BPE, WordPiece) handle rare words gracefully and power most transformer models.',
      'For downstream tasks, choose between encoder‑only (BERT) for understanding, decoder‑only (GPT‑style) for generation, or encoder‑decoder (T5) for sequence‑to‑sequence problems. Few‑shot prompting and lightweight adapters reduce training cost.',
      'Evaluation should include standard metrics and qualitative error analysis; pay special attention to bias, toxicity, and robustness.'
    ],
  },
  {
    title: 'Building Intelligent Chatbots with AI',
    excerpt: 'Learn how to create conversational AI systems using Rasa, LangChain, and modern frameworks.',
    date: 'February 28, 2024',
    readTime: '15 min read',
    tags: ['Chatbots', 'AI'],
    gradient: 'from-orange-500 to-red-500',
    content: [
      'Effective chatbots combine intent classification, entity extraction, dialog management, and tool integration. Start with clear user journeys and a robust NLU model.',
      'Rasa provides deterministic policies and retrieval actions, while LangChain orchestrates LLMs and tools for flexible reasoning. Hybrid systems use rules for safety‑critical paths and LLMs for open‑ended questions.',
      'Production bots need analytics, fallbacks, guardrails, and continuous improvement loops derived from conversation logs.'
    ],
  },
];

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Blog & Insights
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">Thoughts, tutorials, and research notes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${isVisible ? index * 150 : 0}ms` }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${post.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500`}></div>

              <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 group-hover:border-transparent transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl h-full flex flex-col">
                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"></div>

                <div className="relative p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:text-white transition-all duration-300"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:text-purple-400 transition-colors duration-300 group/link"
                  >
                    Read More
                    <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>

                <div className={`h-1 bg-gradient-to-r ${post.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Removed "View All Articles" button per request */}
      </div>

      {/* Article Modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActiveIndex(null)} />
          <div className="relative max-w-3xl w-full bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h3 className="text-xl font-semibold text-white">{blogPosts[activeIndex].title}</h3>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto text-gray-300">
              {blogPosts[activeIndex].content?.map((para, i) => (
                <p key={i} className="leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
