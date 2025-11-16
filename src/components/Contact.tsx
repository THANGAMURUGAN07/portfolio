import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const sendEmail = async () => {
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMessage('');

    const emailjsService = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailjsTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailjsKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const emailjsEnabled = !!(emailjsService && emailjsTemplate && emailjsKey);

    try {
      if (emailjsEnabled) {
        // Send via EmailJS
        const result = await emailjs.send(
          emailjsService,
          emailjsTemplate,
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          { publicKey: emailjsKey }
        );
        if (result.status !== 200) {
          throw new Error(`EmailJS failed (status ${result.status})`);
        }
        setStatus('sent');
        return;
      }

      // Fallback to backend API
      const endpoint = (import.meta.env.VITE_EMAIL_API_URL || 'http://localhost:3001') + '/send-email';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data as any).error || `Request failed (${res.status})`);
      }
      setStatus('sent');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // eslint-disable-next-line no-console
      console.error('Send email failed', msg);
      setErrorMessage(emailjsEnabled ? `EmailJS: ${msg}` : msg);
      setStatus('error');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 animate-fade-in">
          Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Touch</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="space-y-8 animate-fade-in-left">
            <div className="glass-card p-6 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-float">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                  <a href="mailto:ramarv7859@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    ramarv7859@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animation-delay-200">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg animate-float animation-delay-200">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                  <a href="tel:9080002378" className="text-gray-400 hover:text-green-400 transition-colors">
                    9080002378
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-300 animation-delay-400">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg animate-float animation-delay-400">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
                  <p className="text-gray-400">
                    679/8 Aaladipatti Street<br />
                    Venkateshwarapuram, Srivilliputtur
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <form onSubmit={(e) => { e.preventDefault(); sendEmail(); }} className="glass-card p-6 md:p-8 rounded-2xl space-y-5 md:space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-white font-medium block">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 md:py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:border-gray-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-white font-medium block">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 md:py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:border-gray-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-white font-medium block">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2.5 md:py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 hover:border-gray-600 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || !formData.name || !formData.email || !formData.message}
                aria-disabled={status === 'sending' || !formData.name || !formData.email || !formData.message}
                className="group w-full px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send Message'}
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              {status === 'error' && (
                <div className="text-red-400 mt-2">
                  Sending failed: {errorMessage || 'Please try again or email directly.'}
                </div>
              )}
              {status === 'sent' && <div className="text-green-400 mt-2">Message sent — thank you!</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
