import { ActionLink,SectionLabel,TextLink } from './Primitives';
import { whatsappUrl } from '@/lib/constants';
export function FinalCTA(){return <section className="final-cta"><SectionLabel>YOUR NEXT CHAPTER</SectionLabel><h2>Ready for your<br/><em>transformation?</em></h2><p>Let’s find what feels right for you.<br/>Your first step is a conversation.</p><div className="button-row"><ActionLink href="/contact">Book an appointment</ActionLink><TextLink href={whatsappUrl()}>WhatsApp us</TextLink></div></section>;}
