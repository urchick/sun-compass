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

function setCity(city: string, longitude: number) {
    const city$ = document.querySelector('#city') as HTMLElement

    city$.textContent = `${city}: ${longitude}`    
}

function renderSunArrow(width: number, height: number, radius: number) {
    const sunRadius = 15
    const sunArrow$ = compass$.querySelector('#sun-arrow') as SVGPathElement

    sunArrow$.style.d = `path(M 0 ${-radius + 2 * sunRadius} L 0 ${radius})`;
    
    const sunText$ = sunArrow$.nextElementSibling as SVGTextElement
    sunText$.style.x = 0
    sunText$.style.y = -radius + sunRadius
}

export {}