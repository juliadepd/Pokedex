
var myHeaders = new Headers();
const listaPokemon = document.querySelector('.pokedex');

var myInit = { method: 'GET', 'Content-Type': 'application/json'};

fetch('https://pokeapi.co/api/v2/pokemon/', myInit)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.results);
    data.results.map((pokemon) => {
      const divCard = document.createElement('div');
      divCard.setAttribute('class', 'card');

      const url = pokemon.url;
      const id = url.split('/')[6];

      const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      const img = document.createElement('img');
      img.setAttribute('class', 'card__img')
      img.setAttribute('src', src);
      divCard.appendChild(img);

      const name = document.createElement('h3');
      name.innerHTML = pokemon.name;
      name.setAttribute('class', 'card__nome');
      divCard.appendChild(name);

      const idd = document.createTextNode(`#${id}`);
      const span = document.createElement('span');
      span.setAttribute('id', 'idPoke')
      span.appendChild(idd)
      divCard.appendChild(span)

      listaPokemon.appendChild(divCard)
    })

  })

document.addEventListener('click', function (event) {
  const popup = document.querySelector('.popup');
  const cover = document.querySelector('.cover');
  const html = document.querySelector('html');
  let listaHabilidades = [];


  if (event.target.matches('.cover')) {
    cover.classList.toggle('cover--open')
    popup.classList.toggle('popup--open');
    html.classList.toggle('html--scroll')

    const popup_img = document.querySelector('.popup__div-img')
    popup_img.innerHTML = ""

    const popup_name = document.querySelector('#popup_name');
    popup_name.innerHTML = ""

    const popup_height = document.querySelector('#popup_height');
    popup_height.innerHTML = "<h2>Altura</h2>"

    const popup_weight = document.querySelector('#popup_weight');
    popup_weight.innerHTML = "<h2>Peso</h2>"

    const popup_abilities = document.querySelector('#popup_abilities');
    popup_abilities.innerHTML = "<h2>Habilidades</h2>"

    listaHabilidades = [];

  }

  if (!event.target.matches('.card')) return;
  cover.classList.add('cover--open')
  popup.classList.toggle('popup--open');
  html.classList.toggle('html--scroll')

  console.log('id', event.target.querySelector('#idPoke').innerHTML.replace('#', ""));
  const id = event.target.querySelector('#idPoke').innerHTML.replace('#', "")

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, myInit)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('data', data)

      const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      const img = document.createElement('img');
      img.setAttribute('class', 'popup__img')
      img.setAttribute('src', src);
      document.querySelector('.popup__div-img').appendChild(img);

      const popup_name = document.querySelector('#popup_name');
      popup_name.innerHTML += data.name

      const popup_height = document.querySelector('#popup_height');
      popup_height.innerHTML += `${data.height}`

      const popup_weight = document.querySelector('#popup_weight');
      popup_weight.innerHTML += `${data.weight}`

      data.abilities.map((habilidade) => {
        const nomeHabilidade = habilidade.ability.name;
        listaHabilidades.push(` ${nomeHabilidade}`);
        // let ultimoElemento = listaHabilidades[listaHabilidades.length - 1];
        // console.log(ultimoElemento)
      })
      popup_abilities.innerHTML += listaHabilidades;
    })
})

const searchButton = document.querySelector('.search-button')

searchButton.addEventListener('click', function (search) {
  const inputBusca = document.querySelector('#filtro-id');
  const filtroId = inputBusca.value;
  
  if (filtroId) {
    listaPokemon.innerHTML = ""
    inputBusca.value = ""
  }

  else {
    location.reload()
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${filtroId}`, myInit)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('data', data)
      console.log('tentativa', data)

      const divCard = document.createElement('div');
      divCard.setAttribute('class', 'card');

      const id = data.id;

      const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
      const img = document.createElement('img');
      img.setAttribute('class', 'card__img')
      img.setAttribute('src', src);
      divCard.appendChild(img);

      const name = document.createElement('h3');
      name.innerHTML = data.name;
      name.setAttribute('class', 'card__nome');
      divCard.appendChild(name);

      const idd = document.createTextNode(`#${id}`)
      const span = document.createElement('span');
      span.setAttribute('id', 'idPoke')
      span.appendChild(idd)
      divCard.appendChild(span)

      listaPokemon.appendChild(divCard)
    })
})
