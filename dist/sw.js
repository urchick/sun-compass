var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cacheName = 'sun-compass';
self.addEventListener('install', e => {
    console.log('[Service Worker] Install');
    e.waitUntil((() => __awaiter(void 0, void 0, void 0, function* () {
        const cache = yield caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        yield cache.addAll([
            '/dist/',
            '/dist/index.html',
            '/dist/settings.html',
            '/dist/app.js',
            '/dist/settings.js',
        ]);
    }))());
});
self.addEventListener('fetch', e => {
    e.respondWith((() => __awaiter(void 0, void 0, void 0, function* () {
        const r = yield caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r)
            return r;
        const response = yield fetch(e.request);
        const cache = yield caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    }))());
});
export {};
