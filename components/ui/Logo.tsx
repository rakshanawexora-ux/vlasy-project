import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';

export function Logo({
  variant = 'dark',
  large = false,
}: {
  variant?: 'light' | 'dark';
  large?: boolean;
}) {
  const src = SITE_CONFIG.logo[variant];
  return src ? (
    <span className={`brand-logo-shell ${large ? 'brand-logo-large' : ''}`}>
      <Image
        src={src}
        alt="VLASY Unisex Salon"
        width={1280}
        height={1280}
        sizes={large ? '(max-width:700px) 220px, 280px' : '88px'}
        className="brand-logo-image"
        priority={!large}
      />
    </span>
  ) : (
    <span
      className={`wordmark ${large ? 'wordmark-large' : ''}`}
      aria-label="VLASY Salon & Academy"
    >
      VLASY{!large && <small>SALON & ACADEMY</small>}
    </span>
  );
}
