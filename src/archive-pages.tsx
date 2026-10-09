import { useRef, useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CallToAction, Eyebrow, MotionContainer, TextLink } from './components';
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
  return <MotionContainer><PageIntro label="OUR PARTNERS" title="Technology. Together." copy="Explore the manufacturers and partners featured by Orbit Health Solutions, supporting our approach to medical equipment and healthcare infrastructure."/>
    <section className="shell section-block"><div className="directory-heading"><h2>Our partner directory</h2><span>{archive.partners.length} PARTNERS</span></div><div className="partner-grid">{archive.partners.map(partner=><article className="partner-tile" key={partner.file}><div><img src={media(partner.file)} width={partner.width} height={partner.height} loading="lazy" decoding="async" alt={`${partner.name} logo`}/></div><h3>{partner.name}</h3></article>)}</div></section><CallToAction/></MotionContainer>;
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
export function CompanyPreview(){
  return <section className="shell section-block company-preview"><Eyebrow section="OUR PEOPLE & PARTNERS" label="THE CONNECTIONS BEHIND CARE"/><div className="company-preview-grid"><div><h2>Working together.<br/>Moving care forward.</h2><p>Meet our management team, explore our technology partners and see the people and projects in our company gallery.</p><div className="company-preview-links"><TextLink to="/partners">Our partners</TextLink><TextLink to="/team">Management team</TextLink><TextLink to="/gallery">Visit our gallery</TextLink><TextLink to="/services">Our six services</TextLink></div></div><div className="partner-preview">{archive.partners.slice(0,6).map(p=><Link to="/partners" key={p.file} aria-label={`Explore our partners: ${p.name}`}><img src={media(p.file)} alt={`${p.name} logo`} width={p.width} height={p.height} loading="lazy" decoding="async"/></Link>)}</div></div></section>;
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
