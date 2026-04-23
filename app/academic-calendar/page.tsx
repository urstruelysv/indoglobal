'use client';

import { motion } from 'framer-motion';
import { Calendar, Printer, BookOpen, Trophy, Users, PartyPopper } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type EventType = 'exam' | 'holiday' | 'event' | 'ptm';

const eventTypeConfig: Record<EventType, { label: string; color: string; icon: typeof Calendar }> = {
  exam: { label: 'Examination', color: 'bg-red-50 text-red-700 border-red-200', icon: BookOpen },
  holiday: { label: 'Holiday', color: 'bg-green-50 text-green-700 border-green-200', icon: PartyPopper },
  event: { label: 'School Event', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Trophy },
  ptm: { label: 'PTM', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Users },
};

const calendarData: { month: string; events: { date: string; title: string; type: EventType }[] }[] = [
  {
    month: 'April 2025',
    events: [
      { date: 'Apr 1', title: 'Academic Session Begins', type: 'event' },
      { date: 'Apr 10', title: 'Ugadi / Telugu New Year', type: 'holiday' },
      { date: 'Apr 14', title: 'Ambedkar Jayanti', type: 'holiday' },
    ],
  },
  {
    month: 'May 2025',
    events: [
      { date: 'May 1', title: 'May Day', type: 'holiday' },
      { date: 'May 12', title: 'Buddha Purnima', type: 'holiday' },
      { date: 'May 15–31', title: 'Summer Vacation Begins', type: 'holiday' },
    ],
  },
  {
    month: 'June 2025',
    events: [
      { date: 'Jun 16', title: 'School Reopens after Summer Break', type: 'event' },
      { date: 'Jun 21', title: 'International Yoga Day Celebrations', type: 'event' },
      { date: 'Jun 28', title: 'Parent-Teacher Meeting (PTM 1)', type: 'ptm' },
    ],
  },
  {
    month: 'July 2025',
    events: [
      { date: 'Jul 4', title: 'Van Mahotsav / Environment Week', type: 'event' },
      { date: 'Jul 14–19', title: 'Periodic Test 1 (PT-1)', type: 'exam' },
      { date: 'Jul 17', title: 'Muharram', type: 'holiday' },
    ],
  },
  {
    month: 'August 2025',
    events: [
      { date: 'Aug 9', title: 'Raksha Bandhan', type: 'holiday' },
      { date: 'Aug 15', title: 'Independence Day Celebrations', type: 'event' },
      { date: 'Aug 16', title: 'Janmashtami', type: 'holiday' },
      { date: 'Aug 23', title: 'Inter-House Sports Competition', type: 'event' },
    ],
  },
  {
    month: 'September 2025',
    events: [
      { date: 'Sep 5', title: 'Teachers\' Day Celebrations', type: 'event' },
      { date: 'Sep 15–20', title: 'Half-Yearly Examinations Begin', type: 'exam' },
      { date: 'Sep 27', title: 'Parent-Teacher Meeting (PTM 2)', type: 'ptm' },
    ],
  },
  {
    month: 'October 2025',
    events: [
      { date: 'Oct 2', title: 'Gandhi Jayanti', type: 'holiday' },
      { date: 'Oct 2–4', title: 'Dussehra Holidays', type: 'holiday' },
      { date: 'Oct 20–24', title: 'Diwali Vacation', type: 'holiday' },
      { date: 'Oct 31', title: 'National Unity Day', type: 'event' },
    ],
  },
  {
    month: 'November 2025',
    events: [
      { date: 'Nov 5', title: 'Guru Nanak Jayanti', type: 'holiday' },
      { date: 'Nov 14', title: 'Children\'s Day Celebrations', type: 'event' },
      { date: 'Nov 17–22', title: 'Periodic Test 2 (PT-2)', type: 'exam' },
    ],
  },
  {
    month: 'December 2025',
    events: [
      { date: 'Dec 6', title: 'Annual Day Celebrations', type: 'event' },
      { date: 'Dec 13', title: 'Parent-Teacher Meeting (PTM 3)', type: 'ptm' },
      { date: 'Dec 25', title: 'Christmas', type: 'holiday' },
      { date: 'Dec 26–31', title: 'Winter Break', type: 'holiday' },
    ],
  },
  {
    month: 'January 2026',
    events: [
      { date: 'Jan 1', title: 'New Year\'s Day', type: 'holiday' },
      { date: 'Jan 5', title: 'School Reopens', type: 'event' },
      { date: 'Jan 14', title: 'Sankranti / Pongal', type: 'holiday' },
      { date: 'Jan 26', title: 'Republic Day Celebrations', type: 'event' },
    ],
  },
  {
    month: 'February 2026',
    events: [
      { date: 'Feb 2–7', title: 'Pre-Board / Periodic Test 3 (PT-3)', type: 'exam' },
      { date: 'Feb 14', title: 'Science Exhibition', type: 'event' },
      { date: 'Feb 21', title: 'Parent-Teacher Meeting (PTM 4)', type: 'ptm' },
      { date: 'Feb 26', title: 'Maha Shivaratri', type: 'holiday' },
    ],
  },
  {
    month: 'March 2026',
    events: [
      { date: 'Mar 2–14', title: 'Annual / Final Examinations', type: 'exam' },
      { date: 'Mar 16', title: 'Result Declaration', type: 'event' },
      { date: 'Mar 28', title: 'Farewell & Closing Ceremony', type: 'event' },
      { date: 'Mar 30', title: 'Holi', type: 'holiday' },
    ],
  },
];

export default function AcademicCalendarPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-8 pb-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 space-y-4 pt-8">
            <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
              2025–2026 Academic Year
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary tracking-tight">
              Academic Calendar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Important dates, examinations, holidays, and school events for the current academic year.
            </p>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors print:hidden"
            >
              <Printer size={18} />
              Print Calendar
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 print:mb-6">
            {Object.entries(eventTypeConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div
                  key={key}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${config.color}`}
                >
                  <Icon size={14} />
                  {config.label}
                </div>
              );
            })}
          </div>

          {/* Calendar Months */}
          <div className="space-y-8">
            {calendarData.map((monthData, i) => (
              <motion.div
                key={monthData.month}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="bg-white rounded-2xl border border-border/20 shadow-sm overflow-hidden"
              >
                {/* Month header */}
                <div className="bg-primary/5 px-8 py-5 border-b border-border/10 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h2 className="font-serif font-bold text-xl text-primary">{monthData.month}</h2>
                </div>

                {/* Events */}
                <div className="divide-y divide-border/10">
                  {monthData.events.map((event, j) => {
                    const config = eventTypeConfig[event.type];
                    const Icon = config.icon;
                    return (
                      <div key={j} className="px-8 py-4 flex items-center gap-4 hover:bg-muted/20 transition-colors">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.color} border`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{event.title}</p>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium shrink-0">
                          {event.date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
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
          .rounded-2xl { border-radius: 0 !important; box-shadow: none !important; }
        }
      `}</style>
    </>
  );
}
