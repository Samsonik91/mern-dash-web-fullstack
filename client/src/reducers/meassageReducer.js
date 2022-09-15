import {SETMESSAGES} from "./actionTypes"

const initialState = {
    messages: []
}

export const messageReducer = (state=initialState, action) => {
    switch(action.type){
        case SETMESSAGES:
            return {...state, messages: action.payload}

        default:
            return state
    }
}

export default messageReducer