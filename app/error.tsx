'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-5">
      <div className="text-center space-y-5 max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
          <span className="text-3xl font-serif font-bold text-secondary">!</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
          Something Went Wrong
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
