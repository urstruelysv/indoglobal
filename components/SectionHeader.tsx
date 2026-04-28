'use client';

import { motion } from 'framer-motion';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional override for the title id (used for in-page anchors). */
  id?: string;
  /** Tighter bottom margin variant (e.g. when section content sits closer). */
  compact?: boolean;
  /** Visually centred variant when the section truly demands centred composition. Default is editorial left. */
  align?: 'left' | 'center';
};

/**
 * Consistent section header used across interior sections.
 * Editorial left-aligned by default. One line, one weight, one scale.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  id,
  compact,
  align = 'left',
}: Props) {
  const isCenter = align === 'center';

  return (
    <motion.header
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'relative',
        compact ? 'mb-10 md:mb-12' : 'mb-12 md:mb-16',
        isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl',
      ].join(' ')}
    >
      {eyebrow && (
        <div
          className={[
            'flex items-center gap-3 mb-4',
            isCenter ? 'justify-center' : '',
          ].join(' ')}
        >
          <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            {eyebrow}
          </span>
          {isCenter && <span className="h-px w-10 bg-gradient-to-l from-secondary to-accent" />}
        </div>
      )}

      <h2
        id={id}
        className="font-serif font-bold text-foreground tracking-tight leading-[1.08] !text-[2rem] md:!text-[2.4rem] lg:!text-[2.75rem]"
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={[
            'mt-4 text-[15px] md:text-base text-muted-foreground leading-[1.7]',
            isCenter ? 'mx-auto max-w-xl' : 'max-w-2xl',
          ].join(' ')}
        >
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
