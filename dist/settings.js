var _a;
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
