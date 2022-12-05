import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = [];

    for(let i = 1; i <=Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav >
            <ul className={styles.list}>
                {pageNumbers?.map(number => {
                    return(
                    <li className={styles.items} key={number}>
                        <a className={styles.a} onClick={() => paginado(number)}>{number}</a>
                    </li>
                )})}
            </ul>
        </nav>
    )
}