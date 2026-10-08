import { useEffect, useLayoutEffect, useRef, useState, type PropsWithChildren, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { images } from './content';

gsap.registerPlugin(ScrollTrigger);

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({top:0,behavior:'auto'}); }, [pathname]);
  return null;
}

export function MotionContainer({ children, className = '' }: PropsWithChildren<{ className?:string }>) {
  const scope = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!scope.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      scope.current?.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { autoAlpha:0,y:38 }, {
          autoAlpha:1,y:0,duration:0.95,ease:'power3.out',
          scrollTrigger:{trigger:el,start:'top 92%',once:true}
        });
      });
    }, scope);
    return () => ctx.revert();
  },[]);
  return <div ref={scope} className={className}>{children}</div>;
}

export function OrbitMark({ light = false }: {light?:boolean}) {
  return <Link to="/" className={'logo-lockup '+(light?'logo-light':'')} aria-label="Orbit Health Solutions, homepage">
    <svg className="logo-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <ellipse cx="22" cy="22" rx="18" ry="10.5" transform="rotate(-37 22 22)" stroke="currentColor" strokeWidth="2.2" />
      <ellipse cx="22" cy="22" rx="18" ry="10.5" transform="rotate(53 22 22)" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="22" cy="22" r="3.7" fill="currentColor" />
    </svg>
    <span className="logo-text"><strong>orbit<span>hs</span></strong><small>HEALTH SOLUTIONS</small></span>
  </Link>;
}

const navItems = [
  {to:'/',label:'Home',end:true},{to:'/solutions',label:'Solutions'},
  {to:'/about',label:'Company'},{to:'/contact',label:'Contact'},
];

export function SiteHeader() {
  const [open,setOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const location = useLocation();
  useEffect(()=>setOpen(false),[location.pathname]);
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>20);
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);
  useEffect(()=>{
    const onEscape=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false)};
    window.addEventListener('keydown',onEscape);
    return ()=>window.removeEventListener('keydown',onEscape);
  },[]);
  useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow=''}},[open]);
  return <header className={'site-header '+(scrolled?'scrolled':'')}>
    <div className="shell nav-inner">
      <OrbitMark />
      <nav id="main-nav" aria-label="Primary navigation" className={'nav-links '+(open?'is-open':'')}>
        {navItems.map(item=><NavLink key={item.to} to={item.to} end={item.end} className={({isActive})=>'nav-link '+(isActive?'selected':'')}>{item.label}</NavLink>)}
        <Link className="mobile-menu-cta" to="/contact">Talk to our team <ArrowUpRight size={16}/></Link>
      </nav>
      <Link to="/contact" className="nav-cta">Let's talk <span className="circle-arrow"><ArrowUpRight size={18}/></span></Link>
      <button type="button" className="menu-button" aria-label={open?'Close menu':'Open menu'} aria-controls="main-nav" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={25}/>:<Menu size={25}/>}</button>
    </div>
  </header>;
}

export function Eyebrow({section,label,light=false}:{section:string,label:string,light?:boolean}) {
  return <div className={'eyebrow '+(light?'eyebrow-light':'')}><span className="number-tag">{section}</span><span className="eyebrow-rule"/><span>{label}</span></div>;
}

export function TextLink({to,children,light=false}:{to:string,children:ReactNode,light?:boolean}) {
  return <Link className={'underlink '+(light?'underlink-light':'')} to={to}>{children}<ArrowUpRight size={18} strokeWidth={1.6}/></Link>;
}

export function ButtonLink({to,children,kind='lime'}:{to:string,children:React.ReactNode,kind?:'lime'|'dark'|'white'}) {
  return <Link to={to} className={'button-link button-'+kind}><span>{children}</span><span className="button-arrow"><ArrowUpRight size={19}/></span></Link>;
}

export function ResponsiveImage({src,alt,className='',eager=false}: {src:string,alt:string,className?:string,eager?:boolean}) {
  const [source,setSource]=useState(src);
  return <img className={className} src={source} alt={alt} loading={eager?'eager':'lazy'} decoding="async" onError={()=>{if(source!==images.radiology)setSource(images.radiology)}} />;
}

export function CallToAction() {
  return <section className="cta-wrapper shell" aria-labelledby="cta-heading">
    <div className="cta-panel" data-reveal>
      <div className="cta-top"><span>THE NEXT STEP</span><span>ORBIT HEALTH SOLUTIONS PLC</span></div>
      <div className="cta-middle"><h2 id="cta-heading">Let's move<br/><em>care forward.</em></h2><Link to="/contact" className="cta-circle" aria-label="Get in touch"><ArrowUpRight size={40} strokeWidth={1.3}/></Link></div>
      <div className="cta-bottom"><p>Starting a new facility project or upgrading existing equipment?<br/>Let's find the right solution together.</p><span>ADDIS ABABA · ETHIOPIA</span></div>
    </div>
  </section>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-top">
      <div className="footer-intro"><OrbitMark/><p>Medical equipment. Healthcare infrastructure.<br/>Thoughtful solutions for better care.</p></div>
      <div className="footer-nav"><div><span>EXPLORE</span><Link to="/">Home</Link><Link to="/solutions">Solutions</Link><Link to="/about">Company</Link></div><div><span>CONNECT</span><Link to="/contact">Contact</Link><a href="tel:+251116507335">+251 11 650 7335</a><a href="https://www.google.com/maps/search/?api=1&query=TK+Building+Addis+Ababa" target="_blank" rel="noreferrer">Find our office <ArrowUpRight size={13}/></a></div></div>
    </div>
    <div className="footer-base"><span>© {new Date().getFullYear()} ORBIT HEALTH SOLUTIONS PLC</span><span>DESIGNED WITH PURPOSE</span><a href="#top" onClick={(e)=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>BACK TO TOP ↑</a></div>
  </div></footer>;
}

export function ScrollCue() {
  return <a href="#discover" className="hero-scroll" onClick={(e)=>{e.preventDefault();document.getElementById('discover')?.scrollIntoView({behavior:'smooth'})}}><span>SCROLL TO DISCOVER</span><ArrowDown size={15}/></a>;
}

export function ArrowBadge() {
  return <span className="arrow-badge"><ArrowUpRight size={20} strokeWidth={1.6}/></span>;
}

export { ArrowRight };
