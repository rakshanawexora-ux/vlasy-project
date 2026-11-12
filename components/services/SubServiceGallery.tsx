'use client';
import Link from 'next/link';
import { useId, useState } from 'react';
import { Search, ArrowUpRight, X } from 'lucide-react';
import { Photo } from '@/components/ui/Primitives';
import type { SubService } from '@/data/sub-services';
const normalise = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '');
export function SubServiceGallery({
  category,
  serviceName,
  items,
}: {
  category: string;
  serviceName: string;
  items: SubService[];
}) {
  const searchId = useId();
  const [query, setQuery] = useState('');
  const matches = items.filter((item) => normalise(item.name).includes(normalise(query)));
  return (
    <div className="subservice-gallery">
      <div className="subservice-toolbar">
        <div>
          <label htmlFor={searchId}>Find a service in this category</label>
          <div className="subservice-search">
            <Search size={18} aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${category.toLowerCase()}`}
              aria-controls={`${searchId}-results`}
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear service search">
                <X size={17} />
              </button>
            )}
          </div>
        </div>
        <p role="status" aria-live="polite">
          Showing {matches.length} of {items.length} services
        </p>
      </div>
      <ul
        id={`${searchId}-results`}
        className="service-options-grid subservice-image-grid"
        aria-label={`${category} services`}
      >
        {matches.map((item) => (
          <li key={item.id} className="subservice-card">
            <Photo
              src={item.image}
              alt={item.alt}
              sizes="(max-width: 700px) 92vw, (max-width: 1000px) 45vw, 30vw"
            />
            <div className="subservice-card-content">
              <h3>{item.name}</h3>
              <Link
                className="subservice-enquire"
                href={`/contact?${new URLSearchParams({ service: serviceName, subservice: item.name }).toString()}`}
                aria-label={`Enquire about ${item.name}`}
              >
                Enquire
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {matches.length === 0 && (
        <div className="subservice-empty">
          <h3>No matching services</h3>
          <p>Try another word, or clear the search to see the full category.</p>
          <button type="button" className="button" onClick={() => setQuery('')}>
            Show all services
          </button>
        </div>
      )}
      <p className="subservice-note">
        Images are style references, not documented client results. Ask us about suitability,
        pricing and appointment availability.
      </p>
    </div>
  );
}
