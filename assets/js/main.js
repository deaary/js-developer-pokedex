const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `    
    <a href="#" class="noDecorator">
    <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>               
        
                <div class="accordion-content">
                    <table class="stats">
                        <tr>
                            <td>${pokemon.stats[0].stat.name}</td>
                            <td>${pokemon.stats[0].base_stat}</td>
                        </tr>
                        <tr>
                            <td>${pokemon.stats[1].stat.name}</td>
                            <td>${pokemon.stats[1].base_stat}</td>
                        </tr>
                        <tr>
                            <td>${pokemon.stats[2].stat.name}</td>
                            <td>${pokemon.stats[2].base_stat}</td>
                        </tr>
                        <tr>
                            <td>${pokemon.stats[3].stat.name}</td>
                            <td>${pokemon.stats[3].base_stat}</td>
                        </tr>
                        <tr>
                            <td>${pokemon.stats[4].stat.name}</td>
                            <td>${pokemon.stats[4].base_stat}</td>
                        </tr>
                        <tr>
                            <td>${pokemon.stats[5].stat.name}</td>
                            <td>${pokemon.stats[5].base_stat}</td>
                        </tr>
                    </table>                    
                </div>       
                
                </li>   
                </a> 
     
    `
}

function loadPokemonItens(offset, limit) {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml
        })   

}

document.addEventListener('DOMContentLoaded', () => {

    const pokemons = document.getElementById('pokemonList')

    pokemons.addEventListener('click', (event) => {
        const pokemon = event.target.closest('.noDecorator')
        event.preventDefault()

        if (pokemon) {
            const accordion = pokemon.querySelector('.accordion-content')

            if (accordion.classList.contains('active')) {
                accordion.classList.remove('active')
            } else {
                const allAccordions = document.querySelectorAll('.accordion-content.active')
                allAccordions.forEach((otherAccordion) => {
                    otherAccordion.classList.remove('active')
                })

                accordion.classList.add('active')
            }
        }
    })

    loadPokemonItens(offset, limit)

})

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})