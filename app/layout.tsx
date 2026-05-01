import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ScholarshipBanner from '@/components/ScholarshipBanner'
import ScholarshipPopup from '@/components/ScholarshipPopup'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Indo Global School Kishan Nagar, Shadnagar - Best CBSE School in Shadnagar',
  description: 'Indo Global School is the top CBSE curriculum school in Kishan Nagar, Shadnagar, Telangana. Spread across a 3-acre campus, we offer experiential learning, smart classrooms, free transport, and 24/7 CCTV safety. Admissions open for 2025-26.',
  keywords: [
    'Indo Global School',
    'Indo Global School Shadnagar',
    'Best CBSE school in Shadnagar',
    'Top schools in Shadnagar Telangana',
    'Schools in Kishan Nagar Shadnagar',
    'Indo Global School Admissions',
    'CBSE curriculum schools Shadnagar',
    'Smart classrooms Shadnagar',
    'Experiential learning school Shadnagar',
    '3 acre campus school Shadnagar',
    'Best school with big campus Shadnagar',
  ],
  authors: [{ name: 'Indo Global School' }],
  openGraph: {
    title: 'Indo Global School Kishan Nagar, Shadnagar - Best CBSE School',
    description: 'Nurturing excellence on a 3-acre campus with experiential learning and Indian values. Join the best CBSE school in Shadnagar.',
    url: 'https://indoglobalschooligs.com',
    siteName: 'Indo Global School',
    images: [
      {
        url: 'https://indoglobalschooligs.com/igs-banner.png',
        width: 1200,
        height: 630,
        alt: 'Indo Global School Shadnagar',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indo Global School Kishan Nagar, Shadnagar',
    description: 'The premier CBSE institution in Shadnagar for holistic education.',
    images: ['https://indoglobalschooligs.com/igs-banner.png'],
  },
  alternates: {
    canonical: 'https://indoglobalschooligs.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "Indo Global School",
    "alternateName": "IGS Shadnagar",
    "url": "https://indoglobalschooligs.com",
    "logo": "https://indoglobalschooligs.com/igs-logo.png",
    "image": "https://indoglobalschooligs.com/igs-banner.png",
    "description": "Premium CBSE Curriculum School on a 3-acre campus in Kishan Nagar, Shadnagar, Telangana. Nurturing Experiential Learning and Global Citizens with Indian Values.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kishan Nagar",
      "addressLocality": "Shadnagar",
      "addressRegion": "Telangana",
      "postalCode": "509410",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.0557001,
      "longitude": 78.1713319
    },
    "telephone": "+91-21-68-98-98",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-21-68-98-98",
        "contactType": "admissions"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-21-98-38-38",
        "contactType": "general"
      }
    ],
    "email": "indoglobalschool@gmail.com",
    "openingHours": "Mo-Sa 08:30-17:00",
    "curriculumUsed": "CBSE (Central Board of Secondary Education)",
    "educationalLevel": ["Pre-Primary", "Primary", "Middle School"],
    "foundingDate": "2025",
    "sameAs": [
      "https://www.instagram.com/indoglobal2025"
    ]
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-bold">
          Skip to main content
        </a>
        <ScholarshipBanner />
        {children}
        <ScholarshipPopup />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
