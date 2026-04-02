const Logo = () => (
  <svg viewBox="0 0 32 32" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fgl" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2D6DF6" />
        <stop offset="100%" stopColor="#1a5de0" />
      </linearGradient>
    </defs>
    <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="url(#fgl)" />
    <circle cx="16" cy="10" r="2" fill="#0A0A0A" />
    <circle cx="10" cy="21" r="2" fill="#0A0A0A" />
    <circle cx="22" cy="21" r="2" fill="#0A0A0A" />
    <line x1="16" y1="10" x2="10" y2="21" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="10" x2="22" y2="21" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="21" x2="22" y2="21" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="17" r="1.5" fill="#FFFFFF" opacity="0.8" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: '#111111', borderColor: '#222222' }}>
      <div className="max-w-content mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Logo />
              <span className="font-mono-custom text-sm font-semibold tracking-widest" style={{ color: '#2D6DF6' }}>
                SmartProDS
              </span>
            </div>
            <div className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>
              MR Dashboard Sprint
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-6">
            {['Services','Work','Pricing','Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="font-mono-custom text-xs transition-colors"
                style={{ color: '#6B6B6B' }}
                onMouseEnter={e => (e.target.style.color = '#F5F5F5')}
                onMouseLeave={e => (e.target.style.color = '#6B6B6B')}>
                {link}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/eslam-khaled91/"
              target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border rounded transition-all"
              style={{ borderColor: '#222222', color: '#6B6B6B' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2D6DF6'; e.currentTarget.style.color = '#2D6DF6' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#222222'; e.currentTarget.style.color = '#6B6B6B' }}
              aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="mailto:eslam.khaled@smartprods.com"
              className="w-8 h-8 flex items-center justify-center border rounded transition-all"
              style={{ borderColor: '#222222', color: '#6B6B6B' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2D6DF6'; e.currentTarget.style.color = '#2D6DF6' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#222222'; e.currentTarget.style.color = '#6B6B6B' }}
              aria-label="Email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t flex flex-col sm:flex-row justify-between gap-2"
          style={{ borderColor: '#222222' }}>
          <p className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>
            © 2025 SmartProDS. All rights reserved.
          </p>
          <p className="font-mono-custom text-xs" style={{ color: '#6B6B6B' }}>
            Cairo, Egypt · Serving GCC & MENA
          </p>
        </div>
      </div>
    </footer>
  )
}
