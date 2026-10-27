import { useEffect, useLayoutEffect, useRef, useState, type PropsWithChildren, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imageMetadata from './image-metadata.json';
import { solutions } from './content';

gsap.registerPlugin(ScrollTrigger);

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo({top:0,behavior:'auto'}); return; }
    const id = decodeURIComponent(hash.slice(1));
    const frame = window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:'instant',block:'start'}));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);
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
    <img className="logo-image" src={`${import.meta.env.BASE_URL}orbit-logo.png`} alt="Orbit Health Solutions" width="305" height="113" decoding="async" />
  </Link>;
}

const companyLinks = [
  {to:'/about',label:'Our company',copy:'Our approach to better care'},
  {to:'/team',label:'Our team',copy:'Meet the people behind ORBIT'},
  {to:'/gallery',label:'Gallery',copy:'Training, installations & team life'},
];

export function SiteHeader() {
  const [open,setOpen] = useState(false);
  const [panel,setPanel] = useState<'solutions' | 'company' | null>(null);
  const [scrolled,setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  const location = useLocation();
  const companyActive = companyLinks.some(link=>link.to===location.pathname);
  const closeMenus = () => { setOpen(false); setPanel(null); };

  useEffect(closeMenus,[location.key]);
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>20);
    const desktop=window.matchMedia('(min-width: 1024px)');
    const onResize=()=>{setOpen(false);setPanel(null)};
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
    desktop.addEventListener('change',onResize);
    return ()=>{window.removeEventListener('scroll',onScroll);desktop.removeEventListener('change',onResize)};
  },[]);
  useEffect(()=>{
    const onOutside=(event:PointerEvent)=>{
      if (!header.current?.contains(event.target as Node)) setPanel(null);
    };
    const onEscape=(event:KeyboardEvent)=>{
      if(event.key==='Escape') {
        if(open) {setOpen(false);setPanel(null);toggle.current?.focus()}
        else if(panel) {
          header.current?.querySelector<HTMLButtonElement>(`[data-disclosure="${panel}"]`)?.focus();
          setPanel(null);
        }
      }
    };
    document.addEventListener('pointerdown',onOutside);
    document.addEventListener('keydown',onEscape);
    return ()=>{document.removeEventListener('pointerdown',onOutside);document.removeEventListener('keydown',onEscape)};
  },[open,panel]);
  useEffect(()=>{
    if(!open) return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const background=Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    const previousInert=background.map(element=>element.inert);
    background.forEach(element=>{element.inert=true});
    mobileNav.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const trapFocus=(event:KeyboardEvent)=>{
      if(event.key!=='Tab') return;
      const controls=[toggle.current,...Array.from(mobileNav.current?.querySelectorAll<HTMLElement>('a, button') ?? [])]
        .filter((element):element is HTMLElement=>Boolean(element && element.getClientRects().length));
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus()}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus()}
    };
    document.addEventListener('keydown',trapFocus);
    return ()=>{
      document.body.style.overflow=previousOverflow;
      background.forEach((element,index)=>{element.inert=previousInert[index]});
      document.removeEventListener('keydown',trapFocus);
    };
  },[open]);

  const changePanel=(next:'solutions'|'company')=>setPanel(current=>current===next?null:next);
  const navClass=({isActive}:{isActive:boolean})=>'orbit-nav-link'+(isActive?' is-current':'');
  return <header ref={header} className={'site-header orbit-header'+(scrolled?' scrolled':'')+(open?' menu-is-open':'')}
    onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node | null))setPanel(null)}}>
    <div className="shell orbit-nav-bar">
      <OrbitMark />
      <nav className="orbit-desktop-nav" aria-label="Primary navigation">
        <NavLink to="/" end className={navClass}>Home</NavLink>
        <button type="button" data-disclosure="solutions" className={'orbit-nav-link orbit-disclosure'+(location.pathname==='/solutions'?' is-current':'')}
          aria-expanded={panel==='solutions'} aria-controls="orbit-solutions-panel" onClick={()=>changePanel('solutions')}>Solutions <ChevronDown size={14}/></button>
        <NavLink to="/services" className={navClass}>Services</NavLink>
        <NavLink to="/partners" className={navClass}>Partners</NavLink>
        <button type="button" data-disclosure="company" className={'orbit-nav-link orbit-disclosure'+(companyActive?' is-current':'')}
          aria-expanded={panel==='company'} aria-controls="orbit-company-panel" onClick={()=>changePanel('company')}>Company <ChevronDown size={14}/></button>
      </nav>
      <Link to="/contact" className="orbit-header-cta" onClick={closeMenus}>Let's talk <span><ArrowUpRight size={18}/></span></Link>
      <button ref={toggle} type="button" className="orbit-menu-toggle" aria-label={open?'Close menu':'Open menu'}
        aria-controls="orbit-mobile-nav" aria-expanded={open} onClick={()=>{setOpen(!open);setPanel(null)}}>
        <span>{open?'Close':'Menu'}</span>{open?<X size={21}/>:<Menu size={21}/>}</button>
    </div>
    <div className="orbit-desktop-panels">
      <div id="orbit-solutions-panel" className="orbit-mega-panel" hidden={panel!=='solutions'}>
        <div className="shell orbit-mega-layout">
          <div className="orbit-menu-intro"><span className="orbit-menu-eyebrow">OUR SOLUTIONS</span><h2>Technology.<br/>Built around care.</h2><p>Explore equipment and infrastructure for your healthcare facility.</p>
            <Link to="/solutions" onClick={closeMenus}>Explore all solutions <ArrowUpRight size={17}/></Link></div>
          <div className="orbit-solution-links">{solutions.map(item=><Link key={item.id} to={'/solutions#'+item.id} onClick={closeMenus}>
            <span className="orbit-menu-number">{item.number}</span><span><strong>{item.title}</strong><small>{item.short}</small></span><ArrowUpRight size={16}/>
          </Link>)}</div>
        </div>
        <div className="orbit-menu-bottom"><div className="shell"><span>A project in mind? Let's find the right solution.</span><Link to="/contact" onClick={closeMenus}>Talk to our team <ArrowRight size={15}/></Link></div></div>
      </div>
      <div id="orbit-company-panel" className="orbit-company-panel" hidden={panel!=='company'}>
        <span className="orbit-menu-eyebrow">GET TO KNOW ORBIT</span>
        {companyLinks.map(item=><NavLink key={item.to} to={item.to} onClick={closeMenus}><span><strong>{item.label}</strong><small>{item.copy}</small></span><ArrowUpRight size={17}/></NavLink>)}
      </div>
    </div>
    {open && <>
      <button type="button" className="orbit-menu-backdrop" tabIndex={-1} aria-label="Close navigation" onClick={()=>{closeMenus();toggle.current?.focus()}}/>
      <nav ref={mobileNav} id="orbit-mobile-nav" className="orbit-mobile-nav" aria-label="Mobile navigation">
        <div className="orbit-mobile-title"><span className="orbit-menu-eyebrow">EXPLORE ORBIT</span><span>HEALTH SOLUTIONS</span></div>
        <div className="orbit-mobile-links">
          <NavLink to="/" end className={navClass} onClick={closeMenus}><span>Home</span><ArrowUpRight size={18}/></NavLink>
          <div className="orbit-mobile-group">
            <div className="orbit-mobile-row"><NavLink to="/solutions" className={navClass} onClick={closeMenus}>Solutions</NavLink><button type="button" aria-label="Show solution categories" aria-expanded={panel==='solutions'} aria-controls="mobile-solutions" onClick={()=>changePanel('solutions')}><ChevronDown size={19}/></button></div>
            <div id="mobile-solutions" className="orbit-mobile-subnav" hidden={panel!=='solutions'}>{solutions.map(item=><Link key={item.id} to={'/solutions#'+item.id} onClick={closeMenus}>{item.title}<ArrowUpRight size={14}/></Link>)}</div>
          </div>
          <NavLink to="/services" className={navClass} onClick={closeMenus}><span>Services</span><ArrowUpRight size={18}/></NavLink>
          <NavLink to="/partners" className={navClass} onClick={closeMenus}><span>Partners</span><ArrowUpRight size={18}/></NavLink>
          <div className="orbit-mobile-group">
            <div className="orbit-mobile-row"><NavLink to="/about" className={()=>'orbit-nav-link'+(companyActive?' is-current':'')} onClick={closeMenus}>Company</NavLink><button type="button" aria-label="Show company pages" aria-expanded={panel==='company'} aria-controls="mobile-company" onClick={()=>changePanel('company')}><ChevronDown size={19}/></button></div>
            <div id="mobile-company" className="orbit-mobile-subnav" hidden={panel!=='company'}>{companyLinks.map(item=><NavLink key={item.to} to={item.to} onClick={closeMenus}>{item.label}<ArrowUpRight size={14}/></NavLink>)}</div>
          </div>
        </div>
        <div className="orbit-mobile-contact"><span className="orbit-menu-eyebrow">LET'S MOVE CARE FORWARD</span><Link to="/contact" className="orbit-mobile-cta" onClick={closeMenus}>Discuss your project <ArrowUpRight size={22}/></Link><a href="tel:+251116507335"><Phone size={15}/> +251 11 650 7335</a><span className="orbit-menu-location">ADDIS ABABA · ETHIOPIA</span></div>
      </nav>
    </>}
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

export function ResponsiveImage({src,alt,className='',eager=false,sizes='(max-width: 700px) 100vw, 50vw'}: {src:string,alt:string,className?:string,eager?:boolean,sizes?:string}) {
  const [failedSource,setFailedSource]=useState<string | null>(null);
  const key = src.split('/').pop()?.replace('.webp','') as keyof typeof imageMetadata;
  const metadata = imageMetadata[key];
  if (failedSource === src) return <span className={'image-unavailable '+className} role="img" aria-label={alt}>Image unavailable</span>;
  const variants: number[] = metadata && 'variants' in metadata ? metadata.variants : [640, metadata?.width ?? 640];
  const srcSet = metadata?.responsive ? variants.map(width => `${width === metadata.width ? src : src.replace('.webp', `-${width}.webp`)} ${width}w`).join(', ') : undefined;
  return <img className={className} src={src} srcSet={srcSet} sizes={srcSet ? sizes : undefined} width={metadata?.width} height={metadata?.height} alt={alt} loading={eager?'eager':'lazy'} fetchPriority={eager?'high':undefined} decoding="async" onError={()=>setFailedSource(src)} />;
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
      <div className="footer-nav"><div><span>EXPLORE</span><Link to="/">Home</Link><Link to="/solutions">Solutions</Link><Link to="/services">Services</Link><Link to="/partners">Partners</Link><Link to="/about">Company</Link><Link to="/team">Team</Link><Link to="/gallery">Gallery</Link></div><div><span>CONNECT</span><Link to="/contact">Contact</Link><a href="tel:+251116507335">+251 11 650 7335</a><a href="https://www.google.com/maps/search/?api=1&query=TK+Building+Addis+Ababa" target="_blank" rel="noreferrer">Find our office <ArrowUpRight size={13}/></a></div></div>
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
