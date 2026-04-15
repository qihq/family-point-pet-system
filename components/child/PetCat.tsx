// UTF-8 no BOM | inline SVG cat
export function PetCat() {
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
      style={{ animation: "pet-breathe 2.5s ease-in-out infinite" }}
      aria-label={"pet-cat"}
    >
      <ellipse cx="40" cy="52" rx="22" ry="20" fill="#FFB347" />
      <circle cx="40" cy="30" r="18" fill="#FFB347" />
      <polygon points="24,14 18,2 30,12" fill="#FFB347" />
      <polygon points="56,14 62,2 50,12" fill="#FFB347" />
      <polygon points="24,13 20,5 28,11" fill="#FF8C69" />
      <polygon points="56,13 60,5 52,11" fill="#FF8C69" />
      <circle cx="33" cy="28" r="4" fill="#2D2A3D" />
      <circle cx="47" cy="28" r="4" fill="#2D2A3D" />
      <circle cx="35" cy="26" r="1.5" fill="white" />
      <circle cx="49" cy="26" r="1.5" fill="white" />
      <ellipse cx="40" cy="35" rx="3" ry="2" fill="#FF8C69" />
      <path d="M36,38 Q40,42 44,38" fill="none" stroke="#2D2A3D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="34" x2="34" y2="36" stroke="#2D2A3D" strokeWidth="1" opacity="0.6" />
      <line x1="16" y1="38" x2="34" y2="37" stroke="#2D2A3D" strokeWidth="1" opacity="0.6" />
      <line x1="64" y1="34" x2="46" y2="36" stroke="#2D2A3D" strokeWidth="1" opacity="0.6" />
      <line x1="64" y1="38" x2="46" y2="37" stroke="#2D2A3D" strokeWidth="1" opacity="0.6" />
      <path d="M62,64 Q75,55 68,42 Q72,38 65,40" fill="none" stroke="#FFB347" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

// codex-ok: 2026-04-10T11:31:00+08:00