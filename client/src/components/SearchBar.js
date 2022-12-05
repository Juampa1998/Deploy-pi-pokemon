import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemon } from '../actions';
import styles from './SearchBar.module.css'

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePokemon(name))
        setName('')
        console.log(name)
    }


    return (
        <div className={styles.search}>
                <input
                    type = 'text'
                    placeholder='Buscar..'
                    onChange= {(e) => handleInputChange(e)}
                    className={styles.input}
                />
                <button className={styles.btn} type='submit' onClick={(e) => {handleSubmit(e)}}>Buscar</button>
        </div>
    )
}