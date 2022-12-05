const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    detail: []
}

function rootReducer (state= initialState, action){
 switch(action.type){
    case 'GET_POKEMONS':
        return {
            ...state,
            pokemons: action.payload,
            allPokemons: action.payload
        }
        case "GET_NAME_POKEMON":
            return{
                ...state,
                pokemons: action.payload
            }
        case 'GET_ALL_TYPES':
            return{
                ...state,
                types: action.payload
            }
        case "FILTER_TYPE":
         let allPokemons = state.allPokemons;
         let typesFilterd = action.payload === 'all' ? allPokemons : allPokemons.filter(e => e.types.some(e => e.name === action.payload))
         if(typesFilterd.length <= 0){
            typesFilterd = allPokemons;   
            alert('Este tipo no existe!!');
        }; 
             return{
                ...state,
                pokemons: typesFilterd
            }
        case "FILTER_CREATED":
            const estadoTodos = state.allPokemons;
            const createdFilter = action.payload === 'created' ? estadoTodos.filter(el => el.createdInDb) : 
            estadoTodos.filter(el => !el.createdInDb)
            return{
                ...state,
                pokemons: action.payload === 'All' ? estadoTodos : createdFilter
            }
        case "ORDER_NAME":
            let sordArr = action.payload === 'asc' ?
                state.pokemons.sort(function (a,b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1
                    }
                    return 0
                }) :
                state.pokemons.sort(function (a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                pokemons: sordArr
            }
        case "ORDER_STR":
            const todos = state.pokemons;
            let sortStr = action.payload === 'asc' ? 
                todos.sort((a, b) => a.attack - b.attack) :
                todos.sort((a, b) => b.attack - a.attack);
                //console.log(sortStr)
            return{
                ...state,
                pokemons: sortStr
            }
            case 'POST_POKEMON':
            return {
                ...state
            };
            case "GET_DETAILS":
                return{
                    ...state,
                    detail: action.payload
                }
        default:
            return state;
            
 }
}



export default rootReducer;