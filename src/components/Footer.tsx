// Inline SVG icons to avoid deprecated lucide-react named exports
function IconGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18A10.97 10.97 0 0112 6.8c.97.005 1.95.13 2.86.38 2.18-1.5 3.14-1.18 3.14-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.71 5.39-5.29 5.67.41.35.78 1.04.78 2.1 0 1.52-.014 2.75-.014 3.13 0 .3.2.66.79.55A11.51 11.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function IconLinkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.78v2.2h.07c.67-1.27 2.3-2.6 4.74-2.6C22.8 7.6 24 10.3 24 14.2V24h-5v-8.1c0-1.93-.03-4.42-2.7-4.42-2.7 0-3.11 2.1-3.11 4.27V24H7.5V8z" />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403.59.212 1.01.468 1.45.91.44.44.698.86.91 1.45.163.46.35 1.26.403 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43-.212.59-.468 1.01-.91 1.45-.44.44-.86.698-1.45.91-.46.163-1.26.35-2.43.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403-.59-.212-1.01-.468-1.45-.91-.44-.44-.698-.86-.91-1.45-.163-.46-.35-1.26-.403-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43.212-.59.468-1.01.91-1.45.44-.44.86-.698 1.45-.91.46-.163 1.26-.35 2.43-.403C8.416 2.212 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 100 13.4 6.7 6.7 0 000-13.4zm0 11a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zm6.8-11.9a1.56 1.56 0 11-3.12 0 1.56 1.56 0 013.12 0z" />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="grid-background"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 animate-fade-in-up">
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-6">
            <a
              href="https://github.com/THANGAMURUGAN07"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
            >
              <IconGithub className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/thangamuruganr07"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
            >
              <IconLinkedin className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/mr_elite_0_0_1/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
            >
              <IconInstagram className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            
            
          </div>

          <div className="text-center space-y-2">
            <p className="text-gray-400">
              <span className="text-white font-semibold">Thangamurugan R</span> - Artificial Intelligence Student
            </p>
            <p className="text-gray-500 text-sm">
              679/8 Aaladipatti Street, Venkateshwarapuram, Srivilliputtur
            </p>
            <p className="text-gray-500 text-sm">
              <a href="mailto:ramarv7859@gmail.com" className="inline-flex items-center gap-2 underline hover:text-white">
                <IconMail className="w-4 h-4 text-gray-400" />
                <span>ramarv7859@gmail.com</span>
              </a>
              <span className="mx-2">|</span>
              <span>9080002378</span>
            </p>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 Thangamurugan R. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
