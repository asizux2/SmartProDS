import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Logo = () => (
  <svg viewBox="0 0 32 32" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2D6DF6" />
        <stop offset="100%" stopColor="#1a5de0" />
      </linearGradient>
    </defs>
    <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="url(#ng)" />
    <circle cx="16" cy="10" r="2" fill="#0A0A0A" />
    <circle cx="10" cy="21" r="2" fill="#0A0A0A" />
    <circle cx="22" cy="21" r="2" fill="#0A0A0A" />
    <line x1="16" y1="10" x2="10" y2="21" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="10" x2="22" y2="21" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="21" x2="22" y2="21" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="17" r="1.5" fill="#FFFFFF" opacity="0.8" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Research', href: '/research' },
    { label: 'Dashboards', href: '/dashboards' },
    { label: 'CRM', href: '/crm' },
    { label: 'Skills', href: '/skills' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #222222' : '1px solid transparent',
      }}>
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2">
          <Logo />
          <span className="font-mono-custom text-sm font-semibold tracking-widest" style={{ color: '#2D6DF6' }}>
            SmartProDS
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link key={link.label} to={link.href}
              className="text-sm font-body transition-colors duration-200"
              style={{ color: '#6B6B6B' }}
              onMouseEnter={e => (e.target.style.color = '#F5F5F5')}
              onMouseLeave={e => (e.target.style.color = '#6B6B6B')}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a href="#book"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded transition-all duration-200 pulse-glow"
          style={{ background: '#2D6DF6', color: '#F5F5F5' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1a5de0')}
          onMouseLeave={e => (e.currentTarget.style.background = '#2D6DF6')}>
          Book a Call →
        </a>

        {/* Mobile toggle */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {[0,1,2].map(i => (
            <span key={i} className="block w-5 h-px"
              style={{ background: menuOpen ? '#2D6DF6' : '#F5F5F5' }} />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 border-t"
          style={{ background: '#0A0A0A', borderColor: '#222222' }}>
          {links.map(link => (
            <Link key={link.label} to={link.href} className="text-sm"
              style={{ color: '#F5F5F5' }} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href="#book"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded"
            style={{ background: '#2D6DF6', color: '#F5F5F5' }}
            onClick={() => setMenuOpen(false)}>
            Book a Call →
          </a>
        </div>
      )}
    </nav>
  )
}
