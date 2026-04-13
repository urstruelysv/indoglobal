import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - Indo Global School',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-5">
      <div className="text-center space-y-5 max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-4xl font-serif font-bold text-primary">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary">
          Page Not Found
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-2.5 border-2 border-primary/20 text-primary rounded-full font-bold text-sm hover:bg-primary/5 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
