import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers - Indo Global School Shadnagar | Teaching & Non-Teaching Jobs',
  description: 'Join our team at Indo Global School, Kishan Nagar, Shadnagar. We are hiring passionate teaching and non-teaching staff. Apply now with your resume.',
  openGraph: {
    title: 'Careers at Indo Global School Shadnagar',
    description: 'We are hiring passionate educators and support staff. Apply now.',
    url: 'https://indoglobalschooligs.com/careers',
  },
  alternates: {
    canonical: 'https://indoglobalschooligs.com/careers',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
