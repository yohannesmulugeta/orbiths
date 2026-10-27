import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, MoveUpRight, Pause, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eyebrow, ResponsiveImage, TextLink } from './components';
import { images } from './content';

gsap.registerPlugin(ScrollTrigger);

const heroScenes = [
  { src: images.hero, label: 'ADVANCED DIAGNOSTICS', detail: 'Technology for precise diagnosis', position: '59% center' },
  { src: images.operatingRoom, label: 'CRITICAL CARE ENVIRONMENTS', detail: 'Equipment for care where it matters', position: 'center center' },
  { src: images.microscope, label: 'LABORATORY & RESEARCH', detail: 'Tools that support discovery', position: 'center center' }
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => setInView(entries[0]?.isIntersecting ?? true), { threshold: 0.08 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduced || !inView) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % heroScenes.length), 6800);
    return () => window.clearInterval(timer);
  }, [paused, reduced, inView]);

  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cine-image-stack', { yPercent: -4, scale: 1.07 }, {
        yPercent: 4, scale: 1.07, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.7 }
      });
      gsap.fromTo('.cine-content > *', { y: 22, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.1
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return <section ref={ref} className="cinematic-hero shell" aria-labelledby="hero-title">
    <div className="cine-stage">
      <div className="cine-image-stack" aria-hidden="true">
        {heroScenes.map((scene, i) => <div className={'cine-shot ' + (active === i ? 'is-active' : '')} key={scene.label}>
          <ResponsiveImage src={scene.src} alt="" eager={i === 0} sizes="100vw"/>
        </div>)}
      </div>
      <div className="cine-vignette" aria-hidden="true"/>
      <div className="cine-gridlines" aria-hidden="true"/>
      <div className="cine-content">
        <h1 id="hero-title">Equipping Ethiopia<br/>for <em>better care.</em></h1>
        <p>Medical equipment and healthcare infrastructure—supported from project planning through installation, training and technical service.</p>
        <div className="cine-actions">
          <Link to="/solutions" className="cine-primary">Explore solutions <ArrowUpRight size={19}/></Link>
          <Link to="/contact" className="cine-secondary">Discuss a project <ArrowRight size={18}/></Link>
        </div>
      </div>
      <div className="cine-float-note" aria-hidden="true"><span className="cine-note-index">01 / ORBIT</span><span>PLANNING · EQUIPMENT · SUPPORT</span></div>
      <div className="cine-bottom">
        <div className="cine-caption" aria-live="off"><span>FEATURED FIELD / {String(active + 1).padStart(2, '0')}</span><strong>{heroScenes[active].label}</strong><small>{heroScenes[active].detail} · Illustrative imagery</small></div>
        <div className="cine-controls">
          <div className="cine-dots" role="group" aria-label="Hero scene selection">
            {heroScenes.map((scene, i) => <button key={scene.label} type="button" onClick={() => setActive(i)} aria-label={'Show ' + scene.label.toLowerCase()} aria-pressed={i === active}><span/></button>)}
          </div>
          <button className="cine-pause" type="button" aria-label={paused ? 'Play hero scenes' : 'Pause hero scenes'} aria-pressed={paused || reduced} disabled={reduced} onClick={() => setPaused(value => !value)}>{paused || reduced ? <Play size={17}/> : <Pause size={17}/>}</button>
        </div>
      </div>
    </div>
    <div className="cine-underbar"><span>01 — THE ORBIT EXPERIENCE</span><span>TECHNOLOGY DESIGNED AROUND CARE</span><button type="button" onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}>SCROLL TO DISCOVER <ArrowDown size={15}/></button></div>
  </section>;
}

const steps = [
  { number: '01', tag: 'DISCOVER & PLAN', title: 'Start with the care environment.', copy: 'Identify facility needs and shape an appropriate healthcare equipment or infrastructure plan.', image: images.operatingRoom, alt: 'Illustrative modern operating room with medical equipment', label: 'Care environments · Illustrative photography' },
  { number: '02', tag: 'SELECT & SUPPLY', title: 'Bring the right technology together.', copy: 'Match medical equipment and systems to the technical requirements of the facility.', image: images.hero, alt: 'Illustrative diagnostic medical imaging system', label: 'Diagnostic technology · Illustrative photography' },
  { number: '03', tag: 'INSTALL & COMMISSION', title: 'Turn delivery into operation.', copy: 'Support installation and commissioning so equipment can be put into service.', image: import.meta.env.BASE_URL + 'images/installation-hq.webp', alt: 'Equipment installation photograph from the company archive', label: 'Installation work · ORBIT company archive' },
  { number: '04', tag: 'TRAIN & SUPPORT', title: 'Support the people behind the equipment.', copy: 'Provide training and technical assistance to help teams use and maintain their systems.', image: images.companyTraining, alt: 'Training photograph from the ORBIT company archive', label: 'Team training · ORBIT company archive' }
];

export function CareJourney() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const cards = ref.current.querySelectorAll('[data-journey-step]');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.journeyStep));
    }, { rootMargin: '-30% 0px -38% 0px', threshold: 0 });
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <section className="care-journey section-block" ref={ref} id="care-journey" aria-labelledby="care-journey-title">
    <div className="shell">
      <Eyebrow section="THE CARE JOURNEY" label="FROM THE FIRST PLAN TO EVERYDAY USE"/>
      <div className="journey-heading">
        <h2 id="care-journey-title" className="display-heading">Technology is only<br/><span className="muted">the beginning.</span></h2>
        <p>We connect the stages that take a healthcare project from an initial idea to a working clinical environment.</p>
      </div>
      <div className="journey-layout">
        <div className="journey-sticky">
          <div className="journey-stage">
            {steps.map((step, index) => <div className={'journey-photo ' + (index === active ? 'is-active' : '')} key={step.number} aria-hidden={index !== active}>
              <ResponsiveImage src={step.image} alt={index === active ? step.alt : ''} eager={index === 0} sizes="(max-width: 900px) 100vw, 54vw"/>
            </div>)}
            <div className="journey-stage-overlay"><span>THE ORBIT APPROACH</span><strong>{steps[active].number} / 04</strong></div>
          </div>
          <p className="journey-photo-label">{steps[active].label}</p>
        </div>
        <div className="journey-steps">
          {steps.map((step, index) => <article className={'journey-step ' + (index === active ? 'is-active' : '')} data-journey-step={index} key={step.number}>
            <div className="journey-step-meta"><span>{step.number} / 04</span><span>{step.tag}</span></div>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
            <div className="journey-mobile-image"><ResponsiveImage src={step.image} alt={step.alt} sizes="100vw"/><span>{step.label}</span></div>
            <TextLink to="/services">Discover our services</TextLink>
          </article>)}
        </div>
      </div>
      <div className="journey-foot"><span><Check size={18}/> One connected approach</span><Link to="/services">Explore all services <ArrowUpRight size={17}/></Link><span>{reduced ? 'STATIC PRESENTATION' : 'SCROLL TO EXPLORE EACH STEP'}</span></div>
    </div>
  </section>;
}

const lensItems = [
  { label: 'IMAGING', short: 'Diagnostic environments', src: images.hero, alt: 'Illustrative diagnostic imaging scanner', title: 'Diagnostics that inform decisions.', number: '01' },
  { label: 'LABORATORY', short: 'Laboratory precision', src: images.microscope, alt: 'Illustrative laboratory microscope', title: 'Technology for closer discovery.', number: '02' },
  { label: 'CLINICAL', short: 'Critical care equipment', src: images.operatingRoom, alt: 'Illustrative medical operating room', title: 'Made for critical moments.', number: '03' }
];

export function TechnicalLens() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const selected = lensItems[active];

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType === 'touch') return;
    const rectangle = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rectangle.left) / rectangle.width - 0.5;
    const y = (event.clientY - rectangle.top) / rectangle.height - 0.5;
    event.currentTarget.style.setProperty('--lens-x', String(x * 10) + 'deg');
    event.currentTarget.style.setProperty('--lens-y', String(-y * 8) + 'deg');
  }
  function reset() {
    ref.current?.style.setProperty('--lens-x', '0deg');
    ref.current?.style.setProperty('--lens-y', '0deg');
  }

  return <section className="technical-lens section-block shell" aria-labelledby="lens-title">
    <Eyebrow section="CLOSER LOOK" label="MEDICAL TECHNOLOGY"/>
    <div className="lens-heading"><div><h2 id="lens-title" className="display-heading">A new perspective<br/>on <span className="muted">precision.</span></h2><p>Explore three of our healthcare technology categories through an interactive, layered visual experience.</p></div><span className="lens-heading-stamp">03 AREAS / ONE FOCUS</span></div>
    <div className="lens-shell">
      <div className="lens-viewport" ref={ref} onPointerMove={move} onPointerLeave={reset}>
        <div className="lens-space" aria-hidden="true"><span/><span/><span/><span/></div>
        <div className="lens-device" key={selected.label}><ResponsiveImage src={selected.src} alt={selected.alt} eager sizes="(max-width: 900px) 100vw, 52vw"/></div>
        <div className="lens-corner lens-corner-top" aria-hidden="true">ORBIT / TECHNICAL LENS <span>{selected.number} : 03</span></div>
        <div className="lens-cross" aria-hidden="true">+</div>
        <div className="lens-corner lens-corner-bottom" aria-hidden="true">{selected.short.toUpperCase()} <span>↗</span></div>
      </div>
      <div className="lens-info">
        <span className="lens-kicker">INTERACTIVE TECHNOLOGY PREVIEW</span>
        <h3>{selected.title}</h3>
        <p>Explore the equipment categories ORBIT supports and discuss technical requirements with our team.</p>
        <div className="lens-options" role="group" aria-label="Choose equipment category">
          {lensItems.map((item, index) => <button type="button" key={item.label} aria-pressed={active === index} onClick={() => { reset(); setActive(index); }}><span>{item.number}</span>{item.label}<MoveUpRight size={17}/></button>)}
        </div>
        <Link className="lens-link" to="/solutions">View solution details <ArrowUpRight size={19}/></Link>
        <p className="lens-disclaimer">Illustrative imagery and layered 3D-style interaction; not a 360° product model or an inventory listing.</p>
      </div>
    </div>
  </section>;
}

const showcase = [
  { image: images.companyTraining, label: 'TRAINING / PEOPLE', title: 'Knowledge behind the technology.', copy: 'A look at training activities documented in the original ORBIT company photo archive.', caption: 'ORBIT company archive · Training' },
  { image: import.meta.env.BASE_URL + 'images/installation-hq.webp', label: 'IMPLEMENTATION / WORK', title: 'Seeing work take shape.', copy: 'Installation photography from the company archive, documenting the practical side of healthcare technology.', caption: 'ORBIT company archive · Installation' }
];

export function ProjectHighlights() {
  return <section className="project-highlights section-block" aria-labelledby="project-highlights-title">
    <div className="shell">
      <div className="project-heading"><div><Eyebrow section="THE PEOPLE & THE WORK" label="FROM THE COMPANY PHOTO ARCHIVE"/><h2 id="project-highlights-title" className="display-heading">Beyond the<br/><span className="muted">specification sheet.</span></h2></div><p>Healthcare technology involves real people and practical work. Take a closer look at moments documented by the ORBIT team.</p></div>
      <div className="project-grid">
        {showcase.map((item, index) => <Link to="/gallery" className="project-card" key={item.label} data-reveal>
          <div className="project-photo"><ResponsiveImage src={item.image} alt={item.caption} sizes="(max-width: 700px) 100vw, 45vw"/><span className="project-number">0{index + 1} / 02</span><span className="project-arrow"><ArrowUpRight size={24}/></span></div>
          <div className="project-card-body"><span>{item.label}</span><h3>{item.title}</h3><p>{item.copy}</p><small>{item.caption}</small></div>
        </Link>)}
      </div>
      <div className="project-foot"><span>Archive photography illustrates company activities; it does not establish project performance claims.</span><Link to="/gallery">See the full photo archive <ArrowUpRight size={17}/></Link></div>
    </div>
  </section>;
}
