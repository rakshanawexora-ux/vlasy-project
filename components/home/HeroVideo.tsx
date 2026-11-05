'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
type Connection = {
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};
function connection() {
  return (navigator as Navigator & { connection?: Connection }).connection;
}
function saveData() {
  return Boolean(connection()?.saveData);
}
function subscribe(notify: () => void) {
  const net = connection();
  net?.addEventListener?.('change', notify);
  return () => net?.removeEventListener?.('change', notify);
}
export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  const savingData = useSyncExternalStore(subscribe, saveData, () => true);
  useEffect(() => {
    const media = video.current;
    if (!media || reduced !== false || savingData) return;
    let visible = true;
    const sync = () => {
      if (visible && !document.hidden && !manuallyPaused.current) void media.play().catch(() => {});
      else media.pause();
    };
    media.src = '/videos/unisex-hero-2026-11.mp4';
    media.load();
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(media);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      media.pause();
      media.removeAttribute('src');
      media.load();
    };
  }, [reduced, savingData]);
  const toggle = () => {
    const media = video.current;
    if (!media) return;
    if (playing) {
      manuallyPaused.current = true;
      media.pause();
    } else {
      manuallyPaused.current = false;
      void media.play().catch(() => {});
    }
  };
  return (
    <>
      <video
        ref={video}
        className={`hero-video ${playing ? 'is-playing' : ''}`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      {reduced === false && !savingData && !failed && (
        <button
          type="button"
          className="hero-video-toggle"
          onClick={toggle}
          aria-label={`${playing ? 'Pause' : 'Play'} hero video`}
        >
          {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          <span>{playing ? 'Pause' : 'Play'} motion</span>
        </button>
      )}
    </>
  );
}
