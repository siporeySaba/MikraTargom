const V='sm-v1',SHELL=['./','index.html','manifest.json','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
const put=(r,res)=>{if(res.ok){const c=res.clone();caches.open(V).then(k=>k.put(r,c))}return res};
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(u.hostname==='www.sefaria.org'){
  if(u.pathname.includes('calendars'))e.respondWith(fetch(r).then(x=>put(r,x)).catch(()=>caches.match(r)));
  else e.respondWith(caches.match(r).then(c=>c||fetch(r).then(x=>put(r,x))));
  return}
 e.respondWith(fetch(r).then(x=>put(r,x)).catch(()=>caches.match(r)));
});
