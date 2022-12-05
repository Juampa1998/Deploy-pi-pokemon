const axios = require ('axios');
const {Pokemon, Type} = require('../db');

const getApiInfo = async () =>{
    try{
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon'
    // let apiUrl = 'https://pokeapi.co/api/v2/pokemon?offset=640&limit=20'
    let pokemons = [];
    // console.log(pokemons)
    do{
        let info = await axios.get(apiUrl);
        let pokemonesApi = info.data;   // apiurl.data.next
        let auxPokemones = pokemonesApi.results.map(e =>{
            return {
                name: e.name,
                url: e.url
            }
        })
        pokemons.push(...auxPokemones);
        apiUrl = pokemonesApi.next;
        // console.log(pokemons)
    }while(apiUrl != null && pokemons.length < 40) // Aca le decimos que el proximo no puede ser null, y ademas la longitud del arreglo tiene que ser menor a 40.
   
     //trae los 40 pokemons 

    let pokesData = await Promise.all(pokemons.map(async e =>{
        let pokemon = await axios.get(e.url)
        // console.log(pokemon)
        return {
            id: pokemon.data.id, // e.url.data.id
            name: pokemon.data.name,
            img: pokemon.data.sprites.other.home.front_shiny,
            types: pokemon.data.types.map(e => {
                return ({
                    name: e.type.name,
                    // img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
                })
            }),
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
            // createdInDb: false
        }
    }));
    // console.log(pokesData); // recorre cada uno, se mete en la url, y trae los datos necesarios de cada uno.
    return pokesData
} catch(e){
    console.log(e)
}
}
// getApiInfo()

const getDbInfo = async () => {
    return await Pokemon.findAll ({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const getAllPokemon = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokemon = dbInfo.concat(apiInfo)
    return allPokemon;
}
async function getPokemonDetail(arg) {
    try {
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}`);
        const data = await apiData.data;
        // let pokemonArr = []
        const pokemonData = {
            id: data.id,
            name: data.name,
            img: data.sprites.other.home.front_default,
            types: data.types.map(e => {
                return ({
                    name: e.type.name,
                    img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
                })
            }),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
        };
        return pokemonData;
    } catch (e) {
        console.log(e);
    };
};

async function getPokemonName(arg) {
    try {
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}`);
        const data = await apiData.data;
        // let pokemonArr = []
        const pokemonData = [{
            id: data.id,
            name: data.name,
            img: data.sprites.other.home.front_shiny,
            types: data.types.map(e => {
                return ({
                    name: e.type.name,
                    img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
                })
            }),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
        }];
        return pokemonData;
    } catch (e) {
        console.log(e);
    };
};
module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPokemon, 
    getPokemonDetail,
    getPokemonName
    
}