navigator.serviceWorker?.register('/sw.js')

const {searchParams} = new URL(location.toString())

const city = searchParams.get('city')
const longitude = +(searchParams.get('lng') || 0)

if (!city)
    location.replace('/settings.html')

const city$ = document.querySelector('#city') as HTMLElement

city$.textContent = `${city}: ${longitude}`

export {}