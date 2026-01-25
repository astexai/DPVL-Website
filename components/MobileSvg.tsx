export default function MobileSvg()
{
    return <div>
        <div className="block sm:hidden absolute inset-0 w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-[#051038] via-[#1a237e] to-[#c2185b]" />
      <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-[#c2185b]/60 to-transparent mix-blend-overlay" />
      <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M20 100 L40 0 L55 0 L35 100 Z" fill="#00aaff" fillOpacity="0.5" />
        <path d="M5 100 L25 0 L30 0 L10 100 Z" fill="#00aaff" fillOpacity="0.3" />
        <path d="M60 100 L80 0 L95 0 L75 100 Z" fill="#ff00cc" fillOpacity="0.5" />
        <path d="M85 100 L95 0 L100 0 L90 100 Z" fill="#ff00cc" fillOpacity="0.6" />
      </svg>
    </div>
    </div>
}