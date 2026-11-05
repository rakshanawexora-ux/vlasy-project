import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span />
      {children}
    </span>
  );
}
export function ActionLink({
  href,
  children,
  light = false,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`button ${light ? 'button-light' : ''} ${className}`}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function Photo({
  src,
  alt,
  priority = false,
  className = '',
  imageAudience,
  sizes = '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 55vw',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageAudience?: 'women' | 'men';
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`} data-image-audience={imageAudience}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        className="photo-img"
      />
    </div>
  );
}
export function Schema({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  );
}
