import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setResult(null);

    const tryEmailJS = async () => {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            name: formData.name,
            email: formData.email,
            user_name: formData.name,
            user_email: formData.email,
            reply_to: formData.email,
            message: formData.message,
          },
          { publicKey }
        );
        setResult({ ok: true, message: 'Message sent via EmailJS fallback. Thank you!' });
        setFormData({ name: '', email: '', message: '' });
        return true;
      }
      return false;
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setResult({ ok: true, message: 'Message sent successfully. I will get back to you soon!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const tried = await tryEmailJS();
        if (!tried) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || 'Failed to send message');
        }
      }
    } catch (err: any) {
      // Network/proxy errors (e.g., ECONNREFUSED) → attempt EmailJS
      const tried = await tryEmailJS();
      if (!tried) {
        setResult({ ok: false, message: err?.message || 'Something went wrong. Please try again later.' });
      }
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg">Let's collaborate on something amazing</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="group">
              <h3 className="text-3xl font-bold text-white mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group/item">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-500 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-xl opacity-0 group-hover/item:opacity-50 transition-opacity duration-500 animate-float pointer-events-none"></div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <a href="mailto:ramarv7859@gmail.com" className="text-white text-lg hover:text-blue-400 transition-colors duration-300">
                      ramarv7859@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-500 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-xl opacity-0 group-hover/item:opacity-50 transition-opacity duration-500 animate-float pointer-events-none"></div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <a href="tel:9080002378" className="text-white text-lg hover:text-purple-400 transition-colors duration-300">
                      9080002378
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-500 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl blur-xl opacity-0 group-hover/item:opacity-50 transition-opacity duration-500 animate-float pointer-events-none"></div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="text-white text-lg">
                      679/8 Aaladipatti Street,<br />
                      Venkateshwarapuram,<br />
                      Srivilliputtur
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
                  Feel free to reach out!
                </p>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-xl border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                  required
                />
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-0 transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-30' : ''} pointer-events-none`}></div>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-xl border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
                  required
                />
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-30' : ''} pointer-events-none`}></div>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-xl border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all duration-300 resize-none"
                  required
                ></textarea>
                <div className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl blur-xl opacity-0 transition-opacity duration-300 ${focusedField === 'message' ? 'opacity-30' : ''} pointer-events-none`}></div>
              </div>

              {result && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl border ${
                    result.ok ? 'border-green-500/40 bg-green-500/10 text-green-300' : 'border-red-500/40 bg-red-500/10 text-red-300'
                  }`}
                >
                  {result.ok ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span className="text-sm">{result.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className={`group relative w-full px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 text-white ${
                  sending ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>{sending ? 'Sending…' : 'Send Message'}</span>
                  <Send className="w-5 h-5 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
