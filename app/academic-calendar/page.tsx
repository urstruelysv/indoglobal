'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Printer,
  BookOpen,
  Trophy,
  Users,
  PartyPopper,
  Sparkles,
  Sun,
  CloudRain,
  Leaf,
  Snowflake,
  Flower2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type EventType = 'exam' | 'holiday' | 'event' | 'ptm';

type CalEvent = {
  /** ISO yyyy-mm-dd of the start day for this event */
  date: string;
  /** Optional end date (inclusive) for multi-day events */
  endDate?: string;
  title: string;
  type: EventType;
};

type MonthData = {
  /** First day of month, ISO yyyy-mm-01 */
  first: string;
  label: string;
  short: string;
  year: number;
  monthIndex: number; // 0-11
  events: CalEvent[];
};

const eventTypeConfig: Record<
  EventType,
  { label: string; chip: string; dot: string; ring: string; icon: typeof Calendar }
> = {
  exam: {
    label: 'Examination',
    chip: 'bg-rose-100 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
    ring: 'ring-rose-300/60',
    icon: BookOpen,
  },
  holiday: {
    label: 'Holiday',
    chip: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    ring: 'ring-emerald-300/60',
    icon: PartyPopper,
  },
  event: {
    label: 'School Event',
    chip: 'bg-sky-100 text-sky-700 border-sky-200',
    dot: 'bg-sky-500',
    ring: 'ring-sky-300/60',
    icon: Trophy,
  },
  ptm: {
    label: 'PTM',
    chip: 'bg-violet-100 text-violet-700 border-violet-200',
    dot: 'bg-violet-500',
    ring: 'ring-violet-300/60',
    icon: Users,
  },
};

const monthThemes: Record<
  number,
  { name: string; gradient: string; ink: string; soft: string; icon: typeof Sun }
> = {
  0: { name: 'Sankranti', gradient: 'from-amber-200 via-orange-200 to-rose-200', ink: '#9A3412', soft: 'bg-amber-50', icon: Sun },
  1: { name: 'Springtide', gradient: 'from-pink-200 via-rose-200 to-fuchsia-200', ink: '#9D174D', soft: 'bg-pink-50', icon: Flower2 },
  2: { name: 'Holi', gradient: 'from-fuchsia-200 via-purple-200 to-indigo-200', ink: '#6B21A8', soft: 'bg-fuchsia-50', icon: Sparkles },
  3: { name: 'Ugadi', gradient: 'from-lime-200 via-emerald-200 to-teal-200', ink: '#065F46', soft: 'bg-emerald-50', icon: Leaf },
  4: { name: 'Summer', gradient: 'from-yellow-200 via-amber-200 to-orange-200', ink: '#92400E', soft: 'bg-yellow-50', icon: Sun },
  5: { name: 'Monsoon', gradient: 'from-cyan-200 via-sky-200 to-teal-200', ink: '#0C4A6E', soft: 'bg-sky-50', icon: CloudRain },
  6: { name: 'Verdure', gradient: 'from-emerald-200 via-teal-200 to-cyan-200', ink: '#065F46', soft: 'bg-emerald-50', icon: Leaf },
  7: { name: 'Tiranga', gradient: 'from-orange-200 via-amber-100 to-emerald-200', ink: '#9A3412', soft: 'bg-amber-50', icon: Sparkles },
  8: { name: 'Onam', gradient: 'from-yellow-200 via-orange-200 to-pink-200', ink: '#9A3412', soft: 'bg-orange-50', icon: Flower2 },
  9: { name: 'Diwali', gradient: 'from-amber-200 via-orange-200 to-rose-200', ink: '#9F1239', soft: 'bg-amber-50', icon: Sparkles },
  10: { name: 'Kartik', gradient: 'from-violet-200 via-indigo-200 to-blue-200', ink: '#3730A3', soft: 'bg-indigo-50', icon: Sparkles },
  11: { name: 'Winter', gradient: 'from-sky-200 via-cyan-200 to-blue-200', ink: '#0C4A6E', soft: 'bg-sky-50', icon: Snowflake },
};

const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const calendarData: MonthData[] = [
  {
    first: '2025-04-01', label: 'April 2025', short: 'Apr 2025', year: 2025, monthIndex: 3,
    events: [
      { date: '2025-04-01', title: 'Academic Session Begins', type: 'event' },
      { date: '2025-04-10', title: 'Ugadi / Telugu New Year', type: 'holiday' },
      { date: '2025-04-14', title: 'Ambedkar Jayanti', type: 'holiday' },
    ],
  },
  {
    first: '2025-05-01', label: 'May 2025', short: 'May 2025', year: 2025, monthIndex: 4,
    events: [
      { date: '2025-05-01', title: 'May Day', type: 'holiday' },
      { date: '2025-05-12', title: 'Buddha Purnima', type: 'holiday' },
      { date: '2025-05-15', endDate: '2025-05-31', title: 'Summer Vacation Begins', type: 'holiday' },
    ],
  },
  {
    first: '2025-06-01', label: 'June 2025', short: 'Jun 2025', year: 2025, monthIndex: 5,
    events: [
      { date: '2025-06-16', title: 'School Reopens after Summer Break', type: 'event' },
      { date: '2025-06-21', title: 'International Yoga Day Celebrations', type: 'event' },
      { date: '2025-06-28', title: 'Parent-Teacher Meeting (PTM 1)', type: 'ptm' },
    ],
  },
  {
    first: '2025-07-01', label: 'July 2025', short: 'Jul 2025', year: 2025, monthIndex: 6,
    events: [
      { date: '2025-07-04', title: 'Van Mahotsav / Environment Week', type: 'event' },
      { date: '2025-07-14', endDate: '2025-07-19', title: 'Periodic Test 1 (PT-1)', type: 'exam' },
      { date: '2025-07-17', title: 'Muharram', type: 'holiday' },
    ],
  },
  {
    first: '2025-08-01', label: 'August 2025', short: 'Aug 2025', year: 2025, monthIndex: 7,
    events: [
      { date: '2025-08-09', title: 'Raksha Bandhan', type: 'holiday' },
      { date: '2025-08-15', title: 'Independence Day Celebrations', type: 'event' },
      { date: '2025-08-16', title: 'Janmashtami', type: 'holiday' },
      { date: '2025-08-23', title: 'Inter-House Sports Competition', type: 'event' },
    ],
  },
  {
    first: '2025-09-01', label: 'September 2025', short: 'Sep 2025', year: 2025, monthIndex: 8,
    events: [
      { date: '2025-09-05', title: "Teachers' Day Celebrations", type: 'event' },
      { date: '2025-09-15', endDate: '2025-09-20', title: 'Half-Yearly Examinations', type: 'exam' },
      { date: '2025-09-27', title: 'Parent-Teacher Meeting (PTM 2)', type: 'ptm' },
    ],
  },
  {
    first: '2025-10-01', label: 'October 2025', short: 'Oct 2025', year: 2025, monthIndex: 9,
    events: [
      { date: '2025-10-02', title: 'Gandhi Jayanti', type: 'holiday' },
      { date: '2025-10-02', endDate: '2025-10-04', title: 'Dussehra Holidays', type: 'holiday' },
      { date: '2025-10-20', endDate: '2025-10-24', title: 'Diwali Vacation', type: 'holiday' },
      { date: '2025-10-31', title: 'National Unity Day', type: 'event' },
    ],
  },
  {
    first: '2025-11-01', label: 'November 2025', short: 'Nov 2025', year: 2025, monthIndex: 10,
    events: [
      { date: '2025-11-05', title: 'Guru Nanak Jayanti', type: 'holiday' },
      { date: '2025-11-14', title: "Children's Day Celebrations", type: 'event' },
      { date: '2025-11-17', endDate: '2025-11-22', title: 'Periodic Test 2 (PT-2)', type: 'exam' },
    ],
  },
  {
    first: '2025-12-01', label: 'December 2025', short: 'Dec 2025', year: 2025, monthIndex: 11,
    events: [
      { date: '2025-12-06', title: 'Annual Day Celebrations', type: 'event' },
      { date: '2025-12-13', title: 'Parent-Teacher Meeting (PTM 3)', type: 'ptm' },
      { date: '2025-12-25', title: 'Christmas', type: 'holiday' },
      { date: '2025-12-26', endDate: '2025-12-31', title: 'Winter Break', type: 'holiday' },
    ],
  },
  {
    first: '2026-01-01', label: 'January 2026', short: 'Jan 2026', year: 2026, monthIndex: 0,
    events: [
      { date: '2026-01-01', title: "New Year's Day", type: 'holiday' },
      { date: '2026-01-05', title: 'School Reopens', type: 'event' },
      { date: '2026-01-14', title: 'Sankranti / Pongal', type: 'holiday' },
      { date: '2026-01-26', title: 'Republic Day Celebrations', type: 'event' },
    ],
  },
  {
    first: '2026-02-01', label: 'February 2026', short: 'Feb 2026', year: 2026, monthIndex: 1,
    events: [
      { date: '2026-02-02', endDate: '2026-02-07', title: 'Pre-Board / Periodic Test 3 (PT-3)', type: 'exam' },
      { date: '2026-02-14', title: 'Science Exhibition', type: 'event' },
      { date: '2026-02-21', title: 'Parent-Teacher Meeting (PTM 4)', type: 'ptm' },
      { date: '2026-02-26', title: 'Maha Shivaratri', type: 'holiday' },
    ],
  },
  {
    first: '2026-03-01', label: 'March 2026', short: 'Mar 2026', year: 2026, monthIndex: 2,
    events: [
      { date: '2026-03-02', endDate: '2026-03-14', title: 'Annual / Final Examinations', type: 'exam' },
      { date: '2026-03-16', title: 'Result Declaration', type: 'event' },
      { date: '2026-03-28', title: 'Farewell & Closing Ceremony', type: 'event' },
      { date: '2026-03-30', title: 'Holi', type: 'holiday' },
    ],
  },
];

function dateRange(start: string, end?: string): string[] {
  const out: string[] = [];
  const s = new Date(start + 'T00:00:00');
  const e = end ? new Date(end + 'T00:00:00') : s;
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function buildDayMap(events: CalEvent[]): Map<number, CalEvent[]> {
  const map = new Map<number, CalEvent[]>();
  for (const ev of events) {
    for (const iso of dateRange(ev.date, ev.endDate)) {
      const day = parseInt(iso.slice(8, 10), 10);
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(ev);
    }
  }
  return map;
}

function formatRange(start: string, end?: string) {
  const s = new Date(start + 'T00:00:00');
  const sLabel = `${monthShort[s.getMonth()]} ${s.getDate()}`;
  if (!end || end === start) return sLabel;
  const e = new Date(end + 'T00:00:00');
  if (e.getMonth() === s.getMonth()) return `${sLabel}–${e.getDate()}`;
  return `${sLabel} – ${monthShort[e.getMonth()]} ${e.getDate()}`;
}

function MonthCard({ month, index }: { month: MonthData; index: number }) {
  const theme = monthThemes[month.monthIndex];
  const ThemeIcon = theme.icon;

  const firstDow = useMemo(() => {
    const d = new Date(month.first + 'T00:00:00');
    return d.getDay(); // 0 = Sun
  }, [month.first]);

  const daysInMonth = useMemo(() => {
    return new Date(month.year, month.monthIndex + 1, 0).getDate();
  }, [month.year, month.monthIndex]);

  const dayMap = useMemo(() => buildDayMap(month.events), [month.events]);
  const [hoverDay, setHoverDay] = useState<number | null>(null);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Offset backing block */}
      <div
        aria-hidden
        className={`absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[1.4rem] bg-gradient-to-br ${theme.gradient} opacity-90 transition-transform duration-500 group-hover:translate-x-3.5 group-hover:translate-y-3.5`}
      />
      <div className="relative bg-card rounded-[1.4rem] border border-border/60 shadow-[0_18px_50px_-26px_rgba(15,42,63,0.22)] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-30px_rgba(15,42,63,0.32)]">
        {/* Header band */}
        <div className={`relative px-6 md:px-7 pt-6 pb-5 bg-gradient-to-br ${theme.gradient}`}>
          {/* sparkle dots */}
          <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '14px 14px' }} />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="text-[10.5px] uppercase tracking-[0.28em] font-bold" style={{ color: theme.ink }}>
                {theme.name} &middot; {month.year}
              </p>
              <h3 className="font-serif font-bold text-[2rem] md:text-[2.25rem] leading-none mt-1.5" style={{ color: theme.ink }}>
                {monthLong[month.monthIndex]}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/70 shadow-sm">
              <ThemeIcon className="w-5 h-5" style={{ color: theme.ink }} />
            </div>
          </div>
        </div>

        {/* Day grid */}
        <div className="px-5 md:px-6 pt-4 pb-2">
          <div className="grid grid-cols-7 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={i} className={i === 0 || i === 6 ? 'text-secondary' : ''}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-1.5">
            {cells.map((day, i) => {
              if (day === null) return <span key={i} className="aspect-square" />;
              const dayEvents = dayMap.get(day);
              const dow = (firstDow + day - 1) % 7;
              const isWeekend = dow === 0 || dow === 6;
              const primaryType = dayEvents?.[0]?.type;
              const cfg = primaryType ? eventTypeConfig[primaryType] : null;

              return (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => dayEvents && setHoverDay(day)}
                  onMouseLeave={() => setHoverDay(null)}
                  onFocus={() => dayEvents && setHoverDay(day)}
                  onBlur={() => setHoverDay(null)}
                  className={[
                    'relative aspect-square rounded-lg flex items-center justify-center text-[12px] md:text-[13px] font-semibold transition-all duration-200',
                    dayEvents
                      ? `${theme.soft} text-foreground ring-1 ${cfg?.ring ?? ''} hover:scale-110 hover:z-10 hover:shadow-md cursor-pointer`
                      : isWeekend
                      ? 'text-secondary/70'
                      : 'text-foreground/70 hover:bg-muted/60',
                  ].join(' ')}
                  aria-label={dayEvents ? `${monthLong[month.monthIndex]} ${day}: ${dayEvents.map(e => e.title).join(', ')}` : `${day}`}
                >
                  <span className="tabular-nums">{day}</span>
                  {dayEvents && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((ev, j) => (
                        <span key={j} className={`w-1 h-1 rounded-full ${eventTypeConfig[ev.type].dot}`} />
                      ))}
                    </span>
                  )}

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {hoverDay === day && dayEvents && (
                      <motion.span
                        initial={{ opacity: 0, y: 4, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[14rem] z-30"
                      >
                        <span className="block bg-foreground text-background rounded-lg px-3 py-2 text-[11px] font-medium leading-snug shadow-lg text-left">
                          {dayEvents.map((ev, k) => (
                            <span key={k} className="block">
                              {ev.title}
                            </span>
                          ))}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>

        {/* Event list */}
        <div className="px-6 md:px-7 pb-6 pt-4 border-t border-border/40">
          <ul className="space-y-2">
            {month.events.map((ev, i) => {
              const cfg = eventTypeConfig[ev.type];
              const Icon = cfg.icon;
              return (
                <li key={i} className="flex items-start gap-3 group/item">
                  <span className={`mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-md border ${cfg.chip} shrink-0`}>
                    <Icon size={13} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] md:text-[13.5px] font-medium text-foreground leading-snug">
                      {ev.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground tabular-nums mt-0.5">
                      {formatRange(ev.date, ev.endDate)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export default function AcademicCalendarPage() {
  const [year, setYear] = useState<2025 | 2026 | 'all'>('all');

  const filtered = useMemo(() => {
    if (year === 'all') return calendarData;
    return calendarData.filter((m) => m.year === year);
  }, [year]);

  const handlePrint = () => window.print();

  return (
    <>
      <Header />
      <main className="relative min-h-screen pb-24 bg-background overflow-hidden">
        {/* Ambient backdrop */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[700px] pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 480px at 12% 0%, rgba(240,167,38,0.18), transparent 60%), radial-gradient(800px 460px at 88% 10%, rgba(15,118,110,0.16), transparent 60%)',
          }}
        />
        {/* Floating shapes */}
        <motion.div
          aria-hidden
          className="absolute top-32 -left-10 w-40 h-40 rounded-full blur-3xl bg-secondary/20 pointer-events-none print:hidden"
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="absolute top-60 right-0 w-52 h-52 rounded-full blur-3xl bg-primary/15 pointer-events-none print:hidden"
          animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
          transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
        />

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
          {/* Header */}
          <div className="text-center pt-12 md:pt-16 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                  2025 – 2026 Academic Year
                </span>
                <span className="h-px w-10 bg-gradient-to-l from-secondary to-accent" />
              </div>

              <h1 className="font-serif font-bold leading-[0.95] tracking-tight text-[3rem] md:text-[4.5rem] lg:text-[5.5rem]">
                <span className="block text-foreground">A Year of</span>
                <span className="block italic gradient-text-sunrise">Wonder &amp; Wins.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Every milestone, festival, and celebration that makes our school year sparkle —
                exams, holidays, PTMs, and the moments in between.
              </p>
            </motion.div>

            {/* Year filter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-9 inline-flex items-center gap-1 p-1 bg-card rounded-full border border-border/60 shadow-sm print:hidden"
            >
              {([
                { v: 'all', label: 'Full Year' },
                { v: 2025, label: '2025' },
                { v: 2026, label: '2026' },
              ] as const).map((opt) => (
                <button
                  key={String(opt.v)}
                  onClick={() => setYear(opt.v as typeof year)}
                  className={`px-4 md:px-5 py-2 text-xs md:text-sm font-semibold rounded-full transition-all ${
                    year === opt.v
                      ? 'text-white shadow-[0_8px_22px_-10px_rgba(15,118,110,0.55)]'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  style={year === opt.v ? { background: 'var(--gradient-brand)' } : {}}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Legend + actions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 md:mb-14 print:mb-6">
            <div className="flex flex-wrap justify-center gap-2.5">
              {Object.entries(eventTypeConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <span
                    key={key}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[12px] font-semibold ${config.chip}`}
                  >
                    <Icon size={13} />
                    {config.label}
                  </span>
                );
              })}
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 print:hidden"
              style={{ background: 'var(--gradient-brand)', boxShadow: '0 14px 30px -12px rgba(15,118,110,0.55)' }}
            >
              <Printer size={15} />
              Print Calendar
            </button>
          </div>

          {/* Months grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-8 print:gap-4 print:grid-cols-2">
            {filtered.map((m, i) => (
              <MonthCard key={m.first} month={m} index={i} />
            ))}
          </div>

          {/* Closing flourish */}
          <div className="text-center mt-20 md:mt-28 print:hidden">
            <div className="inline-flex items-center gap-3 text-primary mb-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <p className="font-serif italic text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              &ldquo;A school year is more than dates on a page — it&rsquo;s a story of growing up.&rdquo;
            </p>
          </div>
        </div>
      </main>
      <Footer />

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          header, footer, .print\\:hidden { display: none !important; }
          body { background: white !important; }
          main { padding: 0 !important; }
          .rounded-\\[1\\.4rem\\] { border-radius: 0.5rem !important; box-shadow: none !important; }
        }
      `}</style>
    </>
  );
}
