var _a;
const sunRadius = 15;
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
const sunAngle = calculateSunAngleRadians(longitude, new Date('2023-03-19 15:00:00'));
renderCompassArrow(radius, sunAngle, '#compass-arrow-south');
renderCompassArrow(radius, sunAngle - Math.PI, '#compass-arrow-north');
function setCity(city, longitude) {
    const city$ = document.querySelector('#city');
    city$.textContent = `${city}: ${longitude}`;
}
function renderSunArrow(width, height, radius) {
    const sunArrow$ = compass$.querySelector('#sun-arrow');
    sunArrow$.style.d = `path('M 0 ${-radius + 2 * sunRadius} L 0 ${radius}')`;
    const sunText$ = sunArrow$.nextElementSibling;
    sunText$.setAttribute('x', '0');
    sunText$.setAttribute('y', `${-radius + sunRadius}`);
    sunText$.style.x = 0;
    sunText$.style.y = -radius + sunRadius;
}
function renderCompassArrow(radius, sunAngleRadians, selector) {
    const arrow$ = compass$.querySelector(selector);
    const length = radius - 4 * sunRadius;
    const x = Math.cos(Math.PI / 2 - sunAngleRadians) * length;
    const y = -Math.sin(Math.PI / 2 - sunAngleRadians) * length;
    arrow$.style.d = `path('M 0 0 L ${x.toFixed(5)} ${y.toFixed(5)}')`;
    const text$ = arrow$.nextElementSibling;
    const textDistance = length + sunRadius;
    const xText = Math.cos(Math.PI / 2 - sunAngleRadians) * textDistance;
    const yText = -Math.sin(Math.PI / 2 - sunAngleRadians) * textDistance;
    text$.setAttribute('x', xText.toFixed(5));
    text$.setAttribute('y', yText.toFixed(5));
}
function calculateSunAngleRadians(longitude, date) {
    const timeZone = date.getTimezoneOffset() / 60;
    const midday = 12 + (-timeZone - longitude / 15);
    const millisFromMidnight = (((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds()) * 1000) + date.getMilliseconds();
    const currentHours = millisFromMidnight / 1000 / 60 / 60;
    const sunHours = (midday + currentHours) / 2;
    return (sunHours - 12) / 12 * Math.PI;
}
export {};
