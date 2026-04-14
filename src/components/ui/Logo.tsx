export function Logo() {
  return (
    <div className="flex items-center gap-3 group">
      <svg width="44" height="44" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:-rotate-6 transition-transform duration-300">
         <circle cx="50" cy="50" r="45" fill="none" stroke="#1B4F72" strokeWidth="6" />
         <path d="M 30,15 A 45,45 0 0,1 70,15" fill="none" stroke="#F39C12" strokeWidth="6" strokeLinecap="round" />
         <path d="M 35,40 L 40,75 L 60,75 L 65,40 Z" fill="#6B8EAC" />
         <path d="M 35,40 Q 50,45 65,40 L 65,45 Q 60,55 58,45 L 35,45 Z" fill="#F39C12" />
         <line x1="68" y1="42" x2="80" y2="42" stroke="#4A4A4A" strokeWidth="4" />
         <line x1="80" y1="42" x2="85" y2="75" stroke="#4A4A4A" strokeWidth="4" />
         <rect x="62" y="38" width="10" height="10" rx="3" fill="#F39C12" />
         <path d="M 35,40 C 35,22 65,22 65,40" fill="none" stroke="#8A8A8A" strokeWidth="3" />
      </svg>
      <div className="flex flex-col">
        <div className="font-bold text-xl leading-none tracking-widest text-[#111111]">
          BAHRAIN
        </div>
        <div className="font-medium text-[15px] leading-tight tracking-[0.2em] text-[#6B8EAC]">
          PAINTERS
        </div>
      </div>
    </div>
  )
}
