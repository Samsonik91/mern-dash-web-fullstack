import {SETCONVERSATIONS, SETFETCHING} from "./actionTypes"

const initialState = {
    conversations: null,
    isFetching: false
}

const conversationReducer = (state=initialState, action) => {
    switch(action.type){
        case SETCONVERSATIONS:
            return {...state, conversations: action.payload}

        case SETFETCHING:
            return {...state, isFetching: action.payload}

        default:
            return state
    }
}

export default conversationReducer