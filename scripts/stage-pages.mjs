import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
if (!existsSync('dist/index.html')) throw new Error('Run GITHUB_PAGES=true npm run build first');
// Root contains the compiled site for the existing main/root Pages configuration.
for (const name of readdirSync('assets')) if (/\.(js|css)$/.test(name)) rmSync('assets/'+name);
for (const name of readdirSync('dist')) cpSync('dist/'+name, name, {recursive:true});
writeFileSync('.nojekyll','');
console.log('Compiled site staged at repository root.');
