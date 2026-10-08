import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const files = [
  'app/index.html','vite.config.ts','tailwind.config.js','postcss.config.js',
  'src/main.tsx','src/App.tsx','src/components.tsx','src/pages.tsx',
  'src/content.ts','src/styles.css','public/orbit-symbol.svg',
  '.github/workflows/pages.yml'
];
const errors = [];
for (const file of files) {
  if (!existsSync(file)) errors.push('Missing required file: '+file);
}
const read = name => readFileSync(name,'utf8');
if (errors.length) { console.error(errors.join('\n'));process.exit(1); }
const app=read('src/App.tsx'), pages=read('src/pages.tsx'), content=read('src/content.ts');
const css=read('src/styles.css'), workflow=read('.github/workflows/pages.yml');
for (const route of ['/solutions','/about','/contact']) if (!app.includes(route)) errors.push('Missing route '+route);
for (const page of ['HomePage','SolutionsPage','AboutPage','ContactPage']) if (!pages.includes('function '+page)) errors.push('Missing page '+page);
for (const category of ['ICU & Operating Room Equipment','Laboratory Equipment','Advanced Radiology Systems','Cold Chain & Blood Chain Management','Medical Gas','Waste Management & Infection Control','Medical Consumables','Custom-Built Mobile Clinics']) if (!content.includes(category)) errors.push('Missing source-based category '+category);
if (!css.includes('@tailwind utilities')) errors.push('Tailwind CSS missing');
if (!pages.includes('ResponsiveImage')) errors.push('Medical photography missing');
if (!read('src/components.tsx').includes('ScrollTrigger')) errors.push('GSAP scroll-trigger missing');
if (!workflow.includes('npm run build') || !workflow.includes('deploy-pages@v4')) errors.push('GitHub Pages build/deploy missing');
const media=[...content.matchAll(/asset\('([^']+)'\)/g)].map(m=>m[1]);
for (const name of media) if (!existsSync('public/images/'+name+'.webp')) errors.push('Missing local image '+name);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('OrbitHS smoke checks passed: source files, 4 routes, 8 categories, photographic assets, Tailwind, GSAP, Pages workflow.');
