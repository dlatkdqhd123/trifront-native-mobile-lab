// Retire only the previous comparison scope; existing phone bookmarks open the release.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const scope=self.registration.scope;
 for(const name of await caches.keys())if(name.startsWith('TRI-FRONT-native-fast-sw-cache-'))await caches.delete(name);
 await self.clients.claim();
 for(const client of await self.clients.matchAll({type:'window'}))if(client.url.startsWith(scope))await client.navigate(new URL('../game/',scope).href);
 await self.registration.unregister();
})()));
