import { Photo, SectionLabel } from '@/components/ui/Primitives';
import { servicePhotography } from '@/data/service-photography';

export function ServicePhotoStory({slug}:{slug:string}){
 const story=servicePhotography[slug];
 if(!story)return null;
 return <section className="section service-photo-story" aria-labelledby={`${slug}-visual-heading`}>
  <div className="service-story-heading"><div><SectionLabel>THE DETAILS MATTER</SectionLabel><h2 id={`${slug}-visual-heading`}>{story.heading}</h2></div><p>{story.introduction}</p></div>
  <div className="service-editorial-grid">{story.frames.map((frame,index)=><figure key={`${frame.src}-${index}`} className={`service-editorial-frame frame-${index+1}`}><Photo src={frame.src} alt={frame.alt}/><figcaption><span>0{index+1}</span>{frame.caption}</figcaption></figure>)}</div>
  <p className="service-photography-note">AI-created editorial references for your consultation. These images do not document VLASY clients, results or branch interiors.</p>
 </section>;
}
