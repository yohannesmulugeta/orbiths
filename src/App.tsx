import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToTop, SiteFooter, SiteHeader } from './components';
import { AboutPage, ContactPage, HomePage, SolutionsPage } from './pages';
import { ServicesPage, PartnersPage, TeamPage, GalleryPage } from './archive-pages';

export default function App() {
  return <>
    <a className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:bg-white focus:px-5 focus:py-3" href="#main" onClick={event=>{event.preventDefault();const main=document.getElementById('main');main?.focus();main?.scrollIntoView();}}>Skip to main content</a>
    <div id="top"/>
    <ScrollToTop/>
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
