const predefinedCities = {
    Москва: 37,
    'Санкт‑Петербург': 30,
    Новосибирск: 83,
    Екатеринбург: 61,
    Казань: 49,
    'Нижний Новгород': 44,
    Челябинск: 61,
    Самара: 50,
    Уфа: 56,
    'Ростов-на-Дону': 40,
    Омск: 73,
    Волгоград: 45,
}

export type City = keyof typeof predefinedCities

const select$ = document.querySelector('#select') as HTMLSelectElement

select$.append(
    ...Object.keys(predefinedCities)
        .map(city => Object.assign(
            document.createElement('option'),
            {value: city, textContent: city}
        ))
)

select$.value = localStorage.getItem('sun-compass-city') || Object.keys(predefinedCities)[0]

const submit$ = document.querySelector('#submit') as HTMLButtonElement

submit$.addEventListener('click', () => {
    localStorage.setItem('sun-compass-city', select$.value)
    localStorage.setItem('sun-compass-lng', `${predefinedCities[select$.value as City]}`)

    location.replace('index.html')
})

export {}
