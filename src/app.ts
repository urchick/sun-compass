import * as Astro from './astro.js'

const sunRadius = 15

navigator.serviceWorker?.register('sw.js', {type: 'module'})

const [city, ...coordinate] = (localStorage.getItem('sun-compass') || '').split('/')
const [latitude, longitude] = coordinate.map(value => +value)

if (!city) {
    location.replace('settings.html')
    throw 'redirecting...'
}

setCity(city)

const compass$ = document.querySelector('#compass') as SVGSVGElement

reset()

const resizeObserver = new ResizeObserver(reset)

resizeObserver.observe(compass$)

function reset() {
    const {width, height} = compass$.getBoundingClientRect()
    compass$.setAttribute('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)

    renderCompassArrow(height / 2, 0, '#compass-arrow-south')
    renderCompassArrow(height / 2, Math.PI, '#compass-arrow-north')
}

function renderApp() {
    const radius = Math.min(compass$.clientWidth, compass$.clientHeight) / 2
    const date = new Date

    renderArrow(
        radius - sunRadius * 2,
        Astro.getPosition(date, latitude, longitude),
        compass$.querySelector('#sun-arrow') as SVGPathElement
    )

    renderArrow(
        radius - sunRadius * 4,
        Astro.getMoonPosition(date, latitude, longitude),
        compass$.querySelector('#moon-arrow') as SVGPathElement
    )
}

function scheduleRender() {
    renderApp()
    requestAnimationFrame(scheduleRender)
}

scheduleRender()

function setCity(city: string) {
    const city$ = document.querySelector('#city') as HTMLElement

    city$.textContent = city
}

function renderCompassArrow(radius: number, angle: number, selector: string) {
    const arrow$ = compass$.querySelector(selector) as SVGPathElement

    const length = radius - 2 * sunRadius
    const x = Math.cos(-Math.PI / 2 - angle) * length
    const y = -Math.sin(-Math.PI / 2 - angle) * length

    arrow$.style.d = `path('M 0 0 L ${x.toFixed(2)} ${y.toFixed(2)}')`

    const text$ = arrow$.nextElementSibling as SVGTextElement
    const textDistance = radius - sunRadius
    const xText = Math.cos(-Math.PI / 2 - angle) * textDistance
    const yText = -Math.sin(-Math.PI / 2 - angle) * textDistance
    text$.setAttribute('x', xText.toFixed(2))
    text$.setAttribute('y', yText.toFixed(2))
}

function renderArrow(
    radius: number,
    {azimuth, altitude}: ReturnType<typeof Astro.getMoonPosition>,
    element$: SVGPathElement,
) {
    const radius1 = radius - 2 * sunRadius
    const radius2 = radius
    const x1 = Math.cos(-Math.PI / 2 - azimuth) * radius1
    const y1 = -Math.sin(-Math.PI / 2 - azimuth) * radius1
    const x2 = Math.cos(Math.PI / 2 - azimuth) * radius2
    const y2 = -Math.sin(Math.PI / 2 - azimuth) * radius2

    element$.style.d = `path('M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)}')`

    element$.classList.toggle('arrow_invisible', altitude < 0)

    const sunText$ = element$.nextElementSibling as SVGTextElement
    const textRadius = radius - sunRadius
    const x = Math.cos(-Math.PI / 2 - azimuth) * textRadius
    const y = -Math.sin(-Math.PI / 2 - azimuth) * textRadius
    sunText$.setAttribute('x', x.toFixed(2))
    sunText$.setAttribute('y', y.toFixed(2))
    // sunText$.style.x = x
    // sunText$.style.y = y
}
