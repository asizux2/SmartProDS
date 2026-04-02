const logos = [
  'Alex Bank','Bank Misr','QNB','El Mashreq','AAIB','NBE','Allianz',
  'Vodafone','STC','Ooredoo','Nestlé','Unilever','BMW','World Bank',
  'Alex Bank','Bank Misr','QNB','El Mashreq','AAIB','NBE','Allianz',
  'Vodafone','STC','Ooredoo','Nestlé','Unilever','BMW','World Bank',
]

export default function CredibilityBar() {
  return (
    <section className="py-12 border-y overflow-hidden"
      style={{ background: '#111111', borderColor: '#222222' }}>
      <div className="max-w-content mx-auto px-6 mb-6">
        <p className="font-mono-custom text-xs text-center tracking-widest" style={{ color: '#6B6B6B' }}>
          TRUSTED BY BRANDS ACROSS BANKING · TELECOM · FMCG · GOVERNMENT · AUTOMOTIVE · RETAIL
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap">
          {logos.map((logo, i) => (
            <span key={i}
              className="inline-flex items-center font-mono-custom text-sm font-medium px-8 py-1 shrink-0"
              style={{ color: '#6B6B6B' }}>
              {logo}
              <span className="ml-8 w-1 h-1 rounded-full inline-block" style={{ background: '#222222' }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
