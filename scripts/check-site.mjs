import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";

const pages = ["index.html","solutions.html","about.html","contact.html"];
let errors = [];
for(const page of pages){
 const text = readFileSync(page,"utf8");
 if (!/<html lang="en">/.test(text)) errors.push(page + ": lang missing");
 if (!/<meta name="viewport"/.test(text)) errors.push(page + ": responsive viewport missing");
 const heading = (text.match(/<h1\b/g)||[]).length;
 if (heading !== 1) errors.push(page + ": expected one h1, found " + heading);
 const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
 for(const id of new Set(ids)) if (ids.filter(x=>x===id).length>1) errors.push(page + ": duplicate id "+id);
 if (!ids.includes("main")) errors.push(page + ": skip-link target missing");
 for(const match of text.matchAll(/<img\b[^>]*>/g)) if(!/\balt="/.test(match[0])) errors.push(page+": image missing alt");
 for(const match of text.matchAll(/\bhref="([^"]+)"/g)){
   const url=match[1];
   if(url==="#"||url==="") errors.push(page+": placeholder link");
   if(url.startsWith("./")){
      const [pathname,hash]=url.slice(2).split("#");
      if(pathname && !existsSync(resolve(dirname(page),pathname))) errors.push(page+": broken local path "+url);
      if(!pathname && hash && !ids.includes(hash)) errors.push(page+": broken fragment "+url);
      if(pathname === page && hash && !ids.includes(hash)) errors.push(page+": broken fragment "+url);
   }
 }
 if (!text.includes('aria-controls="primary-nav"')) errors.push(page+": mobile navigation ARIA missing");
 console.log("Checked",page,"— h1, IDs, links, image alt and mobile nav");
}
if (errors.length){ console.error(errors.join("\n"));process.exit(1); }
console.log("Static site checks passed.");
