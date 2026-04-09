import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  description: 'Indo Global School is the top CBSE curriculum school in Kishan Nagar, Shadnagar, Telangana. We offer experiential learning, smart classrooms, free transport, and 24/7 CCTV safety. Admissions open for 2025-26.',
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
  ],
  authors: [{ name: 'Indo Global School' }],
  openGraph: {
    title: 'Indo Global School Kishan Nagar, Shadnagar - Best CBSE School',
    description: 'Nurturing excellence with experiential learning and Indian values. Join the best CBSE school in Shadnagar.',
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
    "url": "https://indoglobalschooligs.com",
    "logo": "https://indoglobalschooligs.com/igs-logo.png",
    "image": "https://indoglobalschooligs.com/schoolbuilding.png",
    "description": "Premium CBSE Curriculum School in Kishan Nagar, Shadnagar, Telangana. Nurturing Experiential Learning and Global Citizens.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kishan Nagar",
      "addressLocality": "Shadnagar",
      "addressRegion": "Telangana",
      "postalCode": "509216",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.0725, // Replace with precise coordinates if available
      "longitude": 78.1975
    },
    "telephone": "+91-21-68-98-98",
    "openingHours": "Mo-Sa 08:30-16:30",
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
