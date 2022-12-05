 import axios from 'axios';


 export const getPokemons = () => {
    return async (dispatch) => {
        try {
            let url = 'http://localhost:3001/pokemon';
            let json = await axios.get(url);
            return dispatch({
                type: "GET_POKEMONS",
                payload: json.data
            });
        } catch (e) {
            console.log(e);
        };     
    };
};


export const getAlltypes = () => {
    return async (dispatch) => {
        try {
            let url = 'http://localhost:3001/types';
            let json = await axios.get(url);
            return dispatch({
                type: "GET_ALL_TYPES",
                payload: json.data
            });
        } catch (e) {
          console.log(e);  
        };
    };
};

export const filterCreated = (payload) => {
    // console.log('Soy el actions',payload)//
    return {
        type: "FILTER_CREATED",
        payload
    };
};


export const filterType = (payload) => {
    return {
        type: "FILTER_TYPE",
        payload
    };
};

export const orderName = (payload) => {
    return {
        type: "ORDER_NAME",
        payload
    };
};

export const filterStr = (payload) => {
    return {
        type: "ORDER_STR",
        payload
    }
}


export function getNamePokemon(name){
    return async function (dispatch){
        try{
            // console.log(name)
            let json = await axios.get("http://localhost:3001/pokemon?name=" + name)
            return dispatch({
                type: "GET_NAME_POKEMON",
                payload: json.data
            })
        }catch(e){
            alert('Este personaje no se encontro');
            console.log(e);
            window.location.href = "http://localhost:3000/home";
        }
    }
}

export function postPokemon (payload) {
    return async function () {
       try{
        var createPoke = await axios.post("http://localhost:3001/pokemon", payload)
        console.log(createPoke)
        alert('El pokemon fue creado cone exito!!')
        return createPoke
       }catch(e){
        alert('Faltan datos!')
        console.log(e)
       }
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try{
            var json = await axios.get(`http://localhost:3001/pokemon/${id}` );
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (e) {
            console.log(e);
        };
    };
};

