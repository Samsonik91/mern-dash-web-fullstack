import {
    SETINTERLOCUTOR,
    LOGIN,
    LOGOUT,
    SETUNREAD,
    SETFAVORITES,
    SETFAVORITE,
    REMOVEFAVORITE,
    SETDISABLE,
    SETAVATAR
} from './actionTypes'

let initialState = {
    authData: null,
    interlocutor: null,
    unread: null,
    total: null,
    avatar: null,
    favorites: [],
    disable: false
}

const userReducer = (state=initialState, action) => {

    switch(action.type) {
        case LOGIN:
            return {...state, authData: action.payload}

        case LOGOUT:
            return {...state, authData: null}

        case SETAVATAR:
            return {...state, avatar: action.payload}

        case SETINTERLOCUTOR:
            return {...state, interlocutor: action.payload}

        case SETUNREAD:
            return {...state, unread: action.payload.unread, total: action.payload.total}

        case SETFAVORITES:
            return {...state, favorites: action.payload}

        case SETFAVORITE:
            return {...state, favorites: [...state.favorites, action.payload]}

        case REMOVEFAVORITE:
            return {...state, favorites: state.favorites.filter(f=> f !== action.payload)}

        case SETDISABLE:
            return{...state, disable: action.payload}

        default:
            return state
    }

}

export default userReducer