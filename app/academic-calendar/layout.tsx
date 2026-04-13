import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Calendar 2025-26 - Indo Global School Shadnagar',
  description: 'View the Indo Global School academic calendar for 2025-26. Exam dates, holidays, events, and PTM schedules for Kishan Nagar, Shadnagar.',
  openGraph: {
    title: 'Academic Calendar 2025-26 - Indo Global School Shadnagar',
    description: 'Exam dates, holidays, events, and PTM schedules for the academic year.',
    url: 'https://indoglobalschooligs.com/academic-calendar',
  },
  alternates: {
    canonical: 'https://indoglobalschooligs.com/academic-calendar',
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
