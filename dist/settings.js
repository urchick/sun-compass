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
};
const select$ = document.querySelector('#select');
select$.append(...Object.keys(predefinedCities)
    .map(city => Object.assign(document.createElement('option'), { value: city, textContent: city })));
select$.value = localStorage.getItem('city') || Object.keys(predefinedCities)[0];
const submit$ = document.querySelector('#submit');
submit$.addEventListener('click', () => {
    const city = select$.value;
    const longitude = predefinedCities[city];
    location.replace(`/?city=${city}&lng=${longitude}`);
});
export {};
