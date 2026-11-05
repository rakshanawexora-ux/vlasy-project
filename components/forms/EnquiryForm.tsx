'use client';
import { normalizeServiceName } from '@/data/service-selection';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { services } from '@/data/services';
import { enquirySchema, type EnquiryValues } from '@/lib/validations';
export function EnquiryForm({
  compact = false,
  service = '',
  initialMessage = '',
  branch = 'Not Sure',
}: {
  compact?: boolean;
  service?: string;
  initialMessage?: string;
  branch?: EnquiryValues['branch'];
}) {
  const router = useRouter();
  const [failure, setFailure] = useState('');
  const formId = useId();
  const id = (field: string) => `${formId}-${field}`;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: normalizeServiceName(service),
      branch,
      consent: false,
      message: initialMessage,
      preferredDate: '',
    },
  });
  const submit = async (values: EnquiryValues) => {
    setFailure('');
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          sourcePage: window.location.pathname,
          utmSource: params.get('utm_source') || '',
          utmMedium: params.get('utm_medium') || '',
          utmCampaign: params.get('utm_campaign') || '',
        }),
      });
      if (!response.ok) throw new Error('failed');
      sessionStorage.setItem('vlasy-enquiry-shown', 'true');
      router.push('/thank-you');
    } catch {
      setFailure('Your enquiry could not be sent. Please try again. Your details are still here.');
    }
  };
  const field = (name: keyof EnquiryValues, label: string, type = 'text') => (
    <label className="form-field">
      {label}
      <input
        id={id(name)}
        type={type}
        {...register(name)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? id(`${name}-error`) : undefined}
        autoComplete={
          name === 'name'
            ? 'name'
            : name === 'phone'
              ? 'tel'
              : name === 'email'
                ? 'email'
                : undefined
        }
      />
      {errors[name] && (
        <span id={id(`${name}-error`)} className="field-error">
          {errors[name]?.message}
        </span>
      )}
    </label>
  );
  return (
    <form
      className="enquiry-form"
      onSubmit={handleSubmit(submit, () =>
        requestAnimationFrame(() => document.getElementById(id('error-summary'))?.focus()),
      )}
      noValidate
    >
      {Object.keys(errors).length > 0 && (
        <div className="error-summary" id={id('error-summary')} tabIndex={-1} role="alert">
          Please check your details:
          <ul>
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                <a href={`#${id(field)}`}>{error?.message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="form-grid">
        {field('name', 'Full name *')}
        {field('phone', 'Mobile number *', 'tel')}
        {!compact && field('email', 'Email address', 'email')}
        <label className="form-field">
          I’m interested in *
          <select
            id={id('service')}
            {...register('service')}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? id('service-error') : undefined}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug}>{s.name}</option>
            ))}
            <option>Other</option>
          </select>
          {errors.service && (
            <span className="field-error" id={id('service-error')}>
              {errors.service.message}
            </span>
          )}
        </label>
        <label className="form-field">
          Preferred branch
          <select {...register('branch')}>
            <option>Not Sure</option>
            <option>Kolathur</option>
          </select>
        </label>
        {!compact && (
          <label className="form-field">
            Preferred date
            <input
              id={id('preferredDate')}
              type="date"
              {...register('preferredDate')}
              min={new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })}
              aria-invalid={!!errors.preferredDate}
            />
            {errors.preferredDate && (
              <span className="field-error">{errors.preferredDate.message}</span>
            )}
          </label>
        )}
      </div>
      {!compact && (
        <label className="form-field">
          Anything you’d like us to know?
          <textarea id={id('message')} rows={3} {...register('message')} />
          {errors.message && <span className="field-error">{errors.message.message}</span>}
        </label>
      )}
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input {...register('website')} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input
          id={id('consent')}
          type="checkbox"
          {...register('consent')}
          aria-invalid={!!errors.consent}
        />
        <span>
          I agree to be contacted by VLASY regarding my enquiry.{' '}
          <a href="/privacy-policy">Privacy policy</a>
        </span>
      </label>
      {errors.consent && <p className="field-error">{errors.consent.message}</p>}
      {failure && (
        <p className="form-error" role="alert">
          {failure}
        </p>
      )}
      <button className="button" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Sending your enquiry…' : compact ? 'Request consultation' : 'Send enquiry'}
        {isSubmitting ? <LoaderCircle size={17} className="spin" /> : <ArrowUpRight size={17} />}
      </button>
      <p className="form-note">
        An enquiry is the beginning of a conversation. Appointments are confirmed by our team.
      </p>
    </form>
  );
}
