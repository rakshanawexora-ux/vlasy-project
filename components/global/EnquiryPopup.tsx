'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { TextLink, SectionLabel } from '@/components/ui/Primitives';
import { SITE_CONFIG, whatsappUrl } from '@/lib/constants';
export function EnquiryPopup() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const previous = useRef<HTMLElement | null>(null);
  const show = useCallback(() => {
    if (
      sessionStorage.getItem('vlasy-enquiry-shown') ||
      path === '/contact' ||
      path === '/thank-you'
    )
      return;
    sessionStorage.setItem('vlasy-enquiry-shown', 'true');
    setOpen(true);
  }, [path]);
  useEffect(() => {
    const timer = window.setTimeout(show, 25000);
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.45) show();
    };
    const exit = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.matchMedia('(pointer: fine)').matches) show();
    };
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('mouseleave', exit);
    scroll();
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('mouseleave', exit);
    };
  }, [show]);
  useEffect(() => {
    const el = dialog.current;
    if (open) {
      previous.current = document.activeElement as HTMLElement;
      el?.showModal();
    } else if (el?.open) {
      el.close();
      previous.current?.focus();
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);
  const title =
    path === '/' || path.includes('hair-replacement')
      ? 'Not sure which hair solution is right for you?'
      : path.includes('hair-extensions')
        ? 'Looking for more length or volume?'
        : 'Thinking about a transformation?';
  return (
    <dialog
      data-lenis-prevent
      ref={dialog}
      className="enquiry-dialog"
      aria-labelledby="enquiry-title"
      onCancel={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <button
        className="dialog-close"
        onClick={() => setOpen(false)}
        aria-label="Close consultation popup"
      >
        <X size={22} />
      </button>
      <SectionLabel>LET’S FIND YOUR LOOK</SectionLabel>
      <h2 id="enquiry-title">{title}</h2>
      <p>A little guidance can make all the difference.</p>
      {open && (
        <EnquiryForm
          compact
          service={path === '/' || path.includes('hair-replacement') ? 'Hair Replacement' : ''}
        />
      )}
      {SITE_CONFIG.whatsapp && <TextLink href={whatsappUrl()}>Prefer WhatsApp?</TextLink>}
    </dialog>
  );
}
