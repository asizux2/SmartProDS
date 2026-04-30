import { useState, useEffect } from 'react'

const LOGO_CACHE = {}

export function CompanyLogo({ companyName, domain, size = 40 }) {
  const [logoUrl, setLogoUrl] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getLogoUrl = () => {
      if (LOGO_CACHE[companyName]) {
        return LOGO_CACHE[companyName]
      }
      
      const cleanDomain = domain || companyName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/(egypt|co|inc|llc|ltd)$/g, '')
      
      const url = `https://logo.clearbit.com/${cleanDomain}.com`
      LOGO_CACHE[companyName] = url
      return url
    }

    setLogoUrl(getLogoUrl())
  }, [companyName, domain])

  const handleError = () => {
    setError(true)
  }

  if (error || !logoUrl) {
    return (
      <div 
        className="rounded-lg flex items-center justify-center font-bold text-gray-500"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: '#1E1E1E',
          fontSize: size * 0.35 
        }}
      >
        {companyName.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={logoUrl}
      alt={`${companyName} logo`}
      onError={handleError}
      className="rounded-lg object-contain"
      style={{ width: size, height: size }}
    />
  )
}

export function CompanyLogoGrid({ companies, size = 48 }) {
  return (
    <div className="flex flex-wrap gap-4">
      {companies.map((company, i) => (
        <CompanyLogo 
          key={i}
          companyName={company.name}
          domain={company.domain}
          size={size}
        />
      ))}
    </div>
  )
}

export default CompanyLogo