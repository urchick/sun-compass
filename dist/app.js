var _a;
import * as Astro from './astro.js';
const sunRadius = 15;
(_a = navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.register('sw.js', { type: 'module' });
const [city, ...coordinate] = (localStorage.getItem('sun-compass') || '').split('/');
const [latitude, longitude] = coordinate.map(value => +value);
if (!city) {
    location.replace('settings.html');
    throw 'redirecting...';
}
setCity(city);
const compass$ = document.querySelector('#compass');
renderApp();
const resizeObserver = new ResizeObserver(renderApp);
resizeObserver.observe(compass$);
function renderApp() {
    const { width, height } = compass$.getBoundingClientRect();
    const radius = Math.min(width, height) / 2;
    compass$.setAttribute('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`);
    renderCompassArrow(height / 2, 0, '#compass-arrow-south');
    renderCompassArrow(height / 2, Math.PI, '#compass-arrow-north');
    renderArrow(radius - sunRadius * 2, Astro.getPosition(new Date, latitude, longitude), compass$.querySelector('#sun-arrow'));
    renderArrow(radius - sunRadius * 4, Astro.getMoonPosition(new Date, latitude, longitude), compass$.querySelector('#moon-arrow'));
}
function setCity(city) {
    const city$ = document.querySelector('#city');
    city$.textContent = city;
}
function renderCompassArrow(radius, angle, selector) {
    const arrow$ = compass$.querySelector(selector);
    const length = radius - 2 * sunRadius;
    const x = Math.cos(-Math.PI / 2 - angle) * length;
    const y = -Math.sin(-Math.PI / 2 - angle) * length;
    arrow$.style.d = `path('M 0 0 L ${x.toFixed(5)} ${y.toFixed(5)}')`;
    const text$ = arrow$.nextElementSibling;
    const textDistance = radius - sunRadius;
    const xText = Math.cos(-Math.PI / 2 - angle) * textDistance;
    const yText = -Math.sin(-Math.PI / 2 - angle) * textDistance;
    text$.setAttribute('x', xText.toFixed(5));
    text$.setAttribute('y', yText.toFixed(5));
}
function renderArrow(radius, { azimuth, altitude }, element$) {
    const radius1 = radius - 2 * sunRadius;
    const radius2 = radius;
    const x1 = Math.cos(-Math.PI / 2 - azimuth) * radius1;
    const y1 = -Math.sin(-Math.PI / 2 - azimuth) * radius1;
    const x2 = Math.cos(Math.PI / 2 - azimuth) * radius2;
    const y2 = -Math.sin(Math.PI / 2 - azimuth) * radius2;
    element$.style.d = `path('M ${x1.toFixed(5)} ${y1.toFixed(5)} L ${x2.toFixed(5)} ${y2.toFixed(5)}')`;
    element$.classList.toggle('arrow_invisible', altitude < 0);
    const sunText$ = element$.nextElementSibling;
    const textRadius = radius - sunRadius;
    const x = Math.cos(-Math.PI / 2 - azimuth) * textRadius;
    const y = -Math.sin(-Math.PI / 2 - azimuth) * textRadius;
    sunText$.setAttribute('x', x.toFixed(5));
    sunText$.setAttribute('y', y.toFixed(5));
    // sunText$.style.x = x
    // sunText$.style.y = y
}
