'use client';

import { useState, useEffect } from 'react';
import { X, Trophy } from 'lucide-react';

export default function ScholarshipBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('igs-scholarship-banner')) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem('igs-scholarship-banner', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="banner"
      className="relative z-40 text-white"
      style={{ background: 'linear-gradient(90deg, #083F3C 0%, #0F766E 40%, #0F766E 60%, #083F3C 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3">
        <Trophy size={14} className="text-[#FFB84D] shrink-0 hidden sm:block" />

        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
          <span className="text-[#FFB84D] font-bold text-[11px] sm:text-xs tracking-wide whitespace-nowrap">
            IGS Bright Minds Merit Scholarship Drive
          </span>
          <span className="hidden sm:block text-white/30 text-xs">·</span>
          <span className="text-white/80 text-[10px] sm:text-xs">
            24 May 2026 &nbsp;·&nbsp; Grade 1–7 &nbsp;·&nbsp; Win up to 100% Tuition Fee Concession
          </span>
        </div>

        <a
          href="https://forms.gle/Nr9jFTnF761F5s9X8"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[10px] sm:text-[11px] font-bold bg-[#FFB84D] text-[#083F3C] px-3 py-1.5 rounded-full hover:bg-[#FFC86A] transition-colors whitespace-nowrap"
        >
          Register →
        </a>

        <button
          onClick={dismiss}
          className="shrink-0 text-white/50 hover:text-white transition-colors"
          aria-label="Dismiss scholarship announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
