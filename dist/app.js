var _a;
(_a = navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.register('sw.js', { type: 'module' });
const { searchParams } = new URL(location.toString());
const city = searchParams.get('city');
const longitude = +(searchParams.get('lng') || 0);
if (!city)
    location.replace('settings.html');
const city$ = document.querySelector('#city');
city$.textContent = `${city}: ${longitude}`;
export {};
