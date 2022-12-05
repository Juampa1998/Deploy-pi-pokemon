const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typesRouter = require('./typesRouter')
const pokemonsRouter = require('./pokemonsRouter')
const {getPokemonDetail } = require('./functions');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', typesRouter);
router.use('/pokemon', pokemonsRouter)

// getPokemonDetail(33)
// router.use('/')


module.exports = router;
