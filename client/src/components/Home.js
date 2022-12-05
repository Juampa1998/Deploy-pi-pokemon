import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import Filters from './Filter';
import SearchBar from './SearchBar';
import styles from './Home.module.css'

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);


    const [order, setOrder] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
    const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }


    useEffect(() =>{
        dispatch(getPokemons())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
        
    }

    return (
        <div >
            <div className={styles.divC}>
            <Link to='/pokemon' >
                <button className={styles.btnn}> Crear Pokemon</button>
                </Link>
            </div>
            {/* <h1>Pokemon</h1> */}
            {/* <div >
            
    <button onClick={e=>{handleClick(e)}} >
                Volver a cargar los Pokemones
            </button>
            </div> */}
            <div className={styles.home}>
    <SearchBar/>
    </div>
    <div className={styles.filters}>
    <Filters setOrder={setOrder} setCurrentPage={setCurrentPage} />
    </div>
    <div className={styles.cards}>
    {
     currentPokemon?.map((p) => {
        return(
            <Card  className={styles.card} 
            name={p.name} image={p.img} key={p.id} types={p.types} id={p.id}/>
        )
     })
    }
            </div>
            <div>
            <Paginado pokemonsPerPage={pokemonsPerPage}
              allPokemons={allPokemons.length}
              paginado={paginado}/>
            </div>
        </div>
    )
}