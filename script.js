const api = "https://rickandmortyapi.com/api/character";
const searchInput = document.getElementById("search-input");
let characters = [];


async function fetchCharacters() {
    const response = await fetch(api);
    const data = await response.json();
    characters = data.results;
    displayCharacters(characters); 
}


function filterCharacters(query) {
    const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase())
    );
    displayCharacters(filtered);
}


function displayCharacters(characters) {
    const characterList = document.querySelector("#character-list");
    characterList.innerHTML = characters.map(character => `
        <div class="display text-center">
            <img src="${character.image}" alt="${character.name}" class="img-fluid rounded-circle mb-2" onclick="showCharacterInfo('${character.id}')" />
            <p>${character.name}</p>
        </div>
    `).join('');
}


async function showCharacterInfo(id) {
    const response = await fetch(`${api}/${id}`);
    const character = await response.json();
    displayCharacter(character);
}


function displayCharacter(character) {
    const modalBody = document.querySelector("#modal-body");
    modalBody.innerHTML = `
        <h5>${character.name}</h5>
        <img src="${character.image}" alt="${character.name}" class="img-fluid mb-2" />
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${character.origin.name}</p>
    `;
    $('#characterModal').modal('show');
}


searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    filterCharacters(query);
});


fetchCharacters();
