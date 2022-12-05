import React from 'react';
import {Link} from "react-router-dom";
import styles from './LandinPage.module.css'


export default function LandingPage(){
    return(
        <div className={styles.bg}>
            
            <a href='https://www.linkedin.com/in/juan-pablo-matarazzo-202409224/' target="_blank" className={styles.link}>
            <h2 className={styles.author}>Juampa Matarazzo</h2>
            </a>
            <Link to='/home'>
                <button className={styles.buttonImg}>GO</button>                
            </Link>
        </div>
    )
}