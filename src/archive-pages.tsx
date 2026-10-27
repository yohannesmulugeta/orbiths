import { useRef, useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, ArrowRight, Search, X, ChevronLeft, ChevronRight, Pause, Play, ClipboardCheck, BriefcaseBusiness, PackageCheck, Wrench, GraduationCap, LifeBuoy } from 'lucide-react';
import { CallToAction, Eyebrow, MotionContainer, ResponsiveImage, TextLink } from './components';
import { services } from './content';
import archive from './archive-data.json';

const media = (file:string) => `${import.meta.env.BASE_URL}archive/${file}`;
function PageIntro({label,title,copy}:{label:string,title:string,copy:string}) {
  return <section className="inner-hero shell"><Eyebrow section="ORBIT HEALTH SOLUTIONS" label={label}/><h1>{title}</h1><div className="inner-hero-foot"><p>{copy}</p><span>{label} <ArrowDownRight size={22}/></span></div></section>;
}
const serviceIcons = [ClipboardCheck, BriefcaseBusiness, PackageCheck, Wrench, GraduationCap, LifeBuoy];
export function ServicesPage(){
  return <MotionContainer><PageIntro label="OUR SERVICES" title="Support at every step." copy="From project identification to technical support, our six services connect the work required to equip and support public and private healthcare facilities."/>
    <section className="shell section-block service-grid" aria-label="Our six services">{services.map((service,i)=>{ const Icon = serviceIcons[i]; return <article className="service-tile" key={service.title} data-reveal><div className="service-icon" aria-hidden="true"><Icon size={26} strokeWidth={1.5}/></div><span className="small-kicker">SERVICE / {String(i+1).padStart(2,'0')}</span><h2>{service.title}</h2><p>{service.copy}</p><TextLink to="/contact">Discuss your requirements</TextLink></article>; })}</section>
    <section className="shell service-statement"><h2>Built around local needs.</h2><p>Orbit Health Solutions has undertaken projects in Ethiopia's public healthcare sector. Our focus is on technically compliant equipment, products and related services, with efficient, cost effective implementation tailored to each project.</p><TextLink to="/solutions">Explore all eight solution areas</TextLink></section><CallToAction/></MotionContainer>;
}
const partnerDirectory = [...archive.partners].sort((a,b)=>a.name.localeCompare(b.name,'en',{sensitivity:'base'}));
const partnerGroups = [
  {label:'All partners',from:'A',to:'Z'},
  {label:'A–F',from:'A',to:'F'},
  {label:'G–M',from:'G',to:'M'},
  {label:'N–Z',from:'N',to:'Z'},
];
function inPartnerGroup(name:string,index:number) {
  const initial=name.charAt(0).toUpperCase();
  return index===0 || (initial>=partnerGroups[index].from && initial<=partnerGroups[index].to);
}
function DirectoryLogo({partner}:{partner:typeof archive.partners[number]}) {
  const [failed,setFailed]=useState(false);
  return failed?<span className="partner-logo-fallback">{partner.name}</span>:<img src={media(partner.file)} width={partner.width} height={partner.height} loading="lazy" decoding="async" alt={`${partner.name} logo`} onError={()=>setFailed(true)}/>;
}
export function PartnersPage(){
  const [search,setSearch]=useState('');
  const [group,setGroup]=useState(0);
  const pageRef=useRef<HTMLDivElement>(null);
  const searchInput=useRef<HTMLInputElement>(null);
  const query=search.trim().toLowerCase();
  const partners=partnerDirectory.filter(partner=>inPartnerGroup(partner.name,group) && partner.name.toLowerCase().includes(query));
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('partner-is-visible');observer.unobserve(entry.target)}
      });
    },{threshold:0.12});
    pageRef.current?.querySelectorAll('.partners-logo-grid > li:not(.partner-is-visible)').forEach(item=>observer.observe(item));
    return ()=>observer.disconnect();
  },[group,query]);
  const filtered=Boolean(query || group);
  const reset=()=>{setSearch('');setGroup(0);searchInput.current?.focus()};
  return <div ref={pageRef} className="partners-page">
    <section className="partners-intro shell" aria-labelledby="partners-title">
      <nav className="partners-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Partners</span></nav>
      <div className="partners-hero">
        <div className="partners-hero-copy"><h1 id="partners-title">Our technology<br/><em>partners.</em></h1><p>Explore the manufacturers and organizations in the ORBIT Health Solutions partner directory.</p><a href="#partner-directory" onClick={event=>{event.preventDefault();document.getElementById('partner-directory')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}}>Explore the directory <ArrowDownRight size={18}/></a></div>
        <figure className="partners-hero-photo"><ResponsiveImage src={`${import.meta.env.BASE_URL}images/company-training-hq.webp`} alt="ORBIT team visiting B Medical Systems in Luxembourg" eager sizes="(max-width: 760px) 100vw, 47vw"/><figcaption>ORBIT team at B Medical Systems, Luxembourg</figcaption></figure>
      </div>
    </section>
    <section id="partner-directory" className="partners-directory shell" aria-labelledby="partners-directory-title">
      <div className="partners-directory-top"><div><h2 id="partners-directory-title">The partner directory</h2><p>Browse manufacturers and organizations, A–Z.</p></div><span className="partners-total">{partnerDirectory.length}<small>COMPANIES</small></span></div>
      <div className="partners-toolbar">
        <div className="partners-group-filter" role="group" aria-label="Filter partners by name">{partnerGroups.map((item,index)=><button key={item.label} type="button" aria-pressed={group===index} aria-controls="partners-results" onClick={()=>setGroup(index)}>{item.label}<span>{partnerDirectory.filter(partner=>inPartnerGroup(partner.name,index)).length}</span></button>)}</div>
        <div className="partners-search-field"><Search size={18} aria-hidden="true"/><label className="sr-only" htmlFor="partners-search">Search partners</label><input ref={searchInput} id="partners-search" type="search" placeholder="Search company name" value={search} onChange={event=>setSearch(event.target.value)} aria-controls="partners-results"/>{search && <button type="button" aria-label="Clear partner search" onClick={()=>{setSearch('');searchInput.current?.focus()}}><X size={17}/></button>}</div>
      </div>
      <div className="partners-results-heading"><p role="status" aria-live="polite" aria-atomic="true">{filtered?`${partners.length} of ${partnerDirectory.length} companies`:`All ${partnerDirectory.length} companies`}{query?` matching “${search.trim()}”`:''}</p><span>LISTED A–Z</span></div>
      <ul id="partners-results" className="partners-logo-grid" aria-label="Partner companies">{partners.map((partner,index)=><li key={partner.file} style={{animationDelay:`${(index%5)*40}ms`}}><article className="partners-logo-card"><div className="partners-logo-stage"><DirectoryLogo partner={partner}/></div><h3>{partner.name}</h3></article></li>)}</ul>
      {partners.length===0?<div className="partners-empty"><Search size={28} strokeWidth={1.5} aria-hidden="true"/><h3>No companies found</h3><p>Try a different name or clear the filters to see every partner.</p><button type="button" onClick={reset}>Show all partners <ArrowRight size={16}/></button></div>:null}
      {filtered && partners.length>0?<button type="button" className="partners-reset" onClick={reset}>Clear filters <X size={14}/></button>:null}
      <p className="partners-availability">For current manufacturer information and product availability, <Link to="/contact">contact our team.</Link></p>
    </section>
    <section className="partners-help shell" aria-labelledby="partners-help-title"><div><h2 id="partners-help-title">Have a manufacturer<br/>or project in mind?</h2><p>Tell us what your facility needs. Our team can help you explore equipment options and the support your project requires.</p></div><div className="partners-help-actions"><Link className="partners-contact-button" to="/contact">Talk to our team <ArrowUpRight size={20}/></Link><Link to="/services">Explore our services <ArrowUpRight size={16}/></Link></div></section>
  </div>;
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
    <div className="archive-gallery">{filtered.slice(0,limit).map((photo,i)=><button type="button" className="gallery-photo" key={photo.file} aria-label={`View ${photo.caption}, photograph ${i+1}`} onClick={()=>setActive(i)}><img src={media(photo.file)} width={photo.width} height={photo.height} alt={`${photo.caption} — archive photograph ${i+1}`} loading={i < 6 ? 'eager' : 'lazy'} decoding="async"/><span>{photo.caption}<ArrowUpRight size={17}/></span></button>)}</div>
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
  const [copyStatus,setCopyStatus]=useState<'idle'|'copied'|'failed'>('idle');
  function buildEnquiry(form:HTMLFormElement){
    const data=new FormData(form);
    return ['Enquiry for Orbit Health Solutions','',...['Name','Email','Phone','Company','Message'].map(key=>key+': '+(data.get(key)||'—'))].join('\n');
  }
  function download(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const url=URL.createObjectURL(new Blob([buildEnquiry(event.currentTarget)],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='orbiths-enquiry.txt';a.click();
    URL.revokeObjectURL(url);setPrepared(true);
  }
  async function copyEnquiry(form:HTMLFormElement | null){
    if (!form || !form.reportValidity()) return;
    try { await navigator.clipboard.writeText(buildEnquiry(form));setCopyStatus('copied'); }
    catch { setCopyStatus('failed'); }
  }
  return <section className="shell section-block enquiry-section"><div><Eyebrow section="YOUR NEXT PROJECT" label="PREPARE AN ENQUIRY"/><h2>Tell us what you need.</h2><p>Prepare your project details, copy or download them, then call our team to arrange the next step. <strong>This form does not send information automatically.</strong></p><a href="tel:+251116507335" className="underlink">Call +251 11 650 7335 <ArrowUpRight size={18}/></a></div><form className="enquiry-form" onSubmit={download} onChange={()=>{setPrepared(false);setCopyStatus('idle');}}><label>Name<input name="Name" autoComplete="name" required maxLength={120}/></label><label>Email address<input name="Email" type="email" autoComplete="email" required maxLength={200}/></label><label>Phone number<input name="Phone" type="tel" autoComplete="tel" maxLength={60}/></label><label>Company<input name="Company" autoComplete="organization" maxLength={200}/></label><label className="form-wide">Message<textarea name="Message" rows={5} required maxLength={5000}/></label><button className="button-link button-dark form-wide" type="submit">Download enquiry <ArrowDownRight size={18}/></button><button className="button-link button-white enquiry-copy form-wide" type="button" onClick={event=>{void copyEnquiry(event.currentTarget.form);}}>Copy enquiry text <ArrowUpRight size={18}/></button><p className="form-wide form-status" role="status">{copyStatus==='copied'?'Enquiry copied to your clipboard. Contact the ORBIT team to share it.':copyStatus==='failed'?'Clipboard unavailable. Use Download enquiry instead.':prepared?'Enquiry downloaded. Contact the ORBIT team to share it.':'Your information stays in your browser unless you choose to download or copy it.'}</p></form></section>;
}
