import React from 'react';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {getDetail} from "../actions/index";
import { useEffect } from 'react';
import styles from './Detail.module.css'


export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.detail)
    console.log('Este es el pokemon ',myPokemon)


    useEffect(() =>{
        // console.log(props.match.params.id)
        dispatch(getDetail(props.match.params.id))
    }, [dispatch]);




    return (
        <div>
            {
                myPokemon ?
                <div>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h2 className={styles.h2}>{myPokemon.name}</h2>
                        <p className={styles.p}>#{myPokemon.id}</p>
                        <img src={myPokemon.img? myPokemon.img : myPokemon.img} alt='img not found' height="250px" width='200px' />
                        
                          <div className={styles.types}>
                            <h3> {myPokemon.types?.map((e,k) =>{
                                return(
                                    <div className={styles.types} key={k}>
                                        
                                        <p className={styles.text}>{e.name}</p>

                                    </div>
                                )
                            })

                                }

                            </h3>
                            </div>
                        <h5 className={styles.h5}>HP:  {myPokemon.hp}</h5>
                        <h5 className={styles.h5}>Attack:  {myPokemon.attack}</h5>
                        <h5 className={styles.h5}>Defense:  {myPokemon.defense}</h5>
                        <h5 className={styles.h5}>Speed:  {myPokemon.speed}</h5>
                        <h5 className={styles.h5}>Height:  {myPokemon.height}</h5>
                        <h5 className={styles.h5}>Weight:  {myPokemon.weight}</h5>

                    </div>
                        </div>
                </div> : <p>Loading...</p>
            }
            <div>
            <Link to='/home'>
                <button className={styles.btn}>Go to Home</button>
            </Link>
            </div>
        </div>
    )

}