import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ScrollToTop, SiteFooter, SiteHeader } from './components';
import { AboutPage, ContactPage, HomePage, SolutionsPage } from './pages';
import { ServicesPage, PartnersPage, TeamPage, GalleryPage } from './archive-pages';

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'ORBIT Health Solutions | Healthcare Technology in Ethiopia', description: 'Explore medical equipment, healthcare infrastructure, installation, training and technical support from ORBIT Health Solutions in Ethiopia.' },
  '/solutions': { title: 'Medical Equipment & Healthcare Solutions | ORBIT', description: 'Explore ORBIT Health Solutions equipment and infrastructure categories, including clinical care, diagnostic equipment, cold chain and medical gas.' },
  '/services': { title: 'Healthcare Project Services | ORBIT Health Solutions', description: 'Project planning, equipment supply, installation, commissioning, training and technical support for healthcare facilities in Ethiopia.' },
  '/partners': { title: 'Technology Partner Directory | ORBIT Health Solutions', description: 'Browse the manufacturers and organizations featured in the ORBIT Health Solutions company directory.' },
  '/about': { title: 'Our Company | ORBIT Health Solutions Ethiopia', description: 'Learn about ORBIT Health Solutions and its approach to healthcare equipment, infrastructure and technical service.' },
  '/team': { title: 'Our Management Team | ORBIT Health Solutions', description: 'Meet the management team of ORBIT Health Solutions, Ethiopia.' },
  '/gallery': { title: 'Training, Installations & Team Gallery | ORBIT', description: 'Explore ORBIT Health Solutions photographic archive of training activities, installations and company events.' },
  '/contact': { title: 'Contact ORBIT Health Solutions | Addis Ababa', description: 'Contact ORBIT Health Solutions in Addis Ababa to discuss healthcare equipment, infrastructure and project requirements.' }
};

function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const info = pageMetadata[pathname] ?? pageMetadata['/'];
    document.title = info.title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', info.description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', info.title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', info.description);
  }, [pathname]);
  return null;
}

export default function App() {
  return <>
    <a className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:bg-white focus:px-5 focus:py-3" href="#main" onClick={event=>{event.preventDefault();const main=document.getElementById('main');main?.focus();main?.scrollIntoView();}}>Skip to main content</a>
    <div id="top"/>
    <ScrollToTop/>
    <RouteMetadata/>
    <SiteHeader/>
    <main id="main" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/solutions" element={<SolutionsPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/services" element={<ServicesPage/>}/>
        <Route path="/partners" element={<PartnersPage/>}/>
        <Route path="/team" element={<TeamPage/>}/>
        <Route path="/gallery" element={<GalleryPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </main>
    <SiteFooter/>
  </>;
}
