const main = document.getElementById('main');
const addUser = document.getElementById('addUser');
const double = document.getElementById('double');
const millonarios = document.getElementById('mostrarMillonarios');
const ordenarPorRiqueza = document.getElementById('ordenarPorRiqueza');
const calcularRiquezaBtn = document.getElementById('calcularRiqueza');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    ordenar();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Persona</strong> Riqueza</h2>';
    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatearDinero(item.money)}`;
        main.appendChild(element);
    })
}

function formatearDinero(number) {
    return '$ ' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function duplicarDinero() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    });
    updateDOM();
}

function ordenar() {
    data.sort((a, b) => (b.money - a.money));
    updateDOM();
}

function mostrarMillonarios() {
    data = data.filter(user => user.money > 1e6);
    updateDOM();
}

function calcularRiqueza() {
    const riqueza = data.reduce((acc, user) => (acc += user.money), 0);
    const riquezaEl = document.createElement('div');
    riquezaEl.innerHTML = `<h3>Riqueza total <strong>${formatearDinero(riqueza)}</strong></h3>`;
    main.appendChild(riquezaEl);
}
// Listeners
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', duplicarDinero);
ordenarPorRiqueza.addEventListener('click', ordenar);
millonarios.addEventListener('click', mostrarMillonarios);
calcularRiquezaBtn.addEventListener('click', calcularRiqueza);