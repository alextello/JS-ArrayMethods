const main = document.getElementById('main');
const addUser = document.getElementById('addUser');
const double = document.getElementById('double');
const millonarios = document.getElementById('mostrarMillonarios');
const ordenar = document.getElementById('ordenarPorRiqueza');
const calcularRiqueza = document.getElementById('calcularRiqueza');

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
    updateDOM();
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

// Listeners
addUser.addEventListener('click', getRandomUser);