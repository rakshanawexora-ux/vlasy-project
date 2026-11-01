import type { Metadata,Viewport } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactButtons } from '@/components/global/ContactButtons';
import { SmoothScrollProvider } from '@/components/global/SmoothScrollProvider';
import { EnquiryPopup } from '@/components/global/EnquiryPopup';
import { PageTransition } from '@/components/global/PageTransition';
import { SITE_CONFIG } from '@/lib/constants';
import '@/styles/globals.css';
import '@/styles/replacement.css';
const serif=localFont({src:[{path:'../public/fonts/serif.woff2',weight:'400',style:'normal'},{path:'../public/fonts/serif-italic.woff2',weight:'400',style:'italic'}],variable:'--font-serif',display:'swap'});
const sans=localFont({src:[{path:'../public/fonts/sans.woff2',weight:'400',style:'normal'},{path:'../public/fonts/sans-medium.woff2',weight:'500',style:'normal'}],variable:'--font-sans',display:'swap'});
export const metadata:Metadata={metadataBase:new URL(SITE_CONFIG.url),title:{default:SITE_CONFIG.name,template:'%s | VLASY'},description:'Personalised hair, beauty and professional training in Chennai.',applicationName:SITE_CONFIG.name};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#f8f7f4'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body><a href="#main-content" className="skip-link">Skip to content</a><SmoothScrollProvider/><Header/><main id="main-content"><PageTransition>{children}</PageTransition></main><Footer/><ContactButtons/><EnquiryPopup/></body></html>;}
