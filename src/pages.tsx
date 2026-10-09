import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, MapPin, Phone, Clock3, MoveUpRight, Plus } from 'lucide-react';
import { approach, capabilities, images, solutions, type Service } from './content';
import { ArrowBadge, ButtonLink, CallToAction, Eyebrow, MotionContainer, ResponsiveImage, TextLink } from './components';
import { CompanyPreview, EnquiryDraft, PartnerMarquee } from './archive-pages';

function Hero() {
  return <section className="hero-section shell" aria-labelledby="hero-title">
    <div className="hero-panel">
      <div className="hero-inner">
        <div className="hero-kicker"><span className="pulse-dot"/> ORBIT HEALTH SOLUTIONS · ETHIOPIA</div>
        <h1 id="hero-title">Healthcare<br/>technology.<br/><span>Better care.</span></h1>
        <div className="hero-copy"><p>Medical equipment and healthcare infrastructure for public and private facilities. From project planning to installation, training and technical support.</p><div className="hero-buttons"><ButtonLink to="/solutions" kind="white">Explore solutions</ButtonLink><TextLink to="/contact" light>Discuss your project</TextLink></div></div>
        <div className="hero-base"><span>MEDICAL EQUIPMENT & INFRASTRUCTURE</span><span>ADDIS ABABA, ETHIOPIA</span></div>
      </div>
      <figure className="hero-photo"><ResponsiveImage eager src={images.hero} alt="Medical imaging scanner in a diagnostic suite; illustrative photography" sizes="(max-width: 900px) 100vw, 75vw"/><figcaption>Equipment for the environments where care happens.</figcaption></figure>
    </div>
  </section>;
}

function Intro() {
  return <section className="section-block intro-section shell" id="discover">
    <Eyebrow section="01 / 05" label="A MORE CONNECTED APPROACH TO HEALTHCARE"/>
    <div className="intro-main">
      <h2 className="display-heading" data-reveal>From the first plan<br/>to <span className="muted">daily operation.</span></h2>
      <div className="intro-aside" data-reveal><p>It takes thoughtful planning, technical understanding and a partner who sees the bigger picture.</p><p>Orbit Health Solutions helps public and private health facilities turn complex equipment and infrastructure needs into workable solutions.</p><TextLink to="/about">Get to know our company</TextLink></div>
    </div>
    <div className="intro-points" data-reveal>
      <div><span className="intro-point-icon">↗</span><h3>Purpose-led</h3><p>Solutions shaped around the needs of each healthcare facility.</p></div>
      <div><span className="intro-point-icon">◎</span><h3>End-to-end</h3><p>From planning and equipment supply to installation and commissioning.</p></div>
      <div><span className="intro-point-icon">✳</span><h3>Support-minded</h3><p>Training and technical assistance to help teams put equipment to work.</p></div>
    </div>
  </section>;
}


function SolutionCard({item,index}:{item:Service,index:number}){
  return <Link className={'solution-feature solution-feature-'+index} to="/solutions" data-reveal>
    <div className="solution-feature-image"><ResponsiveImage src={item.image} alt={item.alt} sizes="(max-width: 700px) 100vw, 33vw"/></div>
    <div className="solution-feature-content"><div className="solution-feature-top"><span>{item.short.toUpperCase()}</span><ArrowBadge/></div><div className="solution-feature-bottom"><h3>{item.title}</h3><span>Explore solution <ArrowUpRight size={15}/></span></div></div>
  </Link>;
}

function SolutionsPreview() {
  return <section className="section-block solutions-preview">
    <div className="shell">
      <Eyebrow section="02 / 05" label="MEDICAL EQUIPMENT & FACILITY SOLUTIONS"/>
      <div className="section-heading-line" data-reveal>
        <h2 className="display-heading">Equipment for<br/><span className="muted">every care setting.</span></h2>
        <p>Explore our eight areas of expertise, from critical care and diagnostics to cold-chain systems and mobile clinics.</p>
      </div>
      <div className="solution-feature-grid">
        <SolutionCard item={solutions[1]} index={0}/>
        <SolutionCard item={solutions[2]} index={1}/>
        <SolutionCard item={solutions[0]} index={2}/>
      </div>
      <div className="solutions-index" data-reveal>
        {solutions.slice(3).map(s=><Link to="/solutions" key={s.id}><span>{s.number}</span><strong>{s.title}</strong><ArrowUpRight size={20} strokeWidth={1.5}/></Link>)}
      </div>
      <div className="view-all-wrap"><ButtonLink to="/solutions" kind="dark">View all eight solution areas</ButtonLink></div>
    </div>
  </section>;
}

function Approach() {
  return <section className="approach-section">
    <div className="shell">
      <Eyebrow section="03 / 05" label="HOW WE WORK" light/>
      <div className="approach-heading" data-reveal><h2 className="display-heading">One connected<br/><em>approach.</em></h2><p>From the first conversation through implementation and beyond, our services connect the important steps in each healthcare project.</p></div>
      <div className="approach-rows">
        {approach.map(step=><div key={step.number} className="approach-row" data-reveal><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div><Plus size={22} strokeWidth={1.2}/></div>)}
      </div>
      <div className="approach-cta" data-reveal><ButtonLink to="/contact">Discuss your project</ButtonLink></div>
    </div>
  </section>;
}

function Story() {
  return <section className="section-block story-section shell">
    <Eyebrow section="04 / 05" label="A WIDER VIEW OF HEALTHCARE"/>
    <div className="story-grid">
      <div className="story-left" data-reveal><div className="story-image"><ResponsiveImage src={images.mobileClinic} alt="Mobile clinic vehicle; AI-generated design concept" /></div><p className="image-caption"><strong>Custom-built mobile clinics</strong><span>Illustrative design concept · Healthcare beyond permanent facilities.</span></p></div>
      <div className="story-content" data-reveal><div className="small-kicker">SOLUTIONS THAT GO FURTHER <span>↗</span></div><h2 className="display-heading">Healthcare doesn't<br/>stop at <span className="muted">four walls.</span></h2><p>Every setting deserves a solution made for its circumstances. Our areas of expertise extend from intensive care to diagnostic equipment and custom-built mobile clinics.</p><TextLink to="/solutions">Discover the possibilities</TextLink></div>
    </div>
  </section>;
}


export function HomePage(){
  return <MotionContainer><Hero/><PartnerMarquee/><Intro/><SolutionsPreview/><Approach/><Story/><CompanyPreview/><CallToAction/></MotionContainer>;
}

export function SolutionsPage(){
  return <MotionContainer>
    <section className="inner-hero shell"><Eyebrow section="OUR EXPERTISE" label="EQUIPMENT & INFRASTRUCTURE"/><h1>Solutions for<br/><em>every care setting.</em></h1><div className="inner-hero-foot"><p>From specialized medical equipment to facility infrastructure, explore the areas in which OrbitHS supports healthcare providers.</p><span>08 SOLUTION AREAS <ArrowDownRight size={22}/></span></div></section>
    <div className="inner-banner shell" data-reveal><ResponsiveImage src={images.operatingRoom} alt="Medical equipment supporting a surgical team in an operating room" sizes="100vw"/></div>
    <section className="detail-catalog shell section-block"><Eyebrow section="01 / 02" label="OUR AREAS OF EXPERTISE"/><div className="detail-list">
      {solutions.map((item,index)=><article className={'catalog-item '+(index%2?'catalog-right':'')} key={item.id} id={item.id} data-reveal><div className={'catalog-img '+(['cold-chain','infection-control','mobile-clinics'].includes(item.id)?'equipment-image':'')}><ResponsiveImage src={item.image} alt={item.alt}/></div><div className="catalog-copy"><span className="small-kicker">{item.number} / 08 · {item.short.toUpperCase()}</span><h2>{item.title}</h2><p>{item.description}</p><TextLink to="/contact">Ask about this solution</TextLink>{item.id==='mobile-clinics'?<p className="reference-caption">Illustrative design concept.</p>:null}{['cold-chain','infection-control'].includes(item.id)?<p className="reference-caption">Manufacturer reference image.</p>:null}</div></article>)}
    </div><p className="caution-copy">Please contact OrbitHS for current product availability and specifications. Images are illustrative of service categories and do not represent confirmed stock or installations.</p></section>
    <CallToAction/>
  </MotionContainer>;
}

export function AboutPage(){
  return <MotionContainer>
    <section className="inner-hero shell"><Eyebrow section="OUR COMPANY" label="PURPOSE IN EVERY DETAIL"/><h1>Behind every solution,<br/><em>people come first.</em></h1><div className="inner-hero-foot"><p>We work alongside public and private healthcare facilities to help turn important needs into practical results.</p><span>DISCOVER ORBITHS <ArrowDownRight size={22}/></span></div></section>
    <div className="about-visual shell" data-reveal><div className="about-visual-main"><ResponsiveImage src={images.companyTraining} alt="Orbit team members at B Medical Systems, from the company training gallery" /></div><div className="about-visual-sub"><ResponsiveImage src={images.laboratoryTeam} alt="A laboratory technician examining a sample through a microscope; illustrative photography" /></div></div>
    <section className="section-block about-statement shell"><Eyebrow section="01 / 02" label="WHO WE ARE"/><div className="about-statement-grid"><h2 className="display-heading" data-reveal>We see the<br/><span className="muted">whole picture.</span></h2><div data-reveal><p>Orbit Health Solutions PLC specializes in customizable solutions for public and private health facilities in Ethiopia.</p><p>We assist clients with project identification and planning, project management, supply of equipment, installation and commissioning, training, and technical support.</p><p>Our team is committed to quality management standards. With a strong understanding of the Ethiopian market and experience in public healthcare projects, we work to make each project efficient, cost effective and suited to local needs.</p><TextLink to="/team">Meet our management team</TextLink></div></div></section>
    <section className="section-block about-capabilities"><div className="shell"><Eyebrow section="02 / 02" label="WHAT WE DO"/><h2 className="display-heading" data-reveal>Every step is part<br/>of the <span className="muted">solution.</span></h2><div className="capability-list">{capabilities.map((cap,i)=><div key={cap} data-reveal><span>{String(i+1).padStart(2,'0')}</span><h3>{cap}</h3><MoveUpRight size={24} strokeWidth={1.3}/></div>)}</div></div></section>
    <CallToAction/>
  </MotionContainer>;
}

export function ContactPage(){
  return <MotionContainer>
    <section className="inner-hero shell contact-hero"><Eyebrow section="LET'S CONNECT" label="WE'RE HERE TO TALK"/><h1>A conversation<br/>can <em>move care forward.</em></h1><div className="inner-hero-foot"><p>Whether you're equipping a facility or exploring new possibilities, get in touch with OrbitHS in Addis Ababa.</p><span>LET'S TALK <ArrowDownRight size={22}/></span></div></section>
    <section className="contact-area shell">
      <div className="contact-details">
        <div className="contact-item" data-reveal><span><Phone size={20}/> PHONE</span><div><a href="tel:+251116507335">+251 11 650 7335 <ArrowUpRight size={22}/></a><a href="tel:+251116507287">+251 11 650 7287 <ArrowUpRight size={22}/></a></div></div>
        <div className="contact-item" data-reveal><span><MapPin size={20}/> OUR OFFICE</span><div><p>TK Building, 6th Floor<br/>Suites 601, 602 & 603<br/>Bole Sub-City, Addis Ababa<br/>Ethiopia</p><a className="office-map" href="https://www.google.com/maps/search/?api=1&query=TK+Building+Bole+Addis+Ababa" target="_blank" rel="noreferrer">Open map <ArrowUpRight size={17}/></a></div></div>
        <div className="contact-item" data-reveal><span><Clock3 size={20}/> OFFICE HOURS</span><div><p>Monday – Friday<br/>8:30 AM – 5:30 PM</p></div></div>
      </div>
      <aside className="contact-aside" data-reveal><span className="pulse-dot"/> HERE FOR YOUR NEXT PROJECT<h2>Let's find the<br/><em>right solution.</em></h2><p>Call our team to discuss your requirements and the best next steps for your healthcare project.</p><a className="contact-call" href="tel:+251116507335">Call OrbitHS <ArrowUpRight size={21}/></a></aside>
    </section>
    <EnquiryDraft/>
  </MotionContainer>;
}
