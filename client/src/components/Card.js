import React from "react";
import { NavLink } from "react-router-dom"
import styles from './Card.module.css'

export default  function Card({name, image, types,id }){
    // console.log(id, name)
    return(
        <div >
        <div className={styles.fondo}>
             <NavLink  to={`/pokemon/${id}`} className={styles.none}>
            
            <h3>{name}</h3>
            <img className={styles.img} src={image} alt='img not found' width="200px" height="250px"/>
             <p>#{id}</p>
            

            
            <div className={styles.types}>
                        {
                            types?.map((e, k) => {
                                return (
                                    <div className={styles.types} key={k}>
                                        <p className={styles.text}>{e.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
            </NavLink>
        </div>
        </div>
    )
}