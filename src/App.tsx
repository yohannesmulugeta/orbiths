import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToTop, SiteFooter, SiteHeader } from './components';
import { AboutPage, ContactPage, HomePage, SolutionsPage } from './pages';

export default function App() {
  return <>
    <a className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:bg-white focus:px-5 focus:py-3" href="#main">Skip to main content</a>
    <div id="top"/>
    <ScrollToTop/>
    <SiteHeader/>
    <main id="main">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/solutions" element={<SolutionsPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </main>
    <SiteFooter/>
  </>;
}
