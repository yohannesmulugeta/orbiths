import { useRef, useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { CallToAction, Eyebrow, MotionContainer, ResponsiveImage, TextLink } from './components';
import { services } from './content';
import archive from './archive-data.json';

const media = (file:string) => `${import.meta.env.BASE_URL}archive/${file}`;
function PageIntro({label,title,copy}:{label:string,title:string,copy:string}) {
  return <section className="inner-hero shell"><Eyebrow section="ORBIT HEALTH SOLUTIONS" label={label}/><h1>{title}</h1><div className="inner-hero-foot"><p>{copy}</p><span>{label} <ArrowDownRight size={22}/></span></div></section>;
}
export function ServicesPage(){
  return <MotionContainer><PageIntro label="OUR SERVICES" title="Support at every step." copy="From project identification to technical support, our six services connect the work required to equip and support public and private healthcare facilities."/>
    <section className="shell section-block service-grid" aria-label="Our six services">{services.map((service,i)=><article className="service-tile" key={service.title} data-reveal><span className="small-kicker">SERVICE / {String(i+1).padStart(2,'0')}</span><h2>{service.title}</h2><p>{service.copy}</p><TextLink to="/contact">Discuss your requirements</TextLink></article>)}</section>
    <section className="shell service-statement"><h2>Built around local needs.</h2><p>Orbit Health Solutions has undertaken projects in Ethiopia's public healthcare sector. Our focus is on technically compliant equipment, products and related services, with efficient, cost effective implementation tailored to each project.</p><TextLink to="/solutions">Explore all eight solution areas</TextLink></section><CallToAction/></MotionContainer>;
}
export function PartnersPage(){
  const [search,setSearch]=useState('');
  const partners=archive.partners.filter(partner=>partner.name.toLowerCase().includes(search.trim().toLowerCase()));
  return <MotionContainer><PageIntro label="OUR PARTNERS" title="Technology. Together." copy="Explore the manufacturers and partners featured by Orbit Health Solutions, supporting our approach to medical equipment and healthcare infrastructure."/>
    <section className="shell section-block"><div className="directory-heading"><h2>Our partner directory</h2><span>{archive.partners.length} PARTNERS</span></div><label className="partner-search">Find a partner<input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder="Search by company name"/></label><p className="directory-count" role="status">{partners.length} {partners.length===1?'partner':'partners'}{search.trim()?` matching “${search.trim()}”`:''}</p><div className="partner-grid">{partners.map(partner=><article className="partner-tile" key={partner.file}><div><img src={media(partner.file)} width={partner.width} height={partner.height} loading="lazy" decoding="async" alt={`${partner.name} logo`}/></div><h3>{partner.name}</h3></article>)}</div>{partners.length===0?<p>No partners match this search. Try another company name.</p>:null}</section><CallToAction/></MotionContainer>;
}

export function PartnerMarquee(){
  const [paused,setPaused]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{const mediaQuery=window.matchMedia('(prefers-reduced-motion: reduce)');const onChange=(event:MediaQueryListEvent)=>setPaused(event.matches);mediaQuery.addEventListener('change',onChange);return()=>mediaQuery.removeEventListener('change',onChange)},[]);
  return <section className="partner-strip" aria-labelledby="partner-strip-title">
    <div className="shell partner-strip-heading"><div><span className="small-kicker">OUR TECHNOLOGY PARTNERS</span><h2 id="partner-strip-title">Working together for better care.</h2></div><div className="partner-strip-actions"><TextLink to="/partners">Explore all partners</TextLink><button type="button" className="partner-motion-toggle" aria-label={paused?'Play partner logo animation':'Pause partner logo animation'} aria-pressed={paused} aria-controls="partner-logo-track" onClick={()=>setPaused(value=>!value)}>{paused?<Play size={16}/>:<Pause size={16}/>}<span>{paused?'Play':'Pause'}</span></button></div></div>
    <div className={'partner-window '+(paused?'is-paused':'')}><div className="partner-track" id="partner-logo-track"><ul className="partner-run">{archive.partners.map(partner=><li key={partner.file}><Link to="/partners" aria-label={`View partner directory: ${partner.name}`}><img src={media(partner.file)} width={partner.width} height={partner.height} loading="lazy" decoding="async" alt={`${partner.name} logo`}/><span>{partner.name}</span></Link></li>)}</ul><div className="partner-run partner-run-copy" aria-hidden="true">{archive.partners.map(partner=><div className="partner-copy-card" key={partner.file}><img src={media(partner.file)} width={partner.width} height={partner.height} loading="lazy" decoding="async" alt=""/><span>{partner.name}</span></div>)}</div></div></div>
  </section>;
}

const team = [
  {name:'Martha Ayenew',role:'Managing Director',file:'team-1.webp',initials:'MA'},
  {name:'Kumlachew Yeshambel',role:'Deputy General Manager & Commercial Division Head',file:'team-2.webp',initials:'KY'},
  {name:'Wudu Ayalew Melaku',role:'Cold Chain Advisor',file:null,initials:'WM'},
  {name:'Zerihun Dagne',role:'After Sales Coordinator',file:null,initials:'ZD'},
];
export function TeamPage(){
  return <MotionContainer><PageIntro label="OUR MANAGEMENT TEAM" title="People behind the progress." copy="Meet the management team featured by Orbit Health Solutions, bringing together company leadership, commercial coordination, cold-chain advice and after-sales support."/>
    <section className="shell section-block team-grid" aria-label="Management team">{team.map(person=><article className="team-card" key={person.name} data-reveal><div className="team-portrait">{person.file?<img src={media(person.file)} alt={person.name} loading="lazy" decoding="async"/>:<span className="team-initials" aria-hidden="true">{person.initials}</span>}</div><h2>{person.name}</h2><p>{person.role}</p></article>)}</section><CallToAction/></MotionContainer>;
}
const categories=['All','Training','COVID preparation','Installations','Team events'];
export function GalleryPage(){
  const [category,setCategory]=useState('All');
  const [limit,setLimit]=useState(18);
  const [active,setActive]=useState<number|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const filtered=category==='All'?archive.gallery:archive.gallery.filter(photo=>photo.category===category);
  const selected=active===null?null:filtered[active];
  useEffect(()=>{
    if(selected){dialog.current?.showModal();const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before;dialog.current?.close()};}
  },[selected]);
  return <MotionContainer><PageIntro label="OUR GALLERY" title="Our work. Our people." copy="A photographic archive of training, COVID preparation, equipment installations and team events from the original OrbitHS gallery."/>
    <section className="shell section-block gallery-section"><div className="gallery-filters" aria-label="Filter photographs">{categories.map(c=><button type="button" key={c} aria-pressed={category===c} onClick={()=>{setCategory(c);setLimit(18);setActive(null);}}>{c} <span>{c==='All'?archive.gallery.length:archive.gallery.filter(p=>p.category===c).length}</span></button>)}</div><p className="gallery-count" role="status">Showing {Math.min(limit,filtered.length)} of {filtered.length} photographs{category!=='All'?` · ${category}`:''}</p>
    <div className="archive-gallery">{filtered.slice(0,limit).map((photo,i)=><button type="button" className="gallery-photo" key={photo.file} aria-label={`View ${photo.caption}, photograph ${i+1}`} onClick={()=>setActive(i)}><img src={media(photo.file)} width={photo.width} height={photo.height} alt={`${photo.caption} — archive photograph ${i+1}`} loading="lazy" decoding="async"/><span>{photo.caption}<ArrowUpRight size={17}/></span></button>)}</div>
    {limit<filtered.length?<div className="gallery-load"><button type="button" className="button-link button-dark" onClick={()=>setLimit(n=>n+18)}>Load more photographs <ArrowDownRight size={18}/></button></div>:null}
    <dialog ref={dialog} className="photo-dialog" aria-label="Gallery photograph" onCancel={()=>setActive(null)} onClick={e=>{if(e.target===e.currentTarget)setActive(null)}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();setActive(n=>n===null?n:(n+1)%filtered.length)}if(e.key==='ArrowLeft'){e.preventDefault();setActive(n=>n===null?n:(n-1+filtered.length)%filtered.length)}}}>{selected?<div className="photo-dialog-inner"><button type="button" className="photo-close" aria-label="Close photograph" onClick={()=>setActive(null)} autoFocus><X/></button><img src={media(selected.file)} alt={selected.caption}/><div className="photo-dialog-controls"><button type="button" aria-label="Previous photograph" onClick={()=>setActive(n=>n===null?n:(n-1+filtered.length)%filtered.length)}><ChevronLeft/></button><p>{selected.caption}<small>{(active??0)+1} / {filtered.length}</small></p><button type="button" aria-label="Next photograph" onClick={()=>setActive(n=>n===null?n:(n+1)%filtered.length)}><ChevronRight/></button></div></div>:null}</dialog>
    </section><CallToAction/></MotionContainer>;
}
const companyPhotos=[{file:'company-training-hq',caption:'Training at B Medical Systems, Luxembourg'},{file:'installation-hq',caption:'Installation work from our company archive'}];
export function CompanyPreview(){
  return <section className="shell section-block company-preview"><Eyebrow section="OUR PEOPLE & WORK" label="FROM THE COMPANY GALLERY"/><div className="company-preview-grid"><div><h2>See the people<br/>behind the work.</h2><p>Explore our training and installation archive, and meet the management team behind Orbit Health Solutions.</p><div className="company-preview-links"><TextLink to="/gallery">Explore the gallery</TextLink><TextLink to="/team">Meet our team</TextLink><TextLink to="/services">View our services</TextLink></div></div><div className="company-photo-preview">{companyPhotos.map(photo=><Link to="/gallery" key={photo.file}><ResponsiveImage src={`${import.meta.env.BASE_URL}images/${photo.file}.webp`} alt={photo.caption} sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 28vw"/><span>{photo.caption}<ArrowUpRight size={16}/></span></Link>)}</div></div></section>;
}

export function EnquiryDraft(){
  const [prepared,setPrepared]=useState(false);
  function download(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const data=new FormData(event.currentTarget);
    const body=['Enquiry for Orbit Health Solutions','',...['Name','Email','Phone','Company','Message'].map(key=>`${key}: ${data.get(key)||'—'}`)].join('\n');
    const url=URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='orbiths-enquiry.txt';a.click();URL.revokeObjectURL(url);setPrepared(true);
  }
  return <section className="shell section-block enquiry-section"><div><Eyebrow section="YOUR NEXT PROJECT" label="PREPARE AN ENQUIRY"/><h2>Tell us what you need.</h2><p>Prepare your project details, then call our team to arrange the next step. Downloading saves your enquiry to your device; it does not send it to OrbitHS.</p><a href="tel:+251116507335" className="underlink">Call +251 11 650 7335 <ArrowUpRight size={18}/></a></div><form className="enquiry-form" onSubmit={download} onChange={()=>setPrepared(false)}><label>Name<input name="Name" autoComplete="name" required maxLength={120}/></label><label>Email address<input name="Email" type="email" autoComplete="email" required maxLength={200}/></label><label>Phone number<input name="Phone" type="tel" autoComplete="tel" maxLength={60}/></label><label>Company<input name="Company" autoComplete="organization" maxLength={200}/></label><label className="form-wide">Message<textarea name="Message" rows={5} required maxLength={5000}/></label><button className="button-link button-dark form-wide" type="submit">Download enquiry <ArrowDownRight size={18}/></button><p className="form-wide form-status" role="status">{prepared?'Your enquiry file is ready. Call our team to arrange follow-up.':'Your details stay on your device.'}</p></form></section>;
}
