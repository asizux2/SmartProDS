import React from 'react'

export default function Logo({ entity, className = "w-8 h-8" }) {
  if (!entity) return <div className={`${className} bg-gray-800 rounded-full`} />;
  
  const logoUrl = entity.logo_url;
  const fallbackColor = entity.color || '#1E88E5';
  const firstLetter = entity.name ? entity.name.charAt(0).toUpperCase() : '?';

  return (
    <div className={`relative flex items-center justify-center ${className} overflow-hidden rounded-lg transition-transform hover:scale-110 duration-300`}>
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt={entity.name} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div 
        className="absolute inset-0 hidden items-center justify-center text-white font-bold text-sm" 
        style={{ backgroundColor: fallbackColor }}
      >
        {firstLetter}
      </div>
    </div>
  );
}
