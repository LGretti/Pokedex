const pokemonNumber = document.getElementById('pkmnNmbr');
const pokemonName = document.getElementById('pkmnNm');
const pokemonImage = document.getElementById('pkmnImg');

const form = document.querySelector('.frm');
const input = document.querySelector('.inputSrch');
const btnPrev = document.querySelector('.prev');
const btnNxt = document.querySelector('.next');

let srcPokmn = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
  }
}

const showPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.style.display = 'block';
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';
  } else {
    pokemonName.innerHTML = 'Não achei';
    pokemonNumber.innerHTML = '0';
    pokemonImage.style.display = 'none';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  showPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
  if (srcPokmn > 1) {
    srcPokmn -= 1;
    showPokemon(srcPokmn);
  }
});

btnNxt.addEventListener('click', () => {
  srcPokmn += 1;
  showPokemon(srcPokmn);
});


showPokemon(srcPokmn);