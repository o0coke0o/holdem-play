// 오프라인 캐시 — 한 번 연 블랙잭은 인터넷이 없어도 열린다(비행기). 온라인이면 새 판을 받아 다음에 쓴다.
const C = 'bj-v1', FILES = ['blackjack.html'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const font = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (!font && !(u.origin === location.origin && /blackjack\.html$/.test(u.pathname))) return;
  e.respondWith(caches.open(C).then(async c => {
    const hit = await c.match(r, {ignoreSearch: true});
    const net = fetch(r).then(res => { if (res.ok || res.type === 'opaque') c.put(r, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
