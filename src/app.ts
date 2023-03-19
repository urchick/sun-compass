const sunRadius = 15

navigator.serviceWorker?.register('sw.js', {type: 'module'})

const {searchParams} = new URL(location.toString())

const city = searchParams.get('city')
const longitude = +(searchParams.get('lng') || 0)

if (!city) {
    location.replace('settings.html')
    throw 'redirecting...'
}

setCity(city, longitude)

const compass$ = document.querySelector('#compass') as SVGSVGElement

const {width, height} = compass$.getBoundingClientRect()

const radius = Math.min(width, height) / 2

compass$.setAttribute('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)

renderSunArrow(width, height, radius)

const sunAngle = calculateSunAngleRadians(longitude, new Date('2023-03-19 12:00:00'))

renderSouthArrow(radius, sunAngle)

function setCity(city: string, longitude: number) {
    const city$ = document.querySelector('#city') as HTMLElement

    city$.textContent = `${city}: ${longitude}`
}

function renderSunArrow(width: number, height: number, radius: number) {
    const sunArrow$ = compass$.querySelector('#sun-arrow') as SVGPathElement

    sunArrow$.style.d = `path('M 0 ${-radius + 2 * sunRadius} L 0 ${radius}')`;
    
    const sunText$ = sunArrow$.nextElementSibling as SVGTextElement
    sunText$.setAttribute('x', '0')
    sunText$.setAttribute('y', `${-radius + sunRadius}`)
    sunText$.style.x = 0
    sunText$.style.y = -radius + sunRadius
}

function renderSouthArrow(radius: number, sunAngleRadians: number) {
    const arrow$ = compass$.querySelector('#compass-arrow-south') as SVGPathElement
    
    const length = 2 * radius - 4 * sunRadius
    const x = Math.cos(-Math.PI / 2 - sunAngleRadians) * length
    const y = Math.sin(-Math.PI / 2 - sunAngleRadians) * length

    arrow$.style.d = `path('M 0 0 L ${x.toFixed(5)} ${y.toFixed(5)}')`;

    const text$ = arrow$.nextElementSibling as SVGTextElement
    const textDistance = length + sunRadius
    const xText = Math.cos(-Math.PI / 2 - sunAngleRadians) * textDistance
    const yText = Math.sin(-Math.PI / 2 - sunAngleRadians) * textDistance
    text$.setAttribute('x', xText.toFixed(5))
    text$.setAttribute('y', yText.toFixed(5))
}

function calculateSunAngleRadians(longitude: number, date: Date) {
    const timeZone = date.getTimezoneOffset() / 60
    const midday = 12 + (-timeZone - longitude / 15)
    const millisFromMidnight = (((date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds()) * 1000) + date.getMilliseconds()
    const currentHours = millisFromMidnight / 1000 / 60 / 60
    const sunHours = (midday + currentHours) / 2
    return (sunHours - 12) / 12 * Math.PI
}

export {}