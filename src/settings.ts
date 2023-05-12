const predefinedCities = {
    Москва: [55.75, 37.61],
    'Санкт‑Петербург': [59.93, 30.34],
    Новосибирск: [54.98, 82.9],
    Екатеринбург: [56.84, 60.65],
    Казань: [55.79, 49.12],
    'Нижний Новгород': [56.32, 44.01],
    Челябинск: [55.16, 61.44],
    Самара: [53.2, 50.16],
    Уфа: [54.73, 55.96],
    'Ростов-на-Дону': [47.24, 39.7],
    Омск: [54.99, 73.36],
    Волгоград: [48.71, 44.51],
    Владивосток: [43.13, 131.91],
    'Петропавловск-Камчатский': [53.06, 158.63],
    Мурманск: [68.97, 33.09],
    Иркутск: [52.29, 104.29],
    Анадырь: [64.73, 177.5],
    Калининград: [54.71, 20.45],
    Дербент: [42.07, 48.29],
    Севастополь: [44.62, 33.53],
    Сочи: [43.6, 39.73],
    Грозный: [43.32, 45.69],
    Краснодар: [45.04, 38.97],
    Махачкала: [42.98, 47.51],
    Пермь: [58.01, 56.23],
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

select$.value = localStorage.getItem('sun-compass')?.split('/')[0] || Object.keys(predefinedCities)[0]

const submit$ = document.querySelector('#submit') as HTMLButtonElement

submit$.addEventListener('click', () => {
    localStorage.setItem('sun-compass', [select$.value, ...predefinedCities[select$.value as City]].join('/'))

    location.replace('index.html')
})

export {}
