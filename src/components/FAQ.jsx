import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const faqs = [
  { q: 'What file formats do you accept?',
    a: 'STG exports, SPSS (.sav), Excel (.xlsx), CSV, XML, and flat survey exports from any major platform.' },
  { q: 'Do I need to clean the data before sending it?',
    a: 'No. Data cleaning is part of the sprint. Send it raw.' },
  { q: "Can you match our company's visual style?",
    a: "Yes. Send your brand guidelines or a reference dashboard and I'll match it." },
  { q: 'Do you work with non-Egypt MR data?',
    a: "Yes — I've worked on GCC, MENA, and African market data. Location is irrelevant, file format is what matters." },
  { q: 'Can I request a retainer for ongoing waves?',
    a: 'Yes. The Tracker and Enterprise tiers support multi-wave and monthly retainer arrangements.' },
  { q: "What if I'm not happy with the output?",
    a: 'Sprint tier has a full money-back guarantee if delivered late. Revision round covers all quality concerns.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b" style={{ borderColor: '#222222' }}>
      <button className="w-full flex items-center justify-between py-5 px-1 text-left gap-4"
        onClick={() => setOpen(!open)}>
        <span className="font-medium text-base" style={{ color: '#F5F5F5' }}>{q}</span>
        <span className="font-mono-custom text-lg shrink-0 transition-transform duration-200"
          style={{ color: '#2D6DF6', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && <p className="pb-5 px-1 text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{a}</p>}
    </div>
  )
}

export default function FAQ() {
  const [ref, inView] = useInView(0.1)
  return (
    <section className="py-32" style={{ background: '#111111', borderTop: '1px solid #222222', borderBottom: '1px solid #222222' }}>
      <div className="max-w-content mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label mb-4">// FAQ</p>
          <h2 className="font-display text-5xl md:text-6xl mb-12 leading-tight" style={{ color: '#F5F5F5' }}>
            COMMON QUESTIONS.
          </h2>
        </div>
        <div className={`max-w-3xl transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
        </div>
      </div>
    </section>
  )
}
