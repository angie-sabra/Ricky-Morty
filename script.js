const api = "https://rickandmortyapi.com/api/character";
const searchInput = document.getElementById("search-input");
let characters = [];

/**
 * Fetches characters from the API and displays them.
 */
async function fetchCharacters() {
    try {
        const response = await fetch(api);
        const data = await response.json();
        characters = data.results;
        displayCharacters(characters);
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

/**
 * Filters characters based on the search query and updates the display.
 * @param {string} query - The search query to filter characters.
 */
function filterCharacters(query) {
    const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase())
    );
    displayCharacters(filtered);
}

/**
 * Displays the list of characters in the UI.
 * @param {Array} characters - The list of characters to display.
 */
function displayCharacters(characters) {
    const characterList = document.querySelector("#character-list");
    characterList.innerHTML = characters.map(character => `
        <div class="col-6 col-md-4 text-center mb-4">
            <img src="${character.image}" alt="${character.name}" class="img-fluid rounded-circle mb-2" onclick="showCharacterInfo('${character.id}')" />
            <p>${character.name}</p>
        </div>
    `).join('');
}

/**
 * Fetches and displays information for a specific character in a modal.
 * @param {string} id - The ID of the character to fetch.
 */
async function showCharacterInfo(id) {
    try {
        const response = await fetch(`${api}/${id}`);
        const character = await response.json();
        displayCharacter(character);
    } catch (error) {
        console.error("Error fetching character info:", error);
    }
}

/**
 * Updates the modal with the selected character's information.
 * @param {Object} character - The character object containing details.
 */
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

// Event listener for search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    filterCharacters(query);
});

// Initial fetch of characters
fetchCharacters();
