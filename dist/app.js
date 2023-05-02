var _a;
import * as Astro from './astro.js';
const sunRadius = 15;
(_a = navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.register('sw.js', { type: 'module' });
const city = localStorage.getItem('sun-compass-city');
const longitude = +(localStorage.getItem('sun-compass-lng') || 0);
if (!city) {
    location.replace('settings.html');
    throw 'redirecting...';
}
setCity(city, longitude);
const compass$ = document.querySelector('#compass');
renderApp();
const resizeObserver = new ResizeObserver(renderApp);
resizeObserver.observe(compass$);
function renderApp() {
    const { width, height } = compass$.getBoundingClientRect();
    const radius = Math.min(width, height) / 2;
    compass$.setAttribute('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);
    renderSunArrow(width, height, radius);
    const sunAngle = Astro.getPosition(new Date, 55, longitude).azimuth;
    renderCompassArrow(radius, sunAngle, '#compass-arrow-south');
    renderCompassArrow(radius, sunAngle - Math.PI, '#compass-arrow-north');
}
function setCity(city, longitude) {
    const city$ = document.querySelector('#city');
    city$.textContent = city;
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
    const x = Math.cos(Math.PI / 2 + sunAngleRadians) * length;
    const y = -Math.sin(Math.PI / 2 + sunAngleRadians) * length;
    arrow$.style.d = `path('M 0 0 L ${x.toFixed(5)} ${y.toFixed(5)}')`;
    const text$ = arrow$.nextElementSibling;
    const textDistance = length + sunRadius;
    const xText = Math.cos(Math.PI / 2 + sunAngleRadians) * textDistance;
    const yText = -Math.sin(Math.PI / 2 + sunAngleRadians) * textDistance;
    text$.setAttribute('x', xText.toFixed(5));
    text$.setAttribute('y', yText.toFixed(5));
}
