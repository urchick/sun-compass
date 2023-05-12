var _a;
const predefinedCities = {
    Анадырь: [64.73, 177.5],
    Волгоград: [48.71, 44.51],
    Владивосток: [43.13, 131.91],
    Грозный: [43.32, 45.69],
    Дербент: [42.07, 48.29],
    Екатеринбург: [56.84, 60.65],
    Иркутск: [52.29, 104.29],
    Махачкала: [42.98, 47.51],
    Москва: [55.75, 37.61],
    Мурманск: [68.97, 33.09],
    Казань: [55.79, 49.12],
    Калининград: [54.71, 20.45],
    Краснодар: [45.04, 38.97],
    'Нижний Новгород': [56.32, 44.01],
    Новосибирск: [54.98, 82.9],
    Омск: [54.99, 73.36],
    Пермь: [58.01, 56.23],
    'Петропавловск-Камчатский': [53.06, 158.63],
    'Ростов-на-Дону': [47.24, 39.7],
    Самара: [53.2, 50.16],
    Севастополь: [44.62, 33.53],
    'Санкт‑Петербург': [59.93, 30.34],
    Сочи: [43.6, 39.73],
    Уфа: [54.73, 55.96],
    Челябинск: [55.16, 61.44],
};
const select$ = document.querySelector('#select');
select$.append(...Object.keys(predefinedCities)
    .map(city => Object.assign(document.createElement('option'), { value: city, textContent: city })));
select$.value = ((_a = localStorage.getItem('sun-compass')) === null || _a === void 0 ? void 0 : _a.split('/')[0]) || Object.keys(predefinedCities)[0];
const submit$ = document.querySelector('#submit');
submit$.addEventListener('click', () => {
    localStorage.setItem('sun-compass', [select$.value, ...predefinedCities[select$.value]].join('/'));
    location.replace('index.html');
});
export {};
