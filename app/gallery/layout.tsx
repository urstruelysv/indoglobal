import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery - Indo Global School Shadnagar',
  description: 'Explore our campus, events, sports, and academic life through photos. Indo Global School, Kishan Nagar, Shadnagar.',
  openGraph: {
    title: 'Photo Gallery - Indo Global School Shadnagar',
    description: 'Explore our campus, events, sports, and academic life through photos.',
    url: 'https://indoglobalschooligs.com/gallery',
  },
  alternates: {
    canonical: 'https://indoglobalschooligs.com/gallery',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
