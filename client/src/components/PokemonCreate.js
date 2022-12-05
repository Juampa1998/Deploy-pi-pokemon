import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postPokemon,getAlltypes } from '../actions'
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import styles from './PokemonCreate.module.css'


export default function PokemonCreate () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const types = useSelector((state) => state.types);

    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
        img: ''
    })

    let noVacio = /\S+/
    let validateName = /^[a-z]+$/i;
    let validateNum =  /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

    function validate (input){
        let errors = {};
        if(!noVacio.test(input.name) || !validateName.test(input.name) || input.name.length < 3 ){
            errors.name = "Se requiere un name, debe contener mas de 3 caracteres."
        }
        if(!validateNum.test(input.hp) || parseInt(input.hp) < 1){
            errors.hp = "Se requiere un numero, Mayor a 1"
        }
        if(!validateNum.test(input.attack) || parseInt(input.attack) < 1){
            errors.attack = "Se requiere un numero, Mayor a 1"
        }
        if(!validateNum.test(input.defense) || parseInt(input.defense) < 1){
            errors.defense = "Se requiere un numero, Mayor a 1"
        }
        if(!validateNum.test(input.speed) || parseInt(input.speed) < 1){
            errors.speed = "Se requiere un numero, Mayor a 1"
        }
        if(!validateNum.test(input.height) || parseInt(input.height) < 1){
            errors.height = "Se requiere un numero, Mayor a 1"
        }
        if(!validateNum.test(input.weight) || parseInt(input.weight) < 1){
            errors.weight = "Se requiere un numero, Mayor a 1"
        }
        if(!validateUrl.test(input.img)){
            errors.img = "Se requiere un url valido"
        }
        return errors
    }


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        // console.log('Esto es el valu de cada uno', input);
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        // console.log(errors)
    }

    const handleSelect = (e)  => {
        if(input.types.length < 2){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
            e.target.value = 'Select Type'
        }else{
            alert('Como maximo 2 tipos')
            e.target.value = 'Select Type'
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        // console.log(input);
        if(!errors.name &&
           !errors.hp   &&
           !errors.attack &&
           !errors.defense &&
           !errors.speed &&
           !errors.height &&
           !errors.weight &&
           !errors.img 
            ){

        dispatch(postPokemon(input))
        alert('Personaje creado')
        setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            types: [],
            img: ''
        })
        history.push('/home')
      }else {
        alert('Error. Revisa tu formulario.')
      }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            types: input.types.filter(type => type !== e)
        })
    }
    
    useEffect(() => {
        dispatch(getAlltypes());
    }, [dispatch])


    return (
        <div className={styles.container}>
            <Link to= '/home'>
                <button className={styles.btn}>Home</button>
            </Link>
            <form  className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h3 className={styles.h3}>Crea tu Pokemon!</h3>
                <div className={styles.div}>
                    <div className={styles.divito}>
                    <label className={styles.label}>Name:</label>
                    <input className={styles.input}
                        type='text'
                        value= {input.name}
                        name= 'name'
                        placeholder="Escribe un Nombre"
                        onChange={e => {handleChange(e)}}
                    />
                    <p className={styles.p}>{errors.name}</p>

                    <label className={styles.label}>Hp:</label>
                    <input className={styles.input}
                        type='number'
                        value= {input.hp}
                        name= 'hp'
                        placeholder="999"
                        onChange={e => {handleChange(e)}}
                    />
                    <p className={styles.p}>{errors.hp}</p>

                    <label className={styles.label}>Attack:</label>
                    <input className={styles.input}
                        type='number'
                        value= {input.attack}
                        name= 'attack'
                        placeholder="999"
                        onChange={e => {handleChange(e)}}
                    />
                    <p className={styles.p}>{errors.attack}</p>
            
                    <label className={styles.label}>Defense:</label>
                    <input className={styles.input}
                        type='number'
                        value= {input.defense}
                        name= 'defense'
                        placeholder="999"
                        onChange={e => {handleChange(e)}}
                    />
                    <p className={styles.p}>{errors.defense}</p>
                </div>






                <div className={styles.divito}>
                    <label className={styles.label}>Speed:</label>
                    <input className={styles.input}
                        type='number'
                        value= {input.speed}
                        name= 'speed'
                        placeholder="999"
                        onChange={e => {handleChange(e)}}
                    />
                    <p className={styles.p}>{errors.speed}</p>
                
                    <label className={styles.label}>Height:</label>
                    <input className={styles.input}
                        type='number'
                        value= {input.height}
                        name= 'height'
                        placeholder="999"
                        onChange={e => {handleChange(e)}}
                    />
                    <p className={styles.p}>{errors.height}</p>
                
                    <label className={styles.label}>Weight:</label>
                    <input className={styles.input}
                        type='number'
                        value= {input.weight}
                        name= 'weight'
                        placeholder="999"
                        onChange={e => {handleChange(e)}}
                    />
                    <p className={styles.p}>{errors.weight}</p>
                   
                    <label className={styles.label}>Imagen:</label>
                    <input className={styles.input}
                        type='text'
                        value= {input.img}
                        name= 'img'
                        placeholder="Url Imagen .."
                        onChange={e => {handleChange(e)}}
                    />
                    <p className={styles.p}>{errors.img}</p>
                  </div>
                </div>
                <div>




                   <select className={styles.select} onChange={e => {handleSelect(e)}}>
                    <option>Select Type</option>
                        {
                            types?.map(e =>{
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })
                        }
                   </select>
                   {
                    input.types.map(e =>{
                        return(
                            <div className={styles.typesSelect} key={e}>
                                    <p>{e}</p>
                                    <button className={styles.btnDelete} onClick={() =>{handleDelete(e)} }>x</button>
                            </div>
                        )
                    })
                   }
                </div>
                
                    <button className={styles.btnCreate} type="submit">Crear!</button>
                
            </form>
        </div>
    )
}