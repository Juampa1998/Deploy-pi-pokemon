import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlltypes, filterType, filterCreated, orderName, filterStr } from "../actions";
import styles from './Filter.module.css'

export default function Filters({setOrder, setCurrentPage}) {
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types)
    
    useEffect(() =>{
        dispatch(getAlltypes())
    }, [dispatch])

    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterType(e.target.value));
        // console.log(e.target.value)
        setCurrentPage(1);
    }
    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        // console.log(e.target.value)
        setCurrentPage(1);
    }
    function handleFilterName(e){
        e.preventDefault();
        dispatch(orderName(e.target.value));
        // console.log(e.target.value)
        setOrder(e.target.value);
        setCurrentPage(1);
    }
    function handleFilterStr(e){
        e.preventDefault();
        dispatch(filterStr(e.target.value));
        // console.log(e.target.value)
        setOrder(e.target.value);
        setCurrentPage(1);
    }

    return (
        
        <div className={styles.div}>
           
        
                <select className={styles.select} onChange={e => handleFilterName(e)}>
                    <option>Nombre</option>
                    <option value='asc'>ASC</option>
                    <option value='desc'>DESC</option>
                </select>

                <select className={styles.select}  onChange={e => handleFilterStr(e)}>
                    <option>Attack</option>
                    <option value='asc'>ASC STR</option>
                    <option value='desc'>DESC STR</option>
                </select>

                
            <select className={styles.select}  onChange={e => handleFilterType(e)}>
            <option>Tipos</option>
            <option value='all'>ALL</option>
            {
              allTypes?.map(e => {
                return (
                  <option key={e.id} value={e.name}>{e.name.toUpperCase()}</option>
                )
              })
            }
        </select>
                
                <select className={styles.select}  onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Api/Db</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Api</option>
                </select>
         </div>
    )
}