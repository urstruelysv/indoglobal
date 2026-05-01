'use client';

import { useState, useEffect } from 'react';
import { X, Trophy, Calendar, GraduationCap, Phone, Mail, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRIZES = [
  { rank: '1st', pct: '100%', emoji: '🥇', bg: 'from-yellow-400 to-amber-500', txt: 'text-amber-900' },
  { rank: '2nd', pct: '75%',  emoji: '🥈', bg: 'from-slate-300 to-slate-400',  txt: 'text-slate-800' },
  { rank: '3rd', pct: '50%',  emoji: '🥉', bg: 'from-orange-400 to-amber-600', txt: 'text-amber-900' },
  { rank: '4th–10th', pct: '20%', emoji: '🏅', bg: 'from-teal-400 to-teal-600', txt: 'text-teal-900' },
];

export default function ScholarshipPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('igs-scholarship-popup')) return;
    const t = setTimeout(() => setOpen(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  function close() {
    sessionStorage.setItem('igs-scholarship-popup', '1');
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="scholarship-popup-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
            onClick={close}
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >

            {/* ── Header band ───────────────────────────────────────────── */}
            <div
              className="relative px-6 pt-6 pb-6 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #083F3C 0%, #0B5E58 50%, #0F766E 100%)',
              }}
            >
              {/* Decorative stars */}
              <Star size={10} fill="currentColor" className="absolute top-4 right-20 text-[#FFB84D]/30" />
              <Star size={7}  fill="currentColor" className="absolute top-9 right-12 text-[#FFB84D]/20" />
              <Star size={13} fill="currentColor" className="absolute top-5 left-24 text-[#FFB84D]/20" />
              <Star size={8}  fill="currentColor" className="absolute bottom-5 left-8  text-[#FFB84D]/15" />

              {/* Dismiss */}
              <button
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Close scholarship popup"
              >
                <X size={14} />
              </button>

              {/* Logo + title */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0">
                  <img src="/igs-logo.png" alt="IGS" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <p className="text-[#FFB84D] text-[10px] font-bold uppercase tracking-[0.18em] mb-1">
                    IGS – Bright Minds
                  </p>
                  <h2
                    id="scholarship-popup-title"
                    className="font-serif font-bold text-white text-2xl leading-tight"
                  >
                    Merit Scholarship
                    <br />Drive
                  </h2>
                </div>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 bg-white/10 ring-1 ring-white/10 rounded-full px-3 py-1.5 text-white text-[11px] font-medium">
                  <Calendar size={11} />
                  24 May 2026
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 ring-1 ring-white/10 rounded-full px-3 py-1.5 text-white text-[11px] font-medium">
                  <GraduationCap size={11} />
                  Grade 1 – 7
                </span>
              </div>
            </div>

            {/* ── Body ──────────────────────────────────────────────────── */}
            <div className="bg-white px-6 py-5">

              <p className="text-center text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400 mb-3">
                Prize Rewards · Tuition Fee Concession
              </p>

              {/* Prize tiles */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {PRIZES.map((p) => (
                  <div key={p.rank} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-full rounded-xl bg-gradient-to-b ${p.bg} px-1.5 py-2.5 flex flex-col items-center shadow-sm`}
                    >
                      <span className="text-xl leading-none">{p.emoji}</span>
                      <span className={`font-black text-base leading-none mt-1 ${p.txt}`}>
                        {p.pct}
                      </span>
                      <span className={`text-[8px] font-bold mt-0.5 ${p.txt} opacity-70`}>
                        off fees
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-gray-400 text-center leading-tight">
                      {p.rank}
                    </span>
                  </div>
                ))}
              </div>

              {/* Special benefit */}
              <div className="flex items-center justify-between bg-teal-50 border border-teal-100 rounded-2xl px-4 py-2.5 mb-4">
                <span className="text-xs text-teal-700">
                  🎁&nbsp; <span className="font-semibold">Special benefit</span> for all participants
                </span>
                <span className="font-black text-teal-800 text-lg">10%</span>
              </div>

              {/* CTA */}
              <a
                href="https://forms.gle/Nr9jFTnF761F5s9X8"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="block w-full text-center text-white font-bold text-sm py-3.5 rounded-2xl transition-opacity hover:opacity-90 active:scale-[0.98] select-none"
                style={{ background: 'linear-gradient(135deg, #083F3C, #0F766E)' }}
              >
                Register for the Scholarship &rarr;
              </a>

              {/* Contact */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-3.5">
                <a
                  href="tel:+912168989898"
                  className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-teal-700 transition-colors"
                >
                  <Phone size={10} />
                  91 21 68 98 98
                </a>
                <span className="text-gray-200">·</span>
                <a
                  href="tel:+912198383838"
                  className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-teal-700 transition-colors"
                >
                  <Phone size={10} />
                  91 21 98 38 38
                </a>
                <span className="text-gray-200">·</span>
                <a
                  href="mailto:indoglobalschool@gmail.com"
                  className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-teal-700 transition-colors"
                >
                  <Mail size={10} />
                  indoglobalschool@gmail.com
                </a>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
