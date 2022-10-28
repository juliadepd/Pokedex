
var myHeaders = new Headers();
const listaPokemon = document.querySelector('.pokedex');
var myInit = { method: 'GET', 'Content-Type': 'application/json' };

fetch('https://pokeapi.co/api/v2/pokemon', myInit)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
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

      const idd = document.createTextNode(`#${id}`)
      const span = document.createElement('span');
      span.setAttribute('id', 'idPoke')
      span.appendChild(idd)
      divCard.appendChild(span)

      listaPokemon.appendChild(divCard)
    })

  })

document.addEventListener('click', function (event) {
  if (!event.target.matches('.card')) return;

  console.log('id', event.target.querySelector('#idPoke').innerHTML.replace('#', ""));

  const id = event.target.querySelector('#idPoke').innerHTML.replace('#', "")

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, myInit)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
    })
})





