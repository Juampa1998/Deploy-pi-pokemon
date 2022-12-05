const {Pokemon, Type} = require('../db');
const { getAllPokemon, getPokemonDetail, getPokemonName} = require('./functions');
const { Router } = require('express');

const router = Router();





router.get('/', async (req, res) => {
        const {name} = req.query;
        let pokemonsTotal = await getAllPokemon();
        
        // console.log(pokemonsTotal)
        if(name){
            let pokemonApi = await getPokemonName(name)
            // console.log(pokemonApi)
            pokemonApi ? 
            res.status(200).send(pokemonApi) :
            res.status(404).send('No existe este Pokemon')
        }else{
            // console.log(pokemonsTotal)
            res.status(200).send(pokemonsTotal)
        }
    })


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    
    if(id.includes("-")){
        // console.log(id)
        const idDb = await Pokemon.findByPk(id, {include: [{model: Type}]})
        
        idDb ? 
        res.status(200).send(idDb) :
        res.status(404).send('No se encontro')
    }else {
        // console.log('NO DEBO ENTRAR ACA :',id)
       const allPokesId = await getPokemonDetail(id);
       allPokesId ?
       res.status(200).send(allPokesId) :
       res.status(404).send('No existe este pokemon')
      
    }
});




//Ruta de creacion terminada ---- NO TOCAR!
router.post('/', async (req, res) => {
    const {name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    try {
        if(name) {
            const allPoke = await getAllPokemon();
            const isPoke = allPoke.find(e => e.name === name.toLowerCase());
            if (!isPoke) {
                const pokemon = await Pokemon.create({
                        name,
                        hp,
                        attack,
                        defense,
                        speed,
                        height,
                        weight,
                        img 
                });
            
                const typeDb = await Type.findAll({
                    where: {
                        name: types,
                    }
                });
                pokemon.addType(typeDb);
                return res.status(201).send(pokemon);
            }
            return res.status(404).send('Este Pokemon ya existe')
        } 
        if(!name) return res.status(404).send('El nombre del Pokemon es Obligatorio');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;