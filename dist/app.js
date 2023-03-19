var _a;
(_a = navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.register('sw.js', { type: 'module' });
const { searchParams } = new URL(location.toString());
const city = searchParams.get('city');
const longitude = +(searchParams.get('lng') || 0);
if (!city) {
    location.replace('settings.html');
    throw 'redirecting...';
}
setCity(city, longitude);
const compass$ = document.querySelector('#compass');
const { width, height } = compass$.getBoundingClientRect();
const radius = Math.min(width, height) / 2;
compass$.setAttribute('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);
renderSunArrow(width, height, radius);
calculateSunAngleRadians(longitude, new Date);
function setCity(city, longitude) {
    const city$ = document.querySelector('#city');
    city$.textContent = `${city}: ${longitude}`;
}
function renderSunArrow(width, height, radius) {
    const sunRadius = 15;
    const sunArrow$ = compass$.querySelector('#sun-arrow');
    sunArrow$.style.d = `path('M 0 ${-radius + 2 * sunRadius} L 0 ${radius}')`;
    const sunText$ = sunArrow$.nextElementSibling;
    sunText$.setAttribute('x', '0');
    sunText$.setAttribute('y', `${-radius + sunRadius}`);
    sunText$.style.x = 0;
    sunText$.style.y = -radius + sunRadius;
}
function calculateSunAngleRadians(longitude, date) {
    const timeZone = date.getTimezoneOffset() / 60;
    const midday = 12 + (-timeZone - longitude / 15);
    const millisFromMidnight = (((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds()) * 1000) + date.getMilliseconds();
    const currentHours = millisFromMidnight / 1000 / 60 / 60;
    const sunHours = (midday + currentHours) / 2;
    return sunHours;
}
export {};
